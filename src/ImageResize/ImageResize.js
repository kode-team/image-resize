import defaultOptions from './defaultOptions'
import resizeImage from './libs/resizeImage'
import * as output from './libs/output'
import filterSharpen from './libs/filter-sharpen'
import { fileReader, imageLoader } from './libs/loaders.js'
import Canvas from './libs/Canvas.js'

class ImageResize {

  /**
   * constructor
   * @param {object} getOptions
   */
  constructor(getOptions = {})
  {
    // assign options
    this.options = this.#checkOptions(defaultOptions, getOptions)
  }

  /**
   * Check options
   * @param {object} original
   * @param {object} target
   */
  #checkOptions(original = {}, target={})
  {
    let result = {}
    Object.keys(original).forEach((key) => {
      result[key] = target[key] !== undefined ? target[key] : original[key]
    })
    result.width = Number(result.width) || 0
    result.height = Number(result.height) || 0
    result.quality = Number(result.quality) || 0
    result.reSample = Number(result.reSample) || 0
    return result
  }

  /**
   * url to canvas
   * 이미지 주소로 캔버스로 변환
   * @param {string} src
   * @param {object} options
   * @return {Promise}
   */
  async #urlToCanvas(src, options)
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
   * @param {File|Blob} file
   * @param {Object} options
   * @return {Promise<HTMLCanvasElement>}
   */
  async #fileToCanvas(file, options)
  {
    const resource = await fileReader(file)
    const image = await imageLoader(resource)
    let canvas = new Canvas(image.width, image.height, options.bgColor)
    canvas.ctx.drawImage(image, 0, 0)
    return canvas.el
  }

  /**
   * Get image size
   * @param {number} width original width
   * @param {number} height original height
   * @param {number} targetWidth target width
   * @param {number} targetHeight target height
   * @return {object}
   */
  #getSize(width, height, targetWidth, targetHeight)
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

  /**
   * Play convert
   * 이미지 변환 실행
   * 이미지 주소로 캔버스로 변환 -> 캔버스를 리사이즈 -> 이미지로 컨버트
   * @param {string|HTMLInputElement|File|Blob} src
   * @return {Promise<string>}
   */
  async play (src)
  {
    let res = await this.get(src)
    res = await this.resize(res)
    res = await this.sharpen(res)
    res = await this.output(res)
    return res
  }

  /**
   * Get source
   * @param {string|HTMLInputElement|File|Blob} src
   * @param {object} options
   * @return {Promise<HTMLCanvasElement>}
   */
  async get (src, options = undefined)
  {
    options = !!options ? this.#checkOptions(this.options, options) : this.options
    if (typeof src === 'string')
    {
      // image url address
      return await this.#urlToCanvas(src, options)
    }
    else if (src instanceof File || src instanceof Blob)
    {
      // File,Blob
      return await this.#fileToCanvas(src, options)
    }
    else if (src.tagName?.toLowerCase() === 'input' && src.type === 'file')
    {
      // element`<input type="file"/>`
      return await this.#fileToCanvas(src.files[0], options)
    }
    // error
    throw new Error('Not found source')
  }

  /**
   * Resize canvas
   * @param {HTMLCanvasElement} canvas
   * @param {object} options
   * @return {Promise<HTMLCanvasElement>}
   */
  async resize (canvas, options = undefined)
  {
    options = !!options ? this.#checkOptions(this.options, options) : this.options
    // get size
    let size = this.#getSize(canvas.width, canvas.height, options.width, options.height)
    // resize image
    const result = await resizeImage({
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
   * sharpen
   * @param {HTMLCanvasElement} canvas
   * @param {number} amount
   */
  sharpen (canvas, amount = undefined)
  {
    amount = (!isNaN(amount)) ? amount : this.options.sharpen
    return filterSharpen(canvas, amount)
  }

  /**
   * Output data
   * @param {HTMLCanvasElement} canvas
   * @param {object} options
   * @return {Promise}
   */
  async output (canvas, options = undefined)
  {
    options = !!options ? this.#checkOptions(this.options, options) : this.options
    switch (options.outputType)
    {
      case 'base64':
        return await output.base64(canvas, options.format, options.quality)
      case 'blob':
        return await output.blob(canvas, options.format, options.quality)
      case 'canvas':
      default:
        return canvas
    }
  }

  /**
   * Update options
   * @param {object} value
   * @return {ImageResize}
   */
  updateOptions (value)
  {
    this.options = this.#checkOptions(this.options, {
      ...value,
    })
    return this
  }

}

export default ImageResize
