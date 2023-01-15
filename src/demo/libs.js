/**
 * sleep (delay tool)
 *
 * @param {number} delay
 * @return {Promise}
 */
export const sleep = (delay = 3000) => {
  return new Promise(resolve => setTimeout(resolve, delay))
}
