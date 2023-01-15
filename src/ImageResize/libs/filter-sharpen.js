import convolution from './convolution'

/**
 * filter sharpen
 * @param {HTMLCanvasElement} canvas
 * @param {Number} amount
 * @return {any}
 */
export default function filterSharpen(canvas, amount = 0)
{
  if (amount <= 0) return canvas
  // new canvas
  const newCanvas = document.createElement('canvas')
  newCanvas.width = canvas.width
  newCanvas.height = canvas.height
  const newContext = newCanvas.getContext('2d')
  newContext.drawImage(canvas, 0, 0)
  const sourceImageData = newContext.getImageData(0, 0, newCanvas.width, newCanvas.height)
  const blankOutputImageData = newContext.createImageData(newCanvas.width, newCanvas.height)
  const filteredData = convolution(sourceImageData, blankOutputImageData, [
    0, -1, 0,
    -1, 5, -1,
    0, -1,  0,
  ])
  newContext.putImageData(filteredData, 0, 0)
  // merge sharpen image
  const context = canvas.getContext('2d')
  context.globalAlpha = amount || 1
  context.drawImage(newCanvas, 0, 0)
  // return
  return canvas
}
