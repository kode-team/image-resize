// init ResizeImage
var resizeImage = new ResizeImage();


// set submit event
$('#form').on('submit', function(e) {

	var values = {};
	var $forms = $(this).find('[name]');
	var src = null;

	$forms.each(function(index, item) {
		values[item.getAttribute('name')] = item.value || null;
	});

	if (values.upload)
	{
		src = $(this).find('[name=upload]').get(0);
	}
	else if (values.url)
	{
		src = values.url;
	}
	else
	{
		alert('not found source');
		return false;
	}

	resizeImage.updateOptions(values).play(src)
		.then(completeResizeImage)
		.catch(errorResizeImage);

	/*
	// Advanced play
	resizeImage.updateOptions(values).get(src)
		.then(function(canvas) {
			return resizeImage.resize(canvas);
		})
		.then(function(canvas) {
			return ready(canvas);
		})
		.then(function(canvas) {
			return resizeImage.output(canvas);
		})
		.then(completeResizeImage)
		.catch(errorResizeImage);
	*/

	return false;
});


// ready
function ready(canvas)
{
	return new Promise(function(resolve) {
		console.warn('Ready:', resizeImage.options);
		resolve(canvas);
	});
}

// complete resize image
function completeResizeImage(response)
{
	var $result = $('#result');

	$result.empty();

	switch(resizeImage.options.outputType)
	{
		case 'base64':
			var image = new Image();
			image.src = response;
			$result.append(image);
			break;
		case 'canvas':
			$result.append(response);
			break;
		case 'blob':
		default:
			console.log('RESULT:', response);
			break;
	}
}

// error resize image
function errorResizeImage(error)
{
	console.error('ERROR EVENT', error);
}
