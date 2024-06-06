const W = "KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2NvbnN0IG89e1NUQVJUOiJTVEFSVCIsRU5EOiJFTkQiLE5FV19DQU5WQVM6Ik5FV19DQU5WQVMiLEVSUk9SOiJFUlJPUiJ9LFQ9e2NhbnZhczpudWxsLHJlU2FtcGxlOjIsd2lkdGg6MzIwLGhlaWdodDoyNDAsY3g6MCxjeTowLGN3OjAsY2g6MCxkeDowLGR5OjAsZHc6MCxkaDowLGJnQ29sb3I6InRyYW5zcGFyZW50In07YXN5bmMgZnVuY3Rpb24gRShlKXtyZXR1cm4gYXdhaXQoYXdhaXQgZmV0Y2goZSkpLmJsb2IoKX1mdW5jdGlvbiBrKGUpe3JldHVybiBuZXcgUHJvbWlzZSgodCxhKT0+e2NvbnN0IG49bmV3IEZpbGVSZWFkZXI7bi5vbmxvYWQ9cj0+e3ZhciBjO3JldHVybiB0KChjPXIudGFyZ2V0KT09bnVsbD92b2lkIDA6Yy5yZXN1bHQpfSxuLm9uZXJyb3I9YSxuLnJlYWRBc0RhdGFVUkwoZSl9KX1mdW5jdGlvbiBJKGUpe2NvbnN0IHQ9YXRvYihlLnNwbGl0KCIsIilbMV0pLGE9ZS5tYXRjaCgvW146XVx3K1wvW1x3LStcZC5dKyg/PTt8LCkvKVswXSxuPXQubGVuZ3RoLHI9bmV3IFVpbnQ4QXJyYXkobik7Zm9yKGxldCBjPTA7YzxuO2MrKylyW2NdPXQuY2hhckNvZGVBdChjKTtyZXR1cm4gbmV3IEJsb2IoW3IuYnVmZmVyXSx7dHlwZTphfSl9ZnVuY3Rpb24gRChlLHQsYSxuKXtsZXQgcj1lLGM9dDtyZXR1cm4gYSYmbiYmKGE+bj9uPXZvaWQgMDphPXZvaWQgMCksYT8ocj1hLGM9dCooYS9lKSk6biYmKHI9ZSoobi90KSxjPW4pLHt3aWR0aDpOdW1iZXIociksaGVpZ2h0Ok51bWJlcihjKX19ZnVuY3Rpb24gTyhlLHQ9MCxhKXtpZih0PD0wKXJldHVybiBlO2NvbnN0IG49YS5nZXRDb250ZXh0KCIyZCIpO24uZHJhd0ltYWdlKGUsMCwwKTtjb25zdCByPW4uZ2V0SW1hZ2VEYXRhKDAsMCxhLndpZHRoLGEuaGVpZ2h0KSxjPW4uY3JlYXRlSW1hZ2VEYXRhKGEud2lkdGgsYS5oZWlnaHQpLGk9QihyLGMsWzAsLTEsMCwtMSw1LC0xLDAsLTEsMF0pO24ucHV0SW1hZ2VEYXRhKGksMCwwKTtjb25zdCBzPWUuZ2V0Q29udGV4dCgiMmQiKTtyZXR1cm4gcy5nbG9iYWxBbHBoYT10fHwxLHMuZHJhd0ltYWdlKGEsMCwwKSxlfWZ1bmN0aW9uIEIoZSx0LGEpe2NvbnN0IG49ZS5kYXRhLHI9dC5kYXRhLGM9ZS53aWR0aCxpPWUuaGVpZ2h0LHM9TWF0aC5yb3VuZChNYXRoLnNxcnQoYS5sZW5ndGgpKSxsPU1hdGguZmxvb3Iocy8yKSx5PWMsSz1pO2ZvcihsZXQgZD0wO2Q8SztkKyspZm9yKGxldCBoPTA7aDx5O2grKyl7bGV0IHA9MCxBPTAsTj0wLE09MDtmb3IobGV0IGY9MDtmPHM7ZisrKWZvcihsZXQgZz0wO2c8cztnKyspe2NvbnN0IHg9ZCtmLWwsUz1oK2ctbDtpZih4Pj0wJiZ4PGkmJlM+PTAmJlM8Yyl7bGV0IGI9KHgqYytTKSo0LG09YVtmKnMrZ107cCs9bltiXSptLEErPW5bYisxXSptLE4rPW5bYisyXSptLE0rPW5bYiszXSptfX1jb25zdCB3PShkKnkraCkqNDtyW3ddPXAsclt3KzFdPUEsclt3KzJdPU4sclt3KzNdPU19cmV0dXJuIHR9ZnVuY3Rpb24geihlLHQ9ImltYWdlL2pwZWciLGE9Ljc1KXtyZXR1cm4gdD1SKHQpLG5ldyBQcm9taXNlKGFzeW5jKG4scik9Pnt0cnl7Y29uc3QgYz1hd2FpdCBqKGUsdCxhKTtuKGMpfWNhdGNoKGMpe3IoYyl9fSl9ZnVuY3Rpb24gUChlLHQ9ImltYWdlL2pwZWciLGE9Ljc1KXtyZXR1cm4gdD1SKHQpLG5ldyBQcm9taXNlKGFzeW5jKG4scik9Pnt0cnl7Y29uc3QgYz1hd2FpdCBlLmNvbnZlcnRUb0Jsb2Ioe3R5cGU6dCxxdWFsaXR5OmF9KTtuKGMpfWNhdGNoKGMpe3IoYyl9fSl9ZnVuY3Rpb24gUihlKXtsZXQgdDtzd2l0Y2goZSl7Y2FzZSJqcGciOmNhc2UianBlZyI6dD0iaW1hZ2UvanBlZyI7YnJlYWs7Y2FzZSJwbmciOnQ9ImltYWdlL3BuZyI7YnJlYWs7Y2FzZSJ3ZWJwIjp0PSJpbWFnZS93ZWJwIjticmVhaztkZWZhdWx0OnQ9ZTticmVha31yZXR1cm4gdH1hc3luYyBmdW5jdGlvbiBqKGUsdCxhKXtjb25zdCBuPWF3YWl0IGUuY29udmVydFRvQmxvYih7dHlwZTp0LHF1YWxpdHk6YX0pLHI9bmV3IEZpbGVSZWFkZXI7cmV0dXJuIG5ldyBQcm9taXNlKGM9PntyLm9ubG9hZGVuZD0oKT0+YyhyLnJlc3VsdCksci5yZWFkQXNEYXRhVVJMKG4pfSl9bGV0IF89MDtjb25zdCBDPW5ldyBNYXA7b25tZXNzYWdlPWFzeW5jIGZ1bmN0aW9uKGUpe2NvbnN0e2tleTp0LGlkOmEsc3JjOm4sb3B0aW9uczpyfT1lLmRhdGE7dHJ5e2lmKGEhPT12b2lkIDApe2NvbnN0IGM9Qy5nZXQoYSk7YyYmYyhlLmRhdGEpfWVsc2Ugc3dpdGNoKHQpe2Nhc2Ugby5TVEFSVDpsZXQgYz1hd2FpdCBxKG4scik7Yz1hd2FpdCBVKGMsciksYz1hd2FpdCB2KGMsciksYXdhaXQgRyhjLHIpO2JyZWFrO2Nhc2Ugby5ORVdfQ0FOVkFTOmJyZWFrfX1jYXRjaChjKXtwb3N0TWVzc2FnZSh7a2V5Om8uRVJST1IsZXJyb3I6Y30pfX07ZnVuY3Rpb24gRihlLHQpe3JldHVybiBuZXcgUHJvbWlzZShhPT57Y29uc3Qgbj1fKys7Qy5zZXQobixhKSxwb3N0TWVzc2FnZSh7aWQ6bixrZXk6ZSwuLi50fSl9KX1hc3luYyBmdW5jdGlvbiBxKGUsdCl7aWYodHlwZW9mIGU9PSJzdHJpbmciKXtjb25zdCBhPWF3YWl0IEUoZSksbj1hd2FpdCBjcmVhdGVJbWFnZUJpdG1hcChhKSxyPWF3YWl0IHUobi53aWR0aCxuLmhlaWdodCx0LmJnQ29sb3IpO3JldHVybiByLmdldENvbnRleHQoIjJkIikuZHJhd0ltYWdlKG4sMCwwKSxyfWVsc2UgaWYoZSBpbnN0YW5jZW9mIEZpbGV8fGUgaW5zdGFuY2VvZiBCbG9iKXtjb25zdCBhPWF3YWl0IGsoZSksbj1JKGEpLHI9YXdhaXQgY3JlYXRlSW1hZ2VCaXRtYXAobiksYz1hd2FpdCB1KHIud2lkdGgsci5oZWlnaHQsdC5iZ0NvbG9yKTtyZXR1cm4gYy5nZXRDb250ZXh0KCIyZCIpLmRyYXdJbWFnZShyLDAsMCksY319YXN5bmMgZnVuY3Rpb24gdShlPTMyMCx0PTI0MCxhPSJ0cmFuc3BhcmVudCIpe2NvbnN0IHI9KGF3YWl0IEYoby5ORVdfQ0FOVkFTLHt3aWR0aDplLGhlaWdodDp0fSkpLmNhbnZhcyxjPXIuZ2V0Q29udGV4dCgiMmQiKTtyZXR1cm4gYy5maWxsU3R5bGU9YSxjLmZpbGxSZWN0KDAsMCxlLHQpLHJ9YXN5bmMgZnVuY3Rpb24gVShlLHQpe2NvbnN0IGE9RChlLndpZHRoLGUuaGVpZ2h0LHQud2lkdGgsdC5oZWlnaHQpO3JldHVybiBhd2FpdCBWKHtjYW52YXM6ZSxyZVNhbXBsZTp0LnJlU2FtcGxlLHdpZHRoOmEud2lkdGgsaGVpZ2h0OmEuaGVpZ2h0LGN4OjAsY3k6MCxjdzplLndpZHRoLGNoOmUuaGVpZ2h0LGR4OjAsZHk6MCxkdzphLndpZHRoLGRoOmEuaGVpZ2h0LGJnQ29sb3I6dC5iZ0NvbG9yfSl9ZnVuY3Rpb24gVihlKXtlPU9iamVjdC5hc3NpZ24oe30sVCxlKSxlLnJlU2FtcGxlPU1hdGgubWluKDQsZS5yZVNhbXBsZSksZS5yZVNhbXBsZT1NYXRoLm1heCgwLGUucmVTYW1wbGUpO2NvbnN0IHQ9TWF0aC5wb3coMixlLnJlU2FtcGxlKTtyZXR1cm4gbmV3IFByb21pc2UoYXN5bmMoYSxuKT0+e3RyeXtjb25zdCByPWF3YWl0IHUoZS53aWR0aCp0LGUuaGVpZ2h0KnQsZS5iZ0NvbG9yKTtyLmdldENvbnRleHQoIjJkIikuZHJhd0ltYWdlKGUuY2FudmFzLGUuY3gsZS5jeSxlLmN3LGUuY2gsZS5keCp0LGUuZHkqdCxlLmR3KnQsZS5kaCp0KSxlLnJlU2FtcGxlPjA/TChlLGUucmVTYW1wbGUscikudGhlbihhKTphKHIpfWNhdGNoKHIpe24ocil9fSl9ZnVuY3Rpb24gTChlLHQsYSl7cmV0dXJuIG5ldyBQcm9taXNlKG49Pnthc3luYyBmdW5jdGlvbiByKGMsaSl7Y29uc3Qgcz1NYXRoLnBvdygyLGMpLGw9YXdhaXQgdShlLndpZHRoKnMsZS5oZWlnaHQqcyxlLmJnQ29sb3IpO2wuZ2V0Q29udGV4dCgiMmQiKS5kcmF3SW1hZ2UoaSwwLDAsaS53aWR0aCouNSxpLmhlaWdodCouNSksYz4wP3IoYy0xLGwpLnRoZW4oKTpuKGwpfXIodC0xLGEpLnRoZW4oKX0pfWFzeW5jIGZ1bmN0aW9uIHYoZSx0KXtjb25zdCBhPWlzTmFOKHQ9PW51bGw/dm9pZCAwOnQuc2hhcnBlbik/MDp0LnNoYXJwZW47aWYoYTw9MClyZXR1cm4gZTtjb25zdCBuPWF3YWl0IHUoZS53aWR0aCxlLmhlaWdodCx0LmJnQ29sb3IpO3JldHVybiBPKGUsYSxuKX1hc3luYyBmdW5jdGlvbiBHKGUsdCl7bGV0IGE7c3dpdGNoKHQub3V0cHV0VHlwZSl7Y2FzZSJiYXNlNjQiOmE9YXdhaXQgeihlLHQuZm9ybWF0LHQucXVhbGl0eSkscG9zdE1lc3NhZ2Uoe2tleTpvLkVORCxvdXRwdXQ6YX0pO2JyZWFrO2Nhc2UiYmxvYiI6YT1hd2FpdCBQKGUsdC5mb3JtYXQsdC5xdWFsaXR5KSxwb3N0TWVzc2FnZSh7a2V5Om8uRU5ELG91dHB1dDphfSk7YnJlYWs7Y2FzZSJjYW52YXMiOmRlZmF1bHQ6Y29uc3Qgbj1lLnRyYW5zZmVyVG9JbWFnZUJpdG1hcCgpO3Bvc3RNZXNzYWdlKHtrZXk6by5FTkQsb3V0cHV0Om59LFtuXSk7YnJlYWt9fX0pKCk7Cg==", u = (l) => Uint8Array.from(atob(l), (d) => d.charCodeAt(0)), s = typeof window < "u" && window.Blob && new Blob([u(W)], { type: "text/javascript;charset=utf-8" });
function L(l) {
  let d;
  try {
    if (d = s && (window.URL || window.webkitURL).createObjectURL(s), !d)
      throw "";
    const e = new Worker(d, {
      name: l == null ? void 0 : l.name
    });
    return e.addEventListener("error", () => {
      (window.URL || window.webkitURL).revokeObjectURL(d);
    }), e;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + W,
      {
        name: l == null ? void 0 : l.name
      }
    );
  } finally {
    d && (window.URL || window.webkitURL).revokeObjectURL(d);
  }
}
const Z = {
  START: "START",
  END: "END",
  NEW_CANVAS: "NEW_CANVAS",
  ERROR: "ERROR"
}, G = {
  width: 320,
  height: 240,
  format: "jpg",
  // png,jpg,webp
  outputType: "base64",
  // base64,canvas,blob
  quality: 0.75,
  reSample: 2,
  sharpen: 0,
  bgColor: "transparent"
};
function X(l = {}) {
  let d = {};
  return Object.keys(G).forEach((e) => {
    d[e] = l[e] !== void 0 ? l[e] : G[e];
  }), l.width === void 0 && l.height === void 0 ? (d.width = G.width, d.height = void 0) : l.width === void 0 ? (d.width = void 0, d.height = Number(d.height) || 0) : l.height === void 0 ? (d.width = Number(d.width) || 0, d.height = void 0) : (d.width = Number(d.width) || 0, d.height = Number(d.height) || 0), d.quality = Number(d.quality) || 0, d.reSample = Number(d.reSample) || 0, d;
}
function S(l = void 0) {
  if (typeof l != "string") {
    {
      if (l instanceof File || l instanceof Blob)
        return;
      if (l instanceof HTMLCanvasElement)
        return;
    }
    throw new Error("Invalid image data.");
  }
}
function K(l) {
  return new Promise((d, e) => {
    l instanceof HTMLCanvasElement ? l.toBlob((b) => d(b)) : e(new Error("The provided element is not a Canvas."));
  });
}
function V(l, d = void 0) {
  return new Promise(async (e, b) => {
    const Y = X(d), n = new L();
    n.onmessage = async (i) => {
      const { id: o, key: m, output: t, error: p } = i.data;
      switch (m) {
        case Z.END:
          if (n && n.terminate(), t instanceof ImageBitmap) {
            const h = document.createElement("canvas"), c = h.getContext("2d");
            h.width = t.width, h.height = t.height, c.fillStyle = Y.bgColor, c.fillRect(0, 0, t.width, t.height), c.drawImage(t, 0, 0), e(h);
          } else
            e(t);
          n && n.terminate();
          break;
        case Z.ERROR:
          b(p), n && n.terminate();
          break;
        case Z.NEW_CANVAS:
          const a = new OffscreenCanvas(i.data.width, i.data.height);
          n.postMessage({
            id: o,
            key: Z.NEW_CANVAS,
            canvas: a
          }, [a]);
          break;
      }
    }, S(l), l instanceof HTMLCanvasElement && (l = await K(l)), n.postMessage({
      key: Z.START,
      src: l,
      options: Y
    });
  });
}
export {
  V as default
};
