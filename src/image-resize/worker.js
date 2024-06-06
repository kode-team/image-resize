import { WORKER_MESSAGE, defaultResizeCanvasOptions } from './libs/consts.js'
import { fileReader, base64ToBlob, fetchImageData } from './libs/files.js'
import { getImageSize } from './libs/numbers.js'
import filterSharpen from './libs/filter-sharpen.js'
import { base64, blob } from './libs/output.js'

let messageId = 0
const pendingRequests = new Map()

// worker events
onmessage = async function(e)
{
  const { key, id, src, options } = e.data
  try
  {
    if (id !== undefined)
    {
      const resolve = pendingRequests.get(id)
      if (resolve) resolve(e.data)
    }
    else
    {
      switch (key)
      {
        case WORKER_MESSAGE.START:
          // 캔버스로 변환한다.
          let canvas = await convertSourceToCanvas(src, options)
          canvas = await resize(canvas, options)
          canvas = await sharpen(canvas, options)
          await output(canvas, options)
          break
        case WORKER_MESSAGE.NEW_CANVAS:
          break
      }
    }
  }
  catch (e)
  {
    postMessage({
      key: WORKER_MESSAGE.ERROR,
      error: e,
    })
  }
}

/**
 * 메인 쓰레드에 메시지를 비동기 방식으로 보낸다. 이 함수를 활용하면 await을 이용할 수 있게된다.
 * @param {string} key 통신 메시지를 구분하는 값
 * @param {any} params
 */
function sendMessageToMainThread(key, params)
{
  return new Promise(resolve => {
    const id = messageId++
    pendingRequests.set(id, resolve)
    postMessage({ id, key, ...params })
  })
}

/**
 * 소스 데이터를 캔버스로 변환한다.
 * @return
 */
async function convertSourceToCanvas(src, options)
{
  if (typeof src === 'string')
  {
    // image url address
    const blob = await fetchImageData(src)
    const bitmap = await createImageBitmap(blob)
    const canvas = await createCanvas(bitmap.width, bitmap.height, options.bgColor)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(bitmap, 0, 0)
    return canvas
  }
  else if (src instanceof File || src instanceof Blob)
  {
    // File,Blob
    const base64 = await fileReader(src)
    const blob = base64ToBlob(base64)
    const bitmap = await createImageBitmap(blob)
    const canvas = await createCanvas(bitmap.width, bitmap.height, options.bgColor)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(bitmap, 0, 0)
    return canvas
  }
}

/**
 * 메인쓰레드에 요청하여 캔버스 엘리먼트를 만든다.
 * @return {OffscreenCanvas}
 */
export async function createCanvas(width = 320, height = 240, bgColor = 'transparent')
{
  const res = await sendMessageToMainThread(WORKER_MESSAGE.NEW_CANVAS, {
    width,
    height,
  })
  const canvas = res.canvas
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, width, height)
  return canvas
}

/**
 * 캔버스를 리사이즈한다.
 * @param {OffscreenCanvas} canvas
 * @param {object} options
 * @return {OffscreenCanvas}
 */
async function resize(canvas, options)
{
  const size = getImageSize(canvas.width, canvas.height, options.width, options.height)
  const result = await resizeCanvas({
    canvas,
    reSample: options.reSample,
    width: size.width,
    height: size.height,
    cx: 0,
    cy: 0,
    cw: canvas.width,
    ch: canvas.height,
    dx: 0,
    dy: 0,
    dw: size.width,
    dh: size.height,
    bgColor: options.bgColor,
  })
  return result
}

/**
 * resize canvas
 * @param {Object} options
 * @return {Promise<OffscreenCanvas>}
 */
export function resizeCanvas(options)
{
  // assign options
  options = Object.assign({}, defaultResizeCanvasOptions, options)
  // set resampling count
  options.reSample = Math.min(4, options.reSample)
  options.reSample = Math.max(0, options.reSample)
  const reSamplingCount = Math.pow(2, options.reSample)
  return new Promise(async (resolve, reject) => {
    try
    {
      const canvas = await createCanvas(
        options.width * reSamplingCount,
        options.height * reSamplingCount,
        options.bgColor
      )
      const ctx = canvas.getContext('2d')
      ctx.drawImage(
        options.canvas,
        options.cx,
        options.cy,
        options.cw,
        options.ch,
        options.dx * reSamplingCount,
        options.dy * reSamplingCount,
        options.dw * reSamplingCount,
        options.dh * reSamplingCount
      )
      if (options.reSample > 0)
      {
        _resizeCanvas(options, options.reSample, canvas).then(resolve)
      }
      else
      {
        resolve(canvas)
      }
    }
    catch (e)
    {
      reject(e)
    }
  })
}
/**
 * resize
 * @param {Object} options
 * @param {Number} count
 * @param {OffscreenCanvas} parentCanvas
 * @return {Promise<OffscreenCanvas>}
 */
function _resizeCanvas(options, count, parentCanvas)
{
  return new Promise(resolve => {
    async function func(count, parentCanvas)
    {
      const pow = Math.pow(2, count)
      const canvasForResize = await createCanvas(
        options.width * pow,
        options.height * pow,
        options.bgColor
      )
      const ctx = canvasForResize.getContext('2d')
      ctx.drawImage(
        parentCanvas,
        0,
        0,
        parentCanvas.width * 0.5,
        parentCanvas.height * 0.5,
      )
      if (count > 0)
      {
        func(count - 1, canvasForResize).then()
      }
      else
      {
        resolve(canvasForResize)
      }
    }
    func(count - 1, parentCanvas).then()
  })
}

/**
 * sharpen
 * @param {OffscreenCanvas} canvas
 * @param {object} options
 */
async function sharpen(canvas, options)
{
  const amount = (!isNaN(options?.sharpen)) ? options.sharpen : 0
  if (amount <= 0) return canvas
  const newCanvas = await createCanvas(canvas.width, canvas.height, options.bgColor)
  return filterSharpen(canvas, amount, newCanvas)
}

/**
 * Output data
 * @param {OffscreenCanvas} canvas
 * @param {object} options
 * @return {Promise}
 */
async function output(canvas, options)
{
  let res
  switch (options.outputType)
  {
    case 'base64':
      res = await base64(canvas, options.format, options.quality)
      postMessage({
        key: WORKER_MESSAGE.END,
        output: res,
      })
      break
    case 'blob':
      res = await blob(canvas, options.format, options.quality)
      postMessage({
        key: WORKER_MESSAGE.END,
        output: res,
      })
      break
    case 'canvas':
    default:
      const bitmap = canvas.transferToImageBitmap()
      postMessage({
        key: WORKER_MESSAGE.END,
        output: bitmap,
      }, [ bitmap ])
      break
  }
}
