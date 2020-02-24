import $ from 'jquery/dist/jquery.slim.min';
import ImageResize from '../ImageResize';

import './index.css';

const imageResize = new ImageResize();


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

  imageResize.updateOptions(values).play(src)
    .then(completeResizeImage)
    .catch(errorResizeImage);

  // Advanced play
  imageResize.updateOptions(values).get(src)
    .then(function(canvas) {
      return imageResize.resize(canvas);
    })
    .then(function(canvas) {
      return ready(canvas);
    })
    .then(function(canvas) {
      return imageResize.output(canvas);
    })
    .then(completeResizeImage)
    .catch(errorResizeImage);

  return false;
});

// ready
function ready(canvas)
{
  return new Promise(function(resolve) {
    console.warn('Ready:', imageResize.options);
    resolve(canvas);
  });
}

// complete resize image
function completeResizeImage(response)
{
  const $result = $('#result');

  $result.empty();

  switch(imageResize.options.outputType)
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
