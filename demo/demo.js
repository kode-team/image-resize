// init ResizeImage
var resizeImage = new ResizeImage({
	callback_ready: function() {
		console.warn('Ready:', resizeImage.options);
	}
});


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

	resizeImage.updateOptions(values);
	resizeImage.play(src)
		.then(completeResizeImage)
		.catch(errorResizeImage);

	return false;
});


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
