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
  .toBuffer((error, data, info) => {
    if (error) {
      throw new Error(error)
    }
    const extension = path.split('.').pop().toLowerCase()
    if (typeof SUPPORTED_MIMES[extension] === 'undefined') {
      throw new Error('Unsupported image format')
    }
    return toBase64(extension, data)
  })
