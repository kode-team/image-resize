/**
 * Get image size
 * @param {number} width original width
 * @param {number} height original height
 * @param {number} targetWidth target width
 * @param {number} targetHeight target height
 * @return {object}
 */
export function getImageSize(width, height, targetWidth, targetHeight)
{
  let w = width
  let h = height
  if (targetWidth && targetHeight)
  {
    if (targetWidth > targetHeight) targetHeight = undefined
    else targetWidth = undefined
  }
  if (targetWidth)
  {
    w = targetWidth
    h = height * (targetWidth / width)
  }
  else if (targetHeight)
  {
    w = width * (targetHeight / height)
    h = targetHeight
  }
  return {
    width: Number(w),
    height: Number(h),
  }
}
