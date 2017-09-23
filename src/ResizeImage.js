import Canvas from './parts/Canvas';
import * as events from './parts/events';
import * as defaultOptions from './parts/defaultOptions';
import resizeImage from './parts/resizeImage';
import * as output from './parts/output';


/**
 * Resize image
 *
 * @param {Object} options
 */
function ResizeImage(options) {

	// assign options
	this.options = checkOptions(defaultOptions.base, options);

	/**
	 * FUNCTION AREA
	 */

	/**
	 * Check options
	 *
	 * @param {Object} original
	 * @param {Object} target
	 */
	function checkOptions(original={}, target={})
	{
		var result = {};

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
	 * @param {String} src
	 * @param {Object} option
	 * @return {Promise}
	 */
	function srcToCanvas(src, option)
	{
		let canvas = null;
		return new Promise(function(resolve, reject) {
			events.loadImage(src).then(
				// resolve
				function(img)
				{
					canvas = new Canvas(img.width, img.height, option.bgColor);
					canvas.ctx.drawImage(img, 0, 0);
					resolve(canvas);
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
	 * @param {Object} option
	 * @return {Promise}
	 */
	function formToCanvas(el, option)
	{
		let canvas = null;
		return new Promise(function(resolve, reject) {
			function error(e)
			{
				console.log('error event');
				reject(e);
			}

			const reader = new FileReader();
			reader.onload = function(e)
			{
				const img = new Image();
				img.onload = function()
				{
					canvas = new Canvas(img.width, img.height, option.bgColor);
					canvas.ctx.drawImage(img, 0, 0);
					resolve(canvas);
				};
				img.onerror = error;
				img.src = e.target.result;
			};
			reader.onerror = error;
			reader.readAsDataURL(el.files[0]);
		});
	}

	/**
	 * Resize canvas
	 *
	 * @param {Canvas} canvas
	 * @param {Object} option
	 * @return {Promise}
	 */
	function resizeCanvas(canvas, option)
	{
		return new Promise((resolve, reject) => {
			// get size
			let size = getSize(canvas.el.width, canvas.el.height, option.width, option.height);

			// resize image
			resizeImage({
				canvas: canvas,
				reSample: option.reSample,
				width: size.width,
				height: size.height,
				cx: 0,
				cy: 0,
				cw: canvas.el.width,
				ch: canvas.el.height,
				dx: 0,
				dy: 0,
				dw: size.width,
				dh: size.height,
				bgColor: option.bgColor,
			})
				.then(resolve)
				.catch(reject);
		});
	}

	/**
	 * Convert to image
	 * 이미지 데이터로 변환
	 *
	 * @param {Canvas} canvas
	 * @param {Object} option
	 * @return {*}
	 */
	function convertToImage(canvas, option)
	{
		return new Promise((resolve, reject) => {

			switch (option.outputType)
			{
				case 'base64':
					output.base64(canvas.el, option.format, option.quality)
						.then(resolve)
						.catch(reject);
					break;
				case 'blob':
					output.blob(canvas.el, option.format, option.quality)
						.then(resolve)
						.catch(reject);
					break;
				case 'canvas':
				default:
					resolve(canvas.el);
					break;
			}
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
		// fire ready callback function
		if (this.options.callback_ready)
		{
			this.options.callback_ready();
		}

		return new Promise((resolve, reject) => {
			if (typeof src === 'string')
			{
				// image url
				srcToCanvas(src, this.options)
					.then((canvas) => resizeCanvas(canvas, this.options))
					.then((canvas) => convertToImage(canvas, this.options))
					.then((result) => resolve(result))
					.catch((error) => reject(error));
			}
			else if (typeof src === 'object')
			{
				// input[type=file] form
				formToCanvas(src, this.options)
					.then((canvas) => resizeCanvas(canvas, this.options))
					.then((canvas) => convertToImage(canvas, this.options))
					.then((result) => resolve(result))
					.catch((error) => reject(error));
			}
			else
			{
				reject(new Error('Not found source'));
			}
		});
	};

	/**
	 * Update options
	 *
	 * @param {Object} options
	 */
	this.updateOptions = function(options)
	{
		this.options = checkOptions(this.options, options);
	}
}


/**
 * Get image size
 *
 * @param {Number} width original width
 * @param {Number} height original height
 * @param {Number} targetWidth target width
 * @param {Number} targetHeight target height
 * @return {Object}
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


export default ResizeImage;
