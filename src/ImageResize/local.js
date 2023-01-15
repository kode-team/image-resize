import { fileReader, imageLoader } from './libs/loaders.js'
import Canvas from './libs/Canvas.js'

/**
 * Check options
 *
 * @param {object} original
 * @param {object} target
 */
export function checkOptions(original = {}, target={})
{
  let result = {}
  Object.keys(original).forEach((key) => {
    result[key] = target[key] || original[key]
  })
  result.width = Number(result.width)
  result.height = Number(result.height)
  result.quality = Number(result.quality)
  result.reSample = Number(result.reSample)
  return result
}

/**
 * url to canvas
 * 이미지 주소로 캔버스로 변환
 *
 * @param {string} src
 * @param {object} options
 * @return {Promise}
 */
export async function urlToCanvas(src, options)
{
  let canvas
  const img = await imageLoader(src)
  canvas = new Canvas(img.width, img.height, options.bgColor)
  canvas.ctx.drawImage(img, 0, 0)
  return canvas.el
}

/**
 * file to canvas
 * `File`객체를 캔버스로 변환
 *
 * @param {File|Blob} file
 * @param {Object} options
 * @return {Promise<HTMLCanvasElement>}
 */
export async function fileToCanvas(file, options)
{
  const resource = await fileReader(file)
  const image = await imageLoader(resource)
  let canvas = new Canvas(image.width, image.height, options.bgColor)
  canvas.ctx.drawImage(image, 0, 0)
  return canvas.el
}

/**
 * Get image size
 *
 * @param {number} width original width
 * @param {number} height original height
 * @param {number} targetWidth target width
 * @param {number} targetHeight target height
 * @return {object}
 */
export function getSize(width, height, targetWidth, targetHeight)
{
  let w = width
  let h = height

  if (targetWidth && targetHeight)
  {
    if (targetWidth > targetHeight) targetHeight = undefined
    else targetWidth = undefined
  }

  if (targetWidth)
  {
    w = targetWidth
    h = height * (targetWidth / width)
  }
  else if (targetHeight)
  {
    w = width * (targetHeight / height)
    h = targetHeight
  }

  return {
    width: Number(w),
    height: Number(h),
  }
}
