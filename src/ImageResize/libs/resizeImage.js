import Canvas from './Canvas'

// default options
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
  bgColor: '#ffffff',
}

/**
 * Resize canvas
 * @param {Object} options
 * @param {Number} count
 * @param {HTMLCanvasElement} parentCanvas
 * @return {Promise<HTMLCanvasElement>}
 */
function resize(options, count, parentCanvas)
{
  return new Promise(resolve => {
    function func(count, parentCanvas)
    {
      const pow = Math.pow(2, count)
      let canvasForResize = new Canvas(
        options.width * pow,
        options.height * pow,
        options.bgColor
      )
      canvasForResize.ctx.drawImage(
        parentCanvas,
        0,
        0,
        parentCanvas.width * 0.5,
        parentCanvas.height * 0.5,
      )
      if (count > 0)
      {
        func(count - 1, canvasForResize.el)
      }
      else
      {
        resolve(canvasForResize.el)
      }
    }
    func(count - 1, parentCanvas)
  })
}

/**
 * Resize image
 * @param {Object} options
 * @return {Promise<HTMLCanvasElement>}
 */
export default function resizeImage(options)
{
  // assign options
  options = Object.assign({}, defaultOptions, options)
  // set resampling count
  options.reSample = Math.min(4, options.reSample)
  options.reSample = Math.max(0, options.reSample)
  const reSamplingCount = Math.pow(2, options.reSample)
  return new Promise(function(resolve, reject) {
    try
    {
      const canvas = new Canvas(
        options.width * reSamplingCount,
        options.height * reSamplingCount,
        options.bgColor
      )
      canvas.ctx.drawImage(
        options.canvas,
        options.cx,
        options.cy,
        options.cw,
        options.ch,
        options.dx * reSamplingCount,
        options.dy * reSamplingCount,
        options.dw * reSamplingCount,
        options.dh * reSamplingCount
      )
      if (options.reSample > 0)
      {
        resize(options, options.reSample, canvas.el).then(resolve)
      }
      else
      {
        resolve(canvas.el)
      }
    }
    catch(e)
    {
      reject(e)
    }
  })
}
