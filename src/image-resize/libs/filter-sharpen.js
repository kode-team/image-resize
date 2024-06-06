/**
 * filter sharpen
 * @param {OffscreenCanvas} canvas
 * @param {Number} amount
 * @param {OffscreenCanvas} newCanvas
 * @return {any}
 */
export default function filterSharpen(canvas, amount = 0, newCanvas)
{
  if (amount <= 0) return canvas
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

/**
 * convolution
 * https://img.ly/blog/how-to-apply-filters-in-javascript/
 * @param {ImageData} sourceImageData
 * @param {ImageData} outputImageData
 * @param {Array} kernel
 */
function convolution(sourceImageData, outputImageData, kernel)
{
  const src = sourceImageData.data
  const dst = outputImageData.data
  const srcWidth = sourceImageData.width
  const srcHeight = sourceImageData.height
  const side = Math.round(Math.sqrt(kernel.length))
  const halfSide = Math.floor(side / 2)
  // padding the output by the convolution kernel
  const w = srcWidth
  const h = srcHeight
  // iterating through the output image pixels
  for (let y = 0; y < h; y++)
  {
    for (let x = 0; x < w; x++)
    {
      let r = 0, g = 0, b = 0, a = 0
      // calculating the weighed sum of the source image pixels that
      // fall under the convolution kernel
      for (let cy = 0; cy < side; cy++)
      {
        for (let cx = 0; cx < side; cx++)
        {
          const scy = y + cy - halfSide
          const scx = x + cx - halfSide
          if (scy >= 0 && scy < srcHeight && scx >= 0 && scx < srcWidth)
          {
            let srcOffset = (scy * srcWidth + scx) * 4
            let wt = kernel[cy * side + cx]
            r += src[srcOffset] * wt
            g += src[srcOffset + 1] * wt
            b += src[srcOffset + 2] * wt
            a += src[srcOffset + 3] * wt
          }
        }
      }
      const dstOffset = (y * w + x) * 4
      dst[dstOffset] = r
      dst[dstOffset + 1] = g
      dst[dstOffset + 2] = b
      dst[dstOffset + 3] = a
    }
  }
  return outputImageData
}
