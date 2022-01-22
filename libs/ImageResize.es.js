function Canvas(width = 320, height = 240, bgColor = "#ffffff") {
  this.el = document.createElement("canvas");
  this.ctx = this.el.getContext("2d");
  this.el.width = width;
  this.el.height = height;
  this.ctx.fillStyle = bgColor;
  this.ctx.fillRect(0, 0, width, height);
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
  let format;
  switch (str) {
    case "jpg":
    case "jpeg":
      format = "image/jpeg";
      break;
    case "png":
      format = "image/png";
      break;
    default:
      format = str;
      break;
  }
  return format;
}
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  let _ia = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    _ia[i] = byteString.charCodeAt(i);
  }
  const dataView = new DataView(arrayBuffer);
  const blob2 = new Blob([dataView], { type: mimeString });
  return blob2;
}
function fileReader(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      var _a;
      return resolve((_a = e.target) == null ? void 0 : _a.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function imageLoader(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
    image.crossOrigin = "anonymous";
    image.alt = "";
  });
}
function ImageResize(getOptions = {}) {
  this.options = checkOptions(base, getOptions);
  function checkOptions(original = {}, target = {}) {
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
  async function urlToCanvas(src, options) {
    let canvas;
    const img = await imageLoader(src);
    canvas = new Canvas(img.width, img.height, options.bgColor);
    canvas.ctx.drawImage(img, 0, 0);
    return canvas.el;
  }
  async function fileToCanvas(file, options) {
    const resource = await fileReader(file);
    const image = await imageLoader(resource);
    let canvas = new Canvas(image.width, image.height, options.bgColor);
    canvas.ctx.drawImage(image, 0, 0);
    return canvas.el;
  }
  this.play = async (src) => {
    let res = await this.get(src);
    res = await this.resize(res);
    res = await this.resize(res);
    res = await this.output(res);
    return res;
  };
  this.get = async function(src, options = null) {
    var _a;
    options = !!options ? checkOptions(this.options, options) : this.options;
    if (typeof src === "string") {
      return await urlToCanvas(src, options);
    } else if (src instanceof File || src instanceof Blob) {
      return await fileToCanvas(src, options);
    } else if (((_a = src.tagName) == null ? void 0 : _a.toLowerCase()) === "input" && src.type === "file") {
      return await fileToCanvas(src.files[0], options);
    }
    throw new Error("Not found source");
  };
  this.resize = async (canvas, options) => {
    options = !!options ? checkOptions(this.options, options) : this.options;
    let size = getSize(canvas.width, canvas.height, options.width, options.height);
    return await resizeImage({
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
    });
  };
  this.output = function(canvas, options) {
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
    if (targetWidth > targetHeight)
      targetHeight = void 0;
    else
      targetWidth = void 0;
  }
  if (targetWidth) {
    w = targetWidth;
    h = height * (targetWidth / width);
  } else if (targetHeight) {
    w = width * (targetHeight / height);
    h = targetHeight;
  }
  return {
    width: Number(w),
    height: Number(h)
  };
}
export { ImageResize as default };
