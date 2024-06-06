/**
 * sleep (delay tool)
 * @param {number} delay
 * @return {Promise}
 */
export const sleep = (delay = 3000) => {
  return new Promise(resolve => setTimeout(resolve, delay))
}

/**
 * file uploader
 * @param {string} [options.accept]
 * @param {boolean} [options.multiple]
 * @return {Promise<FileList|array>}
 */
export function fileUploader(options = {})
{
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    if (options.accept) input.accept = options.accept
    if (options.multiple === true) input.multiple = true
    input.addEventListener('change', e => {
      const files = Object.assign([], e.target.files)
      if (files.length <= 0) return resolve([])
      input.value = null
      resolve((options.multiple === true) ? files : files[0])
    })
    input.addEventListener('cancel', () => {
      resolve((options.multiple === true) ? [] : null)
    })
    input.click()
  })
}

/**
 * file loader
 * @param {string} url
 * @return {Blob}
 */
export async function fileLoader(url)
{
  const res = await fetch(url)
  const blob = await res.blob()
  return blob
}

/**
 * blob to canvas
 * @param {Blob} blob
 * @return {Promise<HTMLCanvasElement>}
 */
export function blobToCanvas(blob)
{
  return new Promise(resolve => {
    let img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      resolve(canvas)
    }
    img.src = URL.createObjectURL(blob)
  })
}

export function getByte(bytes)
{
  const sizes = [ 'Bytes', 'KB', 'MB', 'GB', 'TB' ]
  if (bytes === 0) return '0 Byte'
  let i = Math.floor(Math.log(bytes) / Math.log(1024))
  return String(Math.round(bytes / Math.pow(1024, i))) + sizes[i]
}
