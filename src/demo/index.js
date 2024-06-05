import { ImageResize, resize } from '../ImageResize'
import { sleep } from './libs'
import './index.css'

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
const $el = {
  submit: document.querySelector('.form__submit > button[type=submit]'),
  fileUpload: document.getElementById('file-upload'),
  fileUploadInfo: document.getElementById('file-upload-info'),
}

async function onSubmitForm(e)
{
  e.preventDefault()
  processing(true)

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
  delete values.url
  delete values.upload

  // empty result
  $result.innerHTML = ''

  try
  {
    // set values
    const pureValues = { ...values }

    // method: function
    // let res = await resize(src, pureValues)

    // method: class instance
    // let imageResize = new ImageResize(pureValues)
    // let res = await imageResize.play(src)

    // method: advanced
    let imageResize = new ImageResize(pureValues)
    let canvas = await imageResize.get(src)
    canvas = await imageResize.resize(canvas)
    canvas = imageResize.sharpen(canvas)
    canvas = await ready(canvas)
    let res = await imageResize.output(canvas)

    // to result output image
    completeResizeImage(pureValues.outputType, res)
  }
  catch(e)
  {
    errorResizeImage(e)
  }
  finally
  {
    processing(false)
  }
}

// ready
async function ready(canvas)
{
  await sleep(1000)
  console.warn('ready canvas', canvas)
  return canvas
}

function completeResizeImage(outputType, res)
{
  switch(outputType)
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

function processing(sw)
{
  const $submit = $el.submit
  if (sw)
  {
    // on
    $submit.setAttribute('disabled', '')
    $submit.innerText = '처리중..'
  }
  else
  {
    // off
    $submit.removeAttribute('disabled')
    $submit.innerText = '이미지 변환'
  }
}

// action
$form.addEventListener('submit', onSubmitForm)
