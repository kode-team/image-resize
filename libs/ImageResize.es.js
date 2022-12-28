const m = {
  quality: 0.75,
  format: "jpg",
  outputType: "base64",
  width: 320,
  height: null,
  reSample: 2,
  bgColor: "#ffffff"
};
function u(a = 320, t = 240, e = "#ffffff") {
  this.el = document.createElement("canvas"), this.ctx = this.el.getContext("2d"), this.el.width = a, this.el.height = t, this.ctx.fillStyle = e, this.ctx.fillRect(0, 0, a, t);
}
const g = {
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
function o(a, t, e) {
  return new Promise((r) => {
    function i(n, l) {
      const f = Math.pow(2, n);
      let h = new u(
        a.width * f,
        a.height * f,
        a.bgColor
      );
      h.ctx.drawImage(
        l,
        0,
        0,
        l.width * 0.5,
        l.height * 0.5
      ), n > 0 ? i(n - 1, h.el) : r(h.el);
    }
    i(t - 1, e);
  });
}
function b(a) {
  a = Object.assign({}, g, a), a.reSample = Math.min(4, a.reSample), a.reSample = Math.max(0, a.reSample);
  const t = Math.pow(2, a.reSample);
  return new Promise(function(e, r) {
    try {
      const i = new u(
        a.width * t,
        a.height * t,
        a.bgColor
      );
      i.ctx.drawImage(
        a.canvas,
        a.cx,
        a.cy,
        a.cw,
        a.ch,
        a.dx * t,
        a.dy * t,
        a.dw * t,
        a.dh * t
      ), a.reSample > 0 ? o(a, a.reSample, i.el).then(e) : e(i.el);
    } catch (i) {
      r(i);
    }
  });
}
function y(a, t = "image/jpeg", e = 0.75) {
  return t = w(t), new Promise(function(r, i) {
    try {
      const n = a.toDataURL(t, e);
      r(n);
    } catch (n) {
      i(n);
    }
  });
}
function S(a, t = "image/jpeg", e = 0.75) {
  return t = w(t), new Promise(function(r, i) {
    try {
      const n = a.toDataURL(t, e), l = x(n);
      r(l);
    } catch (n) {
      i(n);
    }
  });
}
function w(a) {
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
function x(a) {
  const t = atob(a.split(",")[1]), e = a.split(",")[0].split(":")[1].split(";")[0], r = new ArrayBuffer(t.length);
  let i = new Uint8Array(r);
  for (let l = 0; l < t.length; l++)
    i[l] = t.charCodeAt(l);
  const n = new DataView(r);
  return new Blob([n], { type: e });
}
function p(a) {
  return new Promise((t, e) => {
    const r = new FileReader();
    r.onload = (i) => {
      var n;
      return t((n = i.target) == null ? void 0 : n.result);
    }, r.onerror = e, r.readAsDataURL(a);
  });
}
function d(a) {
  return new Promise((t, e) => {
    const r = new Image();
    r.onload = () => t(r), r.onerror = e, r.src = a, r.crossOrigin = "anonymous", r.alt = "";
  });
}
function c(a = {}, t = {}) {
  let e = {};
  return Object.keys(a).forEach((r) => {
    e[r] = t[r] || a[r];
  }), e.width = Number(e.width), e.height = Number(e.height), e.quality = Number(e.quality), e.reSample = Number(e.reSample), e;
}
async function C(a, t) {
  let e;
  const r = await d(a);
  return e = new u(r.width, r.height, t.bgColor), e.ctx.drawImage(r, 0, 0), e.el;
}
async function s(a, t) {
  const e = await p(a), r = await d(e);
  let i = new u(r.width, r.height, t.bgColor);
  return i.ctx.drawImage(r, 0, 0), i.el;
}
function z(a, t, e, r) {
  let i = a, n = t;
  return e && r && (e > r ? r = void 0 : e = void 0), e ? (i = e, n = t * (e / a)) : r && (i = a * (r / t), n = r), { width: Number(i), height: Number(n) };
}
class j {
  constructor(t = {}) {
    this.options = c(m, t);
  }
  async play(t) {
    let e = await this.get(t);
    return e = await this.resize(e), e = await this.resize(e), e = await this.output(e), e;
  }
  async get(t, e = void 0) {
    var r;
    if (e = e ? c(this.options, e) : this.options, typeof t == "string")
      return await C(t, e);
    if (t instanceof File || t instanceof Blob)
      return await s(t, e);
    if (((r = t.tagName) == null ? void 0 : r.toLowerCase()) === "input" && t.type === "file")
      return await s(t.files[0], e);
    throw new Error("Not found source");
  }
  async resize(t, e = void 0) {
    e = e ? c(this.options, e) : this.options;
    let r = z(t.width, t.height, e.width, e.height);
    return await b({
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
  async output(t, e = void 0) {
    switch (e = e ? c(this.options, e) : this.options, e.outputType) {
      case "base64":
        return await y(t, e.format, e.quality);
      case "blob":
        return await S(t, e.format, e.quality);
      case "canvas":
      default:
        return t;
    }
  }
  updateOptions(t) {
    return this.options = c(this.options, t), this;
  }
}
export {
  j as default
};
