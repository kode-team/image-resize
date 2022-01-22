/**
 * file reader
 *
 * @param {File} file
 * @return {Promise}
 */
export function fileReader(file)
{
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target?.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * image loader
 *
 * @param {string} src
 * @return {Promise<HTMLImageElement>}
 */
export function imageLoader(src)
{
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
    image.crossOrigin = 'anonymous';
    image.alt = '';
  });
}
