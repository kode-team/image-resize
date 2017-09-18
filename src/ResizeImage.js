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


	console.log('options', option);

	this.play = function()
	{

	};

	/**
	 * Play convert
	 * 이미지 주소로 캔버스로 변환
	 *
	 * @param {String} src
	 * @param {Object} options
	 * @return {Promise}
	 */
	this.srcToCanvas = function(src, options)
	{
		// assign options
		option = Object.assign({}, option, options);

		// TODO : 이미지 url로 입력했을때 이미지를 가져와서 리사이즈를 하기
		return new Promise(function(resolve, reject) {
			events.loadImage(src).then(function(image) {
				document.querySelector('main').appendChild(image);
			});
		});
	};

	/**
	 * Upload to image
	 * 첨부로 가져온 이미지를 캔버스로 변환
	 *
	 * @param {HTMLElement} element
	 * @param {Object} options
	 * @return {Promise}
	 */
	this.formToCanvas = function(element, options)
	{
		function error(e)
		{
			console.log('error event');
		}

		let canvas = null;
		return new Promise(function(resolve, reject) {
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

}


export default ResizeImage;