const sharp = require('sharp')
const {join} = require('path')

const SUPPORTED_MIMES = {
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'png': 'image/png'
}

const toBase64 = (extension, data) => `data:${SUPPORTED_MIMES[extension]};base64,${data.toString('base64')}`

const path = join(__dirname, 'cala.jpg')

sharp(path)
  .resize(16)
  .toBuffer() // converts to buffer for Base64 conversion
  .then(data => {
    const extension = path.split('.').pop().toLowerCase()

    if (typeof SUPPORTED_MIMES[extension] === 'undefined') {
      throw new Error('Unsupported image format')
    }

    const presource = toBase64(extension, data)

    console.log(presource)
  })
  .catch(err => {
    throw new Error(err)
  })
