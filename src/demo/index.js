import imageResize from '../image-resize/index.js'
import { fileUploader, getByte } from './libs.js'
import './fonts.css'
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

async function onClickFileUpload()
{
  const file = await fileUploader({ accept: 'image/*' })
  if (!file) return
  values.upload = file
  $el.fileUploadInfo.innerText = `${file.name} (${getByte(file.size)})`
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
    src = values.upload
    // src = new Blob([src], { type: src.type }) // set Blob
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

  try
  {
    // set values
    const pureValues = { ...values }
    delete pureValues.url
    delete pureValues.upload
    // method: function
    const res = await imageResize(src, pureValues)
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

function completeResizeImage(outputType, res)
{
  $result.innerHTML = ''
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
  console.error('[ERROR / IMAGE RESIZE]', e.message)
  alert(`Error resize: ${e.message}`)
}

// action
$form.addEventListener('submit', onSubmitForm)
$el.fileUpload.addEventListener('click', onClickFileUpload)
