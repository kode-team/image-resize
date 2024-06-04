import { ImageResize } from '../ImageResize'
import { sleep } from './libs'
import './index.css'

const imageResize = new ImageResize()
const $form = document.getElementById('form')
const $result = document.getElementById('result')
const values = new Proxy({}, {
  get: (obj, name) => (obj[name]),
  set: (obj, prop, value) => {
    switch (prop)
    {
      case 'width':
      case 'height':
      case 'quality':
      case 'reSample':
      case 'sharpen':
        value = Number(value)
        break
    }
    obj[prop] = value
    return true
  },
})

async function onSubmitForm(e)
{
  e.preventDefault()

  // set values
  const $self = e.target
  const $fields = $self.querySelectorAll('[name]')
  for (const $item of $fields)
  {
    values[$item.name] = $item.value
  }
  // set source
  let src
  if (values.upload)
  {
    src = $self.querySelector('[name=upload]') // set element
    src = src.files[0] // set File
    src = new Blob([src], { type: src.type }) // set Blob
  }
  else if (values.url)
  {
    src = values.url
  }
  else
  {
    alert('not found source')
    return false
  }

  // empty result
  $result.innerHTML = ''

  try
  {
    // basic resize
    let res = await imageResize.updateOptions(values).play(src)
    completeResizeImage(res)
    // advanced resize
    // let res = await imageResize.updateOptions(values).get(src)
    // res = await imageResize.resize(res)
    // res = imageResize.sharpen(res)
    // res = await ready(res)
    // res = await imageResize.output(res)
    // completeResizeImage(res)
  }
  catch(e)
  {
    errorResizeImage(e)
  }
}

// ready
async function ready(canvas)
{
  await sleep(1000)
  console.warn('ready:', imageResize.options)
  return canvas
}

function completeResizeImage(res)
{
  switch(imageResize.options.outputType)
  {
    case 'base64':
      const image = new Image()
      image.src = res
      $result.appendChild(image)
      break
    case 'canvas':
      $result.appendChild(res)
      break
    case 'blob':
    default:
      console.log('RESULT:', res)
      break
  }
}

function errorResizeImage(e)
{
  console.error('ERROR EVENT', e)
  alert(`Error resize: ${e.message}`)
}

// action
$form.addEventListener('submit', onSubmitForm)
