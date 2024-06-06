/**
 * type - base64
 * @param {OffscreenCanvas} canvas
 * @param {string} format
 * @param {number} quality
 * @return {Promise<string>}
 */
export function base64(canvas, format='image/jpeg', quality=.75)
{
  // set format
  format = getFormat(format)
  return new Promise(async (resolve, reject) => {
    try
    {
      const uri = await canvasToDataURL(canvas, format, quality)
      resolve(uri)
    }
    catch (e)
    {
      reject(e)
    }
  })
}

/**
 * type - blob
 * @param {OffscreenCanvas} canvas
 * @param {string} format
 * @param {number} quality
 * @return {Promise<Blob>}
 */
export function blob(canvas, format='image/jpeg', quality=.75)
{
  // set format
  format = getFormat(format)
  return new Promise(async (resolve, reject) => {
    try
    {
      const blob = await canvas.convertToBlob({
        type: format,
        quality,
      })
      resolve(blob)
    }
    catch (e)
    {
      reject(e)
    }
  })
}

/**
 * Get format
 * @param {string} str
 * @return {string}
 */
function getFormat(str)
{
  let format
  switch(str)
  {
    case 'jpg':
    case 'jpeg':
      format = 'image/jpeg'
      break
    case 'png':
      format = 'image/png'
      break
    case 'webp':
      format = 'image/webp'
      break
    default:
      format = str
      break
  }
  return format
}

/**
 * OffScreenCanvas 객체를 toDataURL 기능을 사용한다.
 * @param {OffscreenCanvas} canvas
 * @param {string} format
 * @param {number} quality
 * @return {any}
 */
async function canvasToDataURL(canvas, format, quality)
{
  const blob = await canvas.convertToBlob({
    type: format,
    quality,
  })
  const reader = new FileReader()
  return new Promise(resolve => {
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(blob)
  })
}
