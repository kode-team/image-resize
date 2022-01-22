function Canvas(width = 320, height = 240, bgColor = "#ffffff") {
  this.el = document.createElement("canvas");
  this.ctx = this.el.getContext("2d");
  this.el.width = width;
  this.el.height = height;
  this.ctx.fillStyle = bgColor;
  this.ctx.fillRect(0, 0, width, height);
}
function loadImage(src) {
  return new Promise((resolve, reject) => {
    if (src) {
      let image = new Image();
      image.onload = function(e) {
        resolve(image);
      };
      image.onerror = function(e) {
        reject(e);
      };
      image.setAttribute("crossOrigin", "anonymous");
      image.src = src;
    } else {
      reject(new Error("no src"));
    }
  });
}
const base = {
  quality: 0.75,
  format: "jpg",
  outputType: "base64",
  width: 320,
  height: null,
  reSample: 2,
  bgColor: "#ffffff",
  saveExif: false
};
const defaultOptions = {
  canvas: null,
  reSample: 2,
  width: 320,
  height: 240,
  cx: 0,
  cy: 0,
  cw: 0,
  ch: 0,
  dx: 0,
  dy: 0,
  dw: 0,
  dh: 0,
  bgColor: "#ffffff"
};
function resize(options, count, parentCanvas) {
  return new Promise((resolve) => {
    function func(count2, parentCanvas2) {
      const pow = Math.pow(2, count2);
      let canvasForResize = new Canvas(options.width * pow, options.height * pow, options.bgColor);
      canvasForResize.ctx.drawImage(parentCanvas2, 0, 0, parentCanvas2.width * 0.5, parentCanvas2.height * 0.5);
      if (count2 > 0) {
        func(count2 - 1, canvasForResize.el);
      } else {
        resolve(canvasForResize.el);
      }
    }
    func(count - 1, parentCanvas);
  });
}
function resizeImage(options) {
  options = Object.assign({}, defaultOptions, options);
  options.reSample = Math.min(4, options.reSample);
  options.reSample = Math.max(0, options.reSample);
  const reSamplingCount = Math.pow(2, options.reSample);
  return new Promise(function(resolve, reject) {
    try {
      const canvas = new Canvas(options.width * reSamplingCount, options.height * reSamplingCount, options.bgColor);
      canvas.ctx.drawImage(options.canvas, options.cx, options.cy, options.cw, options.ch, options.dx * reSamplingCount, options.dy * reSamplingCount, options.dw * reSamplingCount, options.dh * reSamplingCount);
      if (options.reSample > 0) {
        resize(options, options.reSample, canvas.el).then(resolve);
      } else {
        resolve(canvas.el);
      }
    } catch (e) {
      reject(e);
    }
  });
}
function base64(canvas, format = "image/jpeg", quality = 0.75) {
  format = getFormat(format);
  return new Promise(function(resolve, reject) {
    try {
      const uri = canvas.toDataURL(format, quality);
      resolve(uri);
    } catch (e) {
      reject(e);
    }
  });
}
function blob(canvas, format = "image/jpeg", quality = 0.75) {
  format = getFormat(format);
  return new Promise(function(resolve, reject) {
    try {
      const uri = canvas.toDataURL(format, quality);
      const blob2 = dataURItoBlob(uri);
      resolve(blob2);
    } catch (e) {
      reject(e);
    }
  });
}
function getFormat(str) {
  let format = null;
  switch (str) {
    case 'jpg:
    case 'jpeg:
      format = 'image/jpeg';
      break;
    case 'png:
      format = 'image/png';
      break;
    default:
      format = str;
      break;
  }
  return format;
}
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  let _ia = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++)
  {
    _ia[i] = byteString.charCodeAt(i);
  }
  const dataView = new DataView(arrayBuffer);
  const blob2 = new Blob([dataView], { type: mimeString });
  return blob2;
}
function ImageResize(getOptions = {}) {
  this.options = checkOptions(base, getOptions);
  function checkOptions(original = {}, target = {}) {
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
  function srcToCanvas(src, options) {
    let canvas = null;
    return new Promise(function(resolve, reject) {
      loadImage(src).then(function(img) {
        canvas = new Canvas(img.width, img.height, options.bgColor);
        canvas.ctx.drawImage(img, 0, 0);
        resolve(canvas.el);
      }, function(error) {
        reject(error);
      });
    });
  }
  function formToCanvas(el, options) {
    let canvas = null;
    return new Promise(function(resolve, reject) {
      function error(e) {
        reject(e);
      }
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
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
  this.play = function(src) {
    return new Promise((resolve, reject) => {
      this.get(src).then((canvas) => this.resize(canvas)).then((canvas) => this.output(canvas)).then((result) => resolve(result)).catch((error) => reject(error));
    });
  };
  this.get = function(src, options = null) {
    options = !!options ? checkOptions(this.options, options) : this.options;
    return new Promise((resolve, reject) => {
      if (typeof src === "string") {
        resolve(srcToCanvas(src, options));
      } else if (typeof src === "object") {
        resolve(formToCanvas(src, options));
      } else {
        reject(new Error("Not found source"));
      }
    });
  };
  this.resize = function(canvas, options = null) {
    options = !!options ? checkOptions(this.options, options) : this.options;
    return new Promise((resolve, reject) => {
      let size = getSize(canvas.width, canvas.height, options.width, options.height);
      resizeImage({
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
        bgColor: options.bgColor
      }).then(resolve).catch(reject);
    });
  };
  this.output = function(canvas, options = null) {
    options = !!options ? checkOptions(this.options, options) : this.options;
    return new Promise((resolve, reject) => {
      switch (options.outputType) {
        case "base64":
          base64(canvas, options.format, options.quality).then(resolve).catch(reject);
          break;
        case "blob":
          blob(canvas, options.format, options.quality).then(resolve).catch(reject);
          break;
        case "canvas":
        default:
          resolve(canvas);
          break;
      }
    });
  };
  this.updateOptions = function(value) {
    this.options = checkOptions(this.options, value);
    return this;
  };
}
function getSize(width, height, targetWidth, targetHeight) {
  let w = width;
  let h = height;
  if (targetWidth && targetHeight) {
    if (targetWidth > targetHeight) {
      targetHeight = null;
    } else {
      targetWidth = null;
    }
  }
  if (targetWidth) {
    w = targetWidth;
    h = height * (targetWidth / width);
  } else if (targetHeight) {
    w = width * (targetHeight / height);
    h = targetHeight;
  }
  return {
    width: parseInt(w),
    height: parseInt(h)
  };
}
export { ImageResize as default };
