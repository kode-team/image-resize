import Canvas from './libs/Canvas';
import * as events from './libs/events';
import * as defaultOptions from './defaultOptions';
import resizeImage from './libs/resizeImage';
import * as output from './libs/output';

/**
 * Image Resize
 *
 * @param {object} getOptions
 */
function ImageResize(getOptions={}) {

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
	function checkOptions(original={}, target={})
	{
		let result = {};

		Object.keys(original).forEach(function(key) {
			result[key] = target[key] || original[key];
		});

		result.width = Number(result.width);
		result.height = Number(result.height);
		result.quality = Number(result.quality);
		result.reSample = Number(result.reSample);

		return result;
	}

	/**
	 * Image source to canvas
	 * 이미지 주소로 캔버스로 변환
	 *
	 * @param {string} src
	 * @param {object} options
	 * @return {promise}
	 */
	function srcToCanvas(src, options)
	{
		let canvas = null;
		return new Promise(function(resolve, reject) {
			events.loadImage(src).then(
				// resolve
				function(img)
				{
					// TODO : exif 데이터 가져오기
					canvas = new Canvas(img.width, img.height, options.bgColor);
					canvas.ctx.drawImage(img, 0, 0);
					resolve(canvas.el);
				},
				// reject
				function(error)
				{
					reject(error);
				}
			);
		});
	}

	/**
	 * Upload to image
	 * 첨부로 가져온 이미지를 캔버스로 변환
	 *
	 * @param {HTMLElement} el
	 * @param {Object} options
	 * @return {Promise}
	 */
	function formToCanvas(el, options)
	{
		let canvas = null;
		return new Promise(function(resolve, reject) {
			function error(e)
			{
				reject(e);
			}

			const reader = new FileReader();
			reader.onload = function(e)
			{
				const img = new Image();
				img.onload = function()
				{
					// TODO : exif 데이터 가져오기
					canvas = new Canvas(img.width, img.height, options.bgColor);
					canvas.ctx.drawImage(img, 0, 0);
					resolve(canvas.el);
				};
				img.onerror = error;
				img.src = e.target.result;
			};
			reader.onerror = error;
			reader.readAsDataURL(el.files[0]);
		});
	}


	/**
	 * METHOD AREA
	 */

	/**
	 * Play convert
	 * 이미지 변환 실행
	 * 이미지 주소로 캔버스로 변환 -> 캔버스를 리사이즈 -> 이미지로 컨버트
	 *
	 * @param {String|HTMLElement} src
	 * @return {Promise}
	 */
	this.play = function(src)
	{
		return new Promise((resolve, reject) => {
			this.get(src)
				.then((canvas) => this.resize(canvas))
				.then((canvas) => this.output(canvas))
				.then((result) => resolve(result))
				.catch((error) => reject(error));
		});
	};

	/**
	 * Get source
	 *
	 * @param {string|HTMLElement} src
	 * @param {object} options
	 * @return {promise}
	 */
	this.get = function(src, options=null)
	{
		options = !!options ? checkOptions(this.options, options) : this.options;

		return new Promise((resolve, reject) => {
			if (typeof src === 'string')
			{
				// image url
				resolve(srcToCanvas(src, options));
			}
			else if (typeof src === 'object')
			{
				// input[type=file] form
				resolve(formToCanvas(src, options));
			}
			else
			{
				reject(new Error('Not found source'));
			}
		});
	};

	/**
	 * Resize canvas
	 *
	 * @param {HTMLCanvasElement} canvas
	 * @param {object} options
	 * @return {promise}
	 */
	this.resize = function(canvas, options=null)
	{
		options = !!options ? checkOptions(this.options, options) : this.options;

		return new Promise((resolve, reject) => {
			// get size
			let size = getSize(canvas.width, canvas.height, options.width, options.height);

			// resize image
			resizeImage({
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
			})
				.then(resolve)
				.catch(reject);
		});
	};

	/**
	 * Output data
	 *
	 * @param {HTMLCanvasElement} canvas
	 * @param {object} options
	 * @return {promise}
	 */
	this.output = function(canvas, options=null)
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
		if (targetWidth > targetHeight)
		{
			targetHeight = null;
		}
		else
		{
			targetWidth = null;
		}
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
		width: parseInt(w),
		height: parseInt(h)
	};
}

export default ImageResize;
