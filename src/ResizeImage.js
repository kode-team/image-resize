import Canvas from './parts/Canvas';
import * as events from './parts/events';
import * as defaultOptions from './parts/defaultOptions';
import resizeImage from './parts/resizeImage';


/**
 * Resize image
 *
 * @param {Object} options
 */
function ResizeImage(options) {

	// assign options
	let option = Object.assign({}, defaultOptions.base, options);
	console.warn('DEFAULT OPTIONS', option);

	/**
	 * Play convert
	 * 이미지 변환 실행
	 * 이미지 주소로 캔버스로 변환 -> 캔버스를 리사이즈 -> 이미지로 컨버트
	 *
	 * @param {String|Object} src
	 * @param {Object} options
	 * @return {Promise}
	 */
	this.play = function(src, options)
	{
		// TODO OK : src가 문자인지 첨부파일 폼 데이터인지 구분하기
		// TODO OK : canvas로 변환하기
		// TODO : 리샘플링 수치에 따라 이미지 리사이즈 반복하기

		// assign options
		option = Object.assign({}, option, options);

		// fire ready callback function
		if (option.callback_ready)
		{
			option.callback_ready();
		}

		return new Promise((resolve, reject) => {
			if (typeof src === 'string')
			{
				// image url
				this.srcToCanvas(src)
					.then((canvas) => this.resizeCanvas(canvas))
					.then((canvas) => this.convertToImage(canvas))
					.then((result) => resolve(result))
					.catch((error) => reject(error));
			}
			else if (typeof src === 'object')
			{
				// input[type=file] form
				// TODO : 작업예정
				this.formToCanvas(src)
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
	 * Image source to canvas
	 * 이미지 주소로 캔버스로 변환
	 *
	 * @param {String} src
	 * @return {Promise}
	 */
	this.srcToCanvas = function(src)
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
	};

	/**
	 * Upload to image
	 * 첨부로 가져온 이미지를 캔버스로 변환
	 *
	 * @param {HTMLElement} element
	 * @return {Promise}
	 */
	this.formToCanvas = function(element)
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
			reader.readAsDataURL(element.target.files[0]);
		});
	};

	/**
	 * Resize canvas
	 *
	 * @param {Canvas} canvas
	 * @return {Promise}
	 */
	this.resizeCanvas = function(canvas)
	{
		return new Promise((resolve, reject) => {
			// get size
			let size = getSize(canvas.el.width, canvas.el.height, option.width, option.height);

			resizeImage({
				canvas: canvas,
				reSample: option.reSample,
				width: option.width,
				height: option.height,
				cx: 0,
				cy: 0,
				cw: canvas.el.width,
				ch: canvas.el.height,
				dx: 0,
				dy: 0,
				dw: size.width,
				dh: size.height,
				bgColor: option.bgColor,
			}).then((res) => {
				console.log('GOAL!!!');
				resolve(canvas);
			});
		});
	};

	/**
	 * Convert to image
	 * 이미지 데이터로 변환
	 *
	 * @param {Canvas} canvas
	 * @return {*}
	 */
	this.convertToImage = function(canvas)
	{
		return new Promise((resolve, reject) => {
			resolve(canvas);
		});
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
