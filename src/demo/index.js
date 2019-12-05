import $ from 'jquery/dist/jquery.slim.min';
import ResizeImage from '../ResizeImage';

import './index.css';

const resizeImage = new ResizeImage();


// set submit event
$('#form').on('submit', function(e) {

  let values = {};
  const $forms = $(this).find('[name]');
  let src = null;

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
  const $result = $('#result');

  $result.empty();

  switch(resizeImage.options.outputType)
  {
    case 'base64':
      const image = new Image();
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

/**
 * error resize image
 *
 * @param {event} error
 */
function errorResizeImage(error)
{
  console.error('ERROR EVENT', error);
}
