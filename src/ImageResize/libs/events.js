/**
 * load image
 *
 * @param {String} src
 * @return {Promise}
 */
export function loadImage(src)
{
	return new Promise((resolve, reject) => {
		if (src)
		{
			let image = new Image();

			image.onload = function(e)
			{
				resolve(image);
			};
			image.onerror = function(e)
			{
				reject(e);
			};

			image.setAttribute('crossOrigin', 'anonymous');
			image.src = src;
		}
		else
		{
			reject(new Error('no src'));
		}
	});
}