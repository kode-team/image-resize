/**
 * fetch image data
 * url 주소로 이미지를 가져온다.
 * @param {string} url
 * @return {Promise<Blob>}
 */
export async function fetchImageData(url)
{
  let image = await fetch(url)
  return await image.blob()
}

/**
 * file reader
 * @param {Blob|File} file
 * @return {Promise<string>}
 */
export function fileReader(file)
{
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => resolve(e.target?.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * base64 to Blob
 * @param {string} base64
 * @return {Blob}
 */
export function base64ToBlob(base64)
{
  const binaryString = atob(base64.split(',')[1])
  const mimeType = base64.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0]
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++)        {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new Blob([ bytes.buffer ], { type: mimeType })
}

/**
 * canvas to blob
 * @param {HTMLCanvasElement} canvas
 * @return {Promise<Blob>}
 */
export function canvasToBlob(canvas)
{
  return new Promise((resolve, reject) => {
    if (canvas instanceof HTMLCanvasElement)
    {
      canvas.toBlob(blob => resolve(blob))
    }
    else
    {
      reject(new Error('The provided element is not a Canvas.'))
    }

  })
}

