import Canvas from './parts/Canvas';
import * as events from './parts/events';
import * as defaultOptions from './parts/defaultOptions';


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
	 * 이미지 주소로 캔버스로 변환 -> 캔버스를 리사이즈 -> 이미지로 컨버트
	 *
	 * @param {String|Object} src
	 * @param {Object} options
	 * @return {Promise}
	 */
	this.play = function(src, options)
	{
		// TODO OK : src가 문자인지 첨부파일 폼 데이터인지 구분하기
		// TODO : canvas로 변환하기
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
					.then((canvas) => this.convert(canvas))
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
			resolve(canvas);
		});
	};

	/**
	 * Convert to image
	 * 이미지 데이터로 변환
	 *
	 * @param {Canvas} canvas
	 * @return {*}
	 */
	this.convert = function(canvas)
	{
		return new Promise((resolve, reject) => {
			resolve(canvas);
		});
	}

}


export default ResizeImage;