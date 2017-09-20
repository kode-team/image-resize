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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

/**
 * Resize image
 *
 * @param {Object} options
 */
function ResizeImage(options) {

	// assign options
	var option = Object.assign({}, base, options);
	console.warn('options', option);

	/**
  * Play convert
  * 이미지 주소로 캔버스로 변환
  *
  * @param {String|Object} src
  * @param {Object} options
  * @return {Promise}
  */
	this.play = function (src, options) {
		// TODO : src가 문자인지 첨부파일 폼 데이터인지 구분하기
		// TODO : canvas로 변환하기
		// TODO : 리샘플링 수치에 따라 이미지 리사이즈 반복하기

		// assign options
		option = Object.assign({}, option, options);

		console.log('action play');

		if (typeof src === 'string') {
			// image url
		} else if ((typeof src === 'undefined' ? 'undefined' : _typeof(src)) === 'object') {
			// input[type=file] form
			console.log(src.files);
		} else {
			// TODO : error처리
		}
	};

	/**
  * Image source to canvas
  * 이미지 주소로 캔버스로 변환
  *
  * @param {String} src
  * @return {Promise}
  */
	this.srcToCanvas = function (src) {
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
  * @return {Promise}
  */
	this.formToCanvas = function (element) {
		var canvas = null;
		return new Promise(function (resolve, reject) {
			function error(e) {
				console.log('error event');
				reject();
			}

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
