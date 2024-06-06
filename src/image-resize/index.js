import ImageResizeWorker from './worker.js?worker&inline'
import { WORKER_MESSAGE } from './libs/consts.js'
import { checkOptions, checkSource } from './libs/checks.js'
import { canvasToBlob } from './libs/files.js'

/**
 * resize
 * 한번에 리사이즈 실행하는 함수
 * @param {string|File|Blob|HTMLCanvasElement} src
 * @param {object} options
 * @param {number} [options.width]
 * @param {number} [options.height]
 * @param {'png'|'jpg'|'webp'} [options.format]
 * @param {'base64'|'canvas'|'blob'} [options.outputType]
 * @param {number} [options.quality]
 * @param {number} [options.reSample]
 * @param {number} [options.sharpen]
 * @param {string} [options.bgColor]
 * @return {Promise<any>}
 */
function imageResize(src, options = undefined)
{
  return new Promise(async (resolve, reject) => {
    // check options
    const opts = checkOptions(options)

    // set worker
    const worker = new ImageResizeWorker()
    // const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })
    worker.onmessage = async (e) => {
      const { id, key, output, error } = e.data
      switch (key)
      {
        case WORKER_MESSAGE.END:
          if (worker) worker.terminate()
          if (output instanceof ImageBitmap)
          {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            canvas.width = output.width
            canvas.height = output.height
            ctx.fillStyle = opts.bgColor
            ctx.fillRect(0, 0, output.width, output.height)
            ctx.drawImage(output, 0, 0)
            resolve(canvas)
          }
          else
          {
            resolve(output)
          }
          if (worker) worker.terminate()
          break
        case WORKER_MESSAGE.ERROR:
          reject(error)
          if (worker) worker.terminate()
          break
        case WORKER_MESSAGE.NEW_CANVAS:
          const canvas = new OffscreenCanvas(e.data.width, e.data.height)
          worker.postMessage({
            id,
            key: WORKER_MESSAGE.NEW_CANVAS,
            canvas,
          }, [ canvas ])
          break
      }
    }

    // check source
    checkSource(src)

    // 캔버스 엘리먼트라면 `Blob`로 변환해줘야한다.
    if (src instanceof HTMLCanvasElement)
    {
      src = await canvasToBlob(src)
    }

    // send to worker thread
    worker.postMessage({
      key: WORKER_MESSAGE.START,
      src,
      options: opts,
    })
  })
}

export default imageResize
