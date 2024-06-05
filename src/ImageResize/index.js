import ImageResizeModule from './ImageResize.js'

export const ImageResize = ImageResizeModule

/**
 * resize
 * 한번에 리사이즈 실행하는 함수
 * @param {string|HTMLInputElement|File|Blob|HTMLCanvasElement} [src]
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
export async function resize(src, options)
{
  const imageResize = new ImageResize(options)
  let canvas = await imageResize.get(src)
  canvas = await imageResize.resize(canvas)
  canvas = await imageResize.sharpen(canvas)
  return await imageResize.output(canvas)
}
