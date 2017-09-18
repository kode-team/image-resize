(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ResizeImage = factory());
}(this, (function () { 'use strict';

/**
 * Canvas
 *
 * @param {Number} width
 * @param {Number} height
 * @param {String} bgColor
 */
function Canvas() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 320;
  var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 240;
  var bgColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#ffffff';


  this.el = document.createElement('canvas');
  this.ctx = this.el.getContext('2d');

  this.el.width = width;
  this.el.height = height;

  this.ctx.fillStyle = bgColor;
  this.ctx.fillRect(0, 0, width, height);
}

/**
 * load image
 *
 * @param {String} src
 * @return {Promise}
 */
function loadImage(src) {
	return new Promise(function (resolve) {
		if (src) {
			var image = new Image();

			image.onload = function (e) {
				resolve(image);
			};
			image.onError = function (e) {
				resolve(null);
			};

			console.warn(src);
			image.setAttribute('crossOrigin', 'anonymous');
			image.src = src;
		} else {
			resolve(null);
		}
	});
}

var base = {

	quality: .75,
	format: 'jpg', // png,jpg
	width: 320,
	height: 240,
	reSample: 2,
	bgColor: '#ff0000'

};

/**
 * Resize image
 *
 * @param {Object} options
 */
function ResizeImage(options) {

	// assign options
	var option = Object.assign({}, base, options);

	console.log('options', option);

	this.play = function () {};

	/**
  * Play convert
  * 이미지 주소로 캔버스로 변환
  *
  * @param {String} src
  * @param {Object} options
  * @return {Promise}
  */
	this.srcToCanvas = function (src, options) {
		// assign options
		option = Object.assign({}, option, options);

		// TODO : 이미지 url로 입력했을때 이미지를 가져와서 리사이즈를 하기
		return new Promise(function (resolve, reject) {
			loadImage(src).then(function (image) {
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
	this.formToCanvas = function (element, options) {
		function error(e) {
			console.log('error event');
		}

		var canvas = null;
		return new Promise(function (resolve, reject) {
			var reader = new FileReader();
			reader.onload = function (e) {
				var img = new Image();
				img.onload = function () {
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

return ResizeImage;

})));
//# sourceMappingURL=ResizeImage.js.map
