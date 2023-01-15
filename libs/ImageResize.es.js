const D = {
  quality: 0.75,
  format: "jpg",
  // png,jpg,webp
  outputType: "base64",
  // base64,canvas,blob
  width: 320,
  height: null,
  reSample: 2,
  bgColor: "#ffffff",
  sharpen: 0
};
function b(a = 320, t = 240, e = "#ffffff") {
  this.el = document.createElement("canvas"), this.ctx = this.el.getContext("2d"), this.el.width = a, this.el.height = t, this.ctx.fillStyle = e, this.ctx.fillRect(0, 0, a, t);
}
const M = {
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
function q(a, t, e) {
  return new Promise((r) => {
    function n(i, c) {
      const l = Math.pow(2, i);
      let h = new b(
        a.width * l,
        a.height * l,
        a.bgColor
      );
      h.ctx.drawImage(
        c,
        0,
        0,
        c.width * 0.5,
        c.height * 0.5
      ), i > 0 ? n(i - 1, h.el) : r(h.el);
    }
    n(t - 1, e);
  });
}
function P(a) {
  a = Object.assign({}, M, a), a.reSample = Math.min(4, a.reSample), a.reSample = Math.max(0, a.reSample);
  const t = Math.pow(2, a.reSample);
  return new Promise(function(e, r) {
    try {
      const n = new b(
        a.width * t,
        a.height * t,
        a.bgColor
      );
      n.ctx.drawImage(
        a.canvas,
        a.cx,
        a.cy,
        a.cw,
        a.ch,
        a.dx * t,
        a.dy * t,
        a.dw * t,
        a.dh * t
      ), a.reSample > 0 ? q(a, a.reSample, n.el).then(e) : e(n.el);
    } catch (n) {
      r(n);
    }
  });
}
function A(a, t = "image/jpeg", e = 0.75) {
  return t = j(t), new Promise(function(r, n) {
    try {
      const i = a.toDataURL(t, e);
      r(i);
    } catch (i) {
      n(i);
    }
  });
}
function B(a, t = "image/jpeg", e = 0.75) {
  return t = j(t), new Promise(function(r, n) {
    try {
      const i = a.toDataURL(t, e), c = L(i);
      r(c);
    } catch (i) {
      n(i);
    }
  });
}
function j(a) {
  let t;
  switch (a) {
    case "jpg":
    case "jpeg":
      t = "image/jpeg";
      break;
    case "png":
      t = "image/png";
      break;
    case "webp":
      t = "image/webp";
      break;
    default:
      t = a;
      break;
  }
  return t;
}
function L(a) {
  const t = atob(a.split(",")[1]), e = a.split(",")[0].split(":")[1].split(";")[0], r = new ArrayBuffer(t.length);
  let n = new Uint8Array(r);
  for (let c = 0; c < t.length; c++)
    n[c] = t.charCodeAt(c);
  const i = new DataView(r);
  return new Blob([i], { type: e });
}
function k(a, t, e) {
  const r = a.data, n = t.data, i = a.width, c = a.height, l = Math.round(Math.sqrt(e.length)), h = Math.floor(l / 2), p = i, R = c;
  for (let u = 0; u < R; u++)
    for (let f = 0; f < p; f++) {
      let S = 0, C = 0, I = 0, N = 0;
      for (let o = 0; o < l; o++)
        for (let d = 0; d < l; d++) {
          const y = u + o - h, x = f + d - h;
          if (y >= 0 && y < c && x >= 0 && x < i) {
            let g = (y * i + x) * 4, m = e[o * l + d];
            S += r[g] * m, C += r[g + 1] * m, I += r[g + 2] * m, N += r[g + 3] * m;
          }
        }
      const w = (u * p + f) * 4;
      n[w] = S, n[w + 1] = C, n[w + 2] = I, n[w + 3] = N;
    }
  return t;
}
function E(a, t = 0) {
  if (t <= 0)
    return a;
  const e = document.createElement("canvas");
  e.width = a.width, e.height = a.height;
  const r = e.getContext("2d");
  r.drawImage(a, 0, 0);
  const n = r.getImageData(0, 0, e.width, e.height), i = r.createImageData(e.width, e.height), c = k(n, i, [
    0,
    -1,
    0,
    -1,
    5,
    -1,
    0,
    -1,
    0
  ]);
  r.putImageData(c, 0, 0);
  const l = a.getContext("2d");
  return l.globalAlpha = t || 1, l.drawImage(e, 0, 0), a;
}
function F(a) {
  return new Promise((t, e) => {
    const r = new FileReader();
    r.onload = (n) => {
      var i;
      return t((i = n.target) == null ? void 0 : i.result);
    }, r.onerror = e, r.readAsDataURL(a);
  });
}
function z(a) {
  return new Promise((t, e) => {
    const r = new Image();
    r.onload = () => t(r), r.onerror = e, r.src = a, r.crossOrigin = "anonymous", r.alt = "";
  });
}
function s(a = {}, t = {}) {
  let e = {};
  return Object.keys(a).forEach((r) => {
    e[r] = t[r] || a[r];
  }), e.width = Number(e.width), e.height = Number(e.height), e.quality = Number(e.quality), e.reSample = Number(e.reSample), e;
}
async function T(a, t) {
  let e;
  const r = await z(a);
  return e = new b(r.width, r.height, t.bgColor), e.ctx.drawImage(r, 0, 0), e.el;
}
async function O(a, t) {
  const e = await F(a), r = await z(e);
  let n = new b(r.width, r.height, t.bgColor);
  return n.ctx.drawImage(r, 0, 0), n.el;
}
function U(a, t, e, r) {
  let n = a, i = t;
  return e && r && (e > r ? r = void 0 : e = void 0), e ? (n = e, i = t * (e / a)) : r && (n = a * (r / t), i = r), {
    width: Number(n),
    height: Number(i)
  };
}
class V {
  /**
   * constructor
   *
   * @param {object} getOptions
   */
  constructor(t = {}) {
    this.options = s(D, t);
  }
  /**
   * Play convert
   * 이미지 변환 실행
   * 이미지 주소로 캔버스로 변환 -> 캔버스를 리사이즈 -> 이미지로 컨버트
   *
   * @param {string|HTMLInputElement|File|Blob} src
   * @return {Promise<string>}
   */
  async play(t) {
    let e = await this.get(t);
    return e = await this.resize(e), e = await this.sharpen(e), e = await this.output(e), e;
  }
  /**
   * Get source
   *
   * @param {string|HTMLInputElement|File|Blob} src
   * @param {object} options
   * @return {Promise<HTMLCanvasElement>}
   */
  async get(t, e = void 0) {
    var r;
    if (e = e ? s(this.options, e) : this.options, typeof t == "string")
      return await T(t, e);
    if (t instanceof File || t instanceof Blob)
      return await O(t, e);
    if (((r = t.tagName) == null ? void 0 : r.toLowerCase()) === "input" && t.type === "file")
      return await O(t.files[0], e);
    throw new Error("Not found source");
  }
  /**
   * Resize canvas
   *
   * @param {HTMLCanvasElement} canvas
   * @param {object} options
   * @return {Promise<HTMLCanvasElement>}
   */
  async resize(t, e = void 0) {
    e = e ? s(this.options, e) : this.options;
    let r = U(t.width, t.height, e.width, e.height);
    return await P({
      canvas: t,
      reSample: e.reSample,
      width: r.width,
      height: r.height,
      cx: 0,
      cy: 0,
      cw: t.width,
      ch: t.height,
      dx: 0,
      dy: 0,
      dw: r.width,
      dh: r.height,
      bgColor: e.bgColor
    });
  }
  sharpen(t, e = void 0) {
    return e = isNaN(e) ? this.options.sharpen : e, E(t, e);
  }
  /**
   * Output data
   *
   * @param {HTMLCanvasElement} canvas
   * @param {object} options
   * @return {Promise}
   */
  async output(t, e = void 0) {
    switch (e = e ? s(this.options, e) : this.options, e.outputType) {
      case "base64":
        return await A(t, e.format, e.quality);
      case "blob":
        return await B(t, e.format, e.quality);
      case "canvas":
      default:
        return t;
    }
  }
  /**
   * Update options
   *
   * @param {object} value
   * @return {ImageResize}
   */
  updateOptions(t) {
    return this.options = s(this.options, t), this;
  }
}
export {
  V as default
};
