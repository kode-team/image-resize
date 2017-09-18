/**
 * load image
 *
 * @param {String} src
 * @return {Promise}
 */
export function loadImage(src)
{
	return new Promise((resolve) => {
		if (src)
		{
			let image = new Image();

			image.onload = function(e)
			{
				resolve(image);
			};
			image.onError = function(e)
			{
				resolve(null);
			};

			console.warn(src);
			image.setAttribute('crossOrigin', 'anonymous');
			image.src = src;
		}
		else
		{
			resolve(null);
		}
	});
}