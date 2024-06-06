// 웹 워커 통신용 메시지
export const WORKER_MESSAGE = {
  START: 'START',
  END: 'END',
  NEW_CANVAS: 'NEW_CANVAS',
  ERROR: 'ERROR',
}

// 이미지 라시아즈 옵션
export const defaultOptions = {
  width: 320,
  height: 240,
  format: 'jpg', // png,jpg,webp
  outputType: 'base64', // base64,canvas,blob
  quality: .75,
  reSample: 2,
  sharpen: 0,
  bgColor: 'transparent',
}

// default options for resize canvas
export const defaultResizeCanvasOptions = {
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
  bgColor: 'transparent',
}
