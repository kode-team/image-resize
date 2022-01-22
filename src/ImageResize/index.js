import Canvas from './libs/Canvas';
import * as defaultOptions from './defaultOptions';
import resizeImage from './libs/resizeImage';
import * as output from './libs/output';
import { fileReader, imageLoader } from './libs/loaders';

/**
 * Image Resize
 *
 * @param {object} getOptions
 */
function ImageResize(getOptions = {}) {

  // assign options
  this.options = checkOptions(defaultOptions.base, getOptions);


  /**
   * FUNCTION AREA
   */

  /**
   * Check options
   *
   * @param {object} original
   * @param {object} target
   */
  function checkOptions(original = {}, target={})
  {
    let result = {};
    Object.keys(original).forEach((key) => {
      result[key] = target[key] || original[key];
    });
    result.width = Number(result.width);
    result.height = Number(result.height);
    result.quality = Number(result.quality);
    result.reSample = Number(result.reSample);
    return result;
  }

  /**
   * url to canvas
   * 이미지 주소로 캔버스로 변환
   *
   * @param {string} src
   * @param {object} options
   * @return {Promise}
   */
  async function urlToCanvas(src, options)
  {
    let canvas;
    const img = await imageLoader(src);
    canvas = new Canvas(img.width, img.height, options.bgColor);
    canvas.ctx.drawImage(img, 0, 0);
    return canvas.el;
  }

  /**
   * file to canvas
   * `File`객체를 캔버스로 변환
   *
   * @param {File|Blob} file
   * @param {Object} options
   * @return {Promise<HTMLCanvasElement>}
   */
  async function fileToCanvas(file, options)
  {
    const resource = await fileReader(file);
    const image = await imageLoader(resource);
    let canvas = new Canvas(image.width, image.height, options.bgColor);
    canvas.ctx.drawImage(image, 0, 0);
    return canvas.el;
  }


  /**
   * METHOD AREA
   */

  /**
   * Play convert
   * 이미지 변환 실행
   * 이미지 주소로 캔버스로 변환 -> 캔버스를 리사이즈 -> 이미지로 컨버트
   *
   * @param {string|HTMLInputElement|File|Blob} src
   * @return {Promise<string>}
   */
  this.play = async (src) => {
    let res = await this.get(src);
    res = await this.resize(res);
    res = await this.resize(res);
    res = await this.output(res);
    return res;
  };

  /**
   * Get source
   *
   * @param {string|HTMLInputElement|File|Blob} src
   * @param {object} options
   * @return {Promise<HTMLCanvasElement>}
   */
  this.get = async function(src, options = null)
  {
    options = !!options ? checkOptions(this.options, options) : this.options;
    // console.log('this.get()', src);
    if (typeof src === 'string')
    {
      // image url address
      return await urlToCanvas(src, options);
    }
    else if (src instanceof File || src instanceof Blob)
    {
      // File,Blob
      return await fileToCanvas(src, options);
    }
    else if (src.tagName?.toLowerCase() === 'input' && src.type === 'file')
    {
      // element`<input type="file"/>`
      return await fileToCanvas(src.files[0], options);
    }
    // error
    throw new Error('Not found source');
  };

  /**
   * Resize canvas
   *
   * @param {HTMLCanvasElement} canvas
   * @param {object} options
   * @return {Promise<HTMLCanvasElement>}
   */
  this.resize = async (canvas, options) => {
    options = !!options ? checkOptions(this.options, options) : this.options;
    // get size
    let size = getSize(canvas.width, canvas.height, options.width, options.height);
    // resize image
    return await resizeImage({
      canvas: canvas,
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
    });
  };

  /**
   * Output data
   *
   * @param {HTMLCanvasElement} canvas
   * @param {object} options
   * @return {Promise}
   */
  this.output = function(canvas, options)
  {
    options = !!options ? checkOptions(this.options, options) : this.options;
    return new Promise((resolve, reject) => {
      switch (options.outputType)
      {
        case 'base64':
          output.base64(canvas, options.format, options.quality)
            .then(resolve)
            .catch(reject);
          break;
        case 'blob':
          output.blob(canvas, options.format, options.quality)
            .then(resolve)
            .catch(reject);
          break;
        case 'canvas':
        default:
          resolve(canvas);
          break;
      }
    });
  };

  /**
   * Update options
   *
   * @param {object} value
   * @return {ImageResize}
   */
  this.updateOptions = function(value)
  {
    this.options = checkOptions(this.options, value);
    return this;
  }
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
function getSize(width, height, targetWidth, targetHeight)
{
  let w = width;
  let h = height;

  if (targetWidth && targetHeight)
  {
    if (targetWidth > targetHeight) targetHeight = undefined;
    else targetWidth = undefined;
  }

  if (targetWidth)
  {
    w = targetWidth;
    h = height * (targetWidth / width);
  }
  else if (targetHeight)
  {
    w = width * (targetHeight / height);
    h = targetHeight;
  }

  return {
    width: Number(w),
    height: Number(h),
  };
}

export default ImageResize;
