import { defaultOptions } from './consts.js'

/**
 * Check options
 * @param {object} target
 */
export function checkOptions(target={})
{
  let result = {}
  Object.keys(defaultOptions).forEach((key) => {
    result[key] = target[key] !== undefined ? target[key] : defaultOptions[key]
  })
  if (target.width === undefined && target.height === undefined)
  {
    result.width = defaultOptions.width
    result.height = undefined
  }
  else if (target.width === undefined)
  {
    result.width = undefined
    result.height = Number(result.height) || 0
  }
  else if (target.height === undefined)
  {
    result.width = Number(result.width) || 0
    result.height = undefined
  }
  else
  {
    result.width = Number(result.width) || 0
    result.height = Number(result.height) || 0
  }
  result.quality = Number(result.quality) || 0
  result.reSample = Number(result.reSample) || 0
  return result
}

/**
 * check source
 * @param {string|File|Blob|HTMLCanvasElement} src
 * @throws
 */
export function checkSource(src = undefined)
{
  if (typeof src === 'string') return
  else if (src instanceof File || src instanceof Blob) return
  else if (src instanceof HTMLCanvasElement) return
  throw new Error('Invalid image data.')
}
