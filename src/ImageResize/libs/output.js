/**
 * type - base64
 *
 * @param {HTMLCanvasElement} canvas
 * @param {String} format
 * @param {Number} quality
 * @return {Promise}
 */
export function base64(canvas, format='image/jpeg', quality=.75)
{
  // set format
  format = getFormat(format);
  return new Promise(function(resolve, reject) {
    try {
      const uri = canvas.toDataURL(format, quality);
      resolve(uri);
    }
    catch (e)
    {
      reject(e);
    }
  });
}

/**
 * type - blob
 *
 * @param {HTMLCanvasElement} canvas
 * @param {String} format
 * @param {Number} quality
 * @return {Promise}
 */
export function blob(canvas, format='image/jpeg', quality=.75)
{
  // set format
  format = getFormat(format);
  return new Promise(function(resolve, reject) {
    try {
      const uri = canvas.toDataURL(format, quality);
      const blob = dataURItoBlob(uri);
      resolve(blob);
    }
    catch (e)
    {
      reject(e);
    }
  });
}

/**
 * Get format
 *
 * @param {String} str
 * @return {String}
 */
function getFormat(str)
{
  let format;
  switch(str)
  {
    case 'jpg':
    case 'jpeg':
      format = 'image/jpeg';
      break;
    case 'png':
      format = 'image/png';
      break;
    case 'webp':
      format = 'image/webp';
      break;
    default:
      format = str;
      break;
  }
  return format
}

/**
 * Data uri to Blob
 * source : https://gist.github.com/davoclavo/4424731
 *
 * @param {string} dataURI
 * @return {Blob}
 */
function dataURItoBlob(dataURI)
{
  // convert base64 to raw binary data held in a string
  const byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  const arrayBuffer = new ArrayBuffer(byteString.length);
  let _ia = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++)
  {
    _ia[i] = byteString.charCodeAt(i);
  }

  const dataView = new DataView(arrayBuffer);
  const blob = new Blob([dataView], { type: mimeString });

  return blob;
}
