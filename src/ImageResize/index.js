import defaultOptions from './defaultOptions';
import resizeImage from './libs/resizeImage';
import * as output from './libs/output';
import { checkOptions, urlToCanvas, fileToCanvas, getSize } from './local';

class ImageResize {

  /**
   * constructor
   *
   * @param {object} getOptions
   */
  constructor(getOptions = {})
  {
    // assign options
    this.options = checkOptions(defaultOptions, getOptions);
  }

  /**
   * Play convert
   * 이미지 변환 실행
   * 이미지 주소로 캔버스로 변환 -> 캔버스를 리사이즈 -> 이미지로 컨버트
   *
   * @param {string|HTMLInputElement|File|Blob} src
   * @return {Promise<string>}
   */
  async play (src)
  {
    let res = await this.get(src);
    res = await this.resize(res);
    res = await this.resize(res);
    res = await this.output(res);
    return res;
  }

  /**
   * Get source
   *
   * @param {string|HTMLInputElement|File|Blob} src
   * @param {object} options
   * @return {Promise<HTMLCanvasElement>}
   */
  async get (src, options = undefined)
  {
    options = !!options ? checkOptions(this.options, options) : this.options;
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
  }

  /**
   * Resize canvas
   *
   * @param {HTMLCanvasElement} canvas
   * @param {object} options
   * @return {Promise<HTMLCanvasElement>}
   */
  async resize (canvas, options = undefined)
  {
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
  output (canvas, options = undefined)
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
  updateOptions (value)
  {
    this.options = checkOptions(this.options, value);
    return this;
  }

}

export default ImageResize;
