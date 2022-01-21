import ImageResize from '../ImageResize';
import './index.css';

const imageResize = new ImageResize();
const $form = document.getElementById('form');
const $result = document.getElementById('result');
const values = new Proxy({}, {
  get: (obj, name) => (obj[name]),
  set: (obj, prop, value) => {
    switch (prop)
    {
      case 'width':
      case 'height':
      case 'quality':
      case 'reSample':
        value = Number(value);
        break;
    }
    obj[prop] = value;
    return true;
  },
});

/**
 * functions
 */

function onSubmitForm(e)
{
  e.preventDefault();

  // set values
  const $self = e.target;
  const $fields = $self.querySelectorAll('[name]');
  for (const $item of $fields)
  {
    values[$item.name] = $item.value;
  }
  // set source
  let src;
  if (values.upload)
  {
    src = $self.querySelector('[name=upload]');
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

  // empty result
  $result.innerHTML = '';

  // processing
  // imageResize.updateOptions(values).play(src)
  //   .then(completeResizeImage)
  //   .catch(errorResizeImage);

  // advanced processing
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
}

// ready
function ready(canvas)
{
  return new Promise(function(resolve) {
    console.warn('Ready:', imageResize.options);
    resolve(canvas);
  });
}

function completeResizeImage(res)
{
  switch(imageResize.options.outputType)
  {
    case 'base64':
      const image = new Image();
      image.src = res;
      $result.appendChild(image);
      break;
    case 'canvas':
      $result.appendChild(res);
      break;
    case 'blob':
    default:
      console.log('RESULT:', res);
      break;
  }
}

function errorResizeImage(e)
{
  console.error('ERROR EVENT', e);
  alert(`Error resize: ${e.message}`);
}

// action
$form.addEventListener('submit', onSubmitForm);
