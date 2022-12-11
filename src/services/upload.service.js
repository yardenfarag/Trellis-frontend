export const uploadService = {
  uploadImg,
  // getBgImages,
  // getImages
}
function uploadImg(ev) {
  const CLOUD_NAME = "trellis22"
  const UPLOAD_PRESET = "Trellis"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const formData = new FormData()
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('file', ev.target.files[0])

  return fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(res => {
      return res
    })
    .catch(err => console.error(err))
}

// async function getBgImages(search) {
//   try {
//     const apiKey = 'wUWEzu8rt2t-exlLjtpXhpe8P8_fxGWyzRmd-dtB0x8'
//     const res = await fetch(`https://api.pexels.com/search?query=${search}&client_id=${apiKey}`, { method: 'GET' })
//     return res.json()
//   } catch (err) {
//     console.log('Cannot get images')
//     throw err
//   }
// }
// import { createClient } from 'pexels';
// const client = createClient('563492ad6f9170000100000184261325f845484f9e96f25b9ed85744')

// async function getImages(searchTerm) {
//   try {
//     const query = searchTerm
//     const res = await client.photos.search({ query, per_page: 10 })
//     return res
//   }
//   catch (err) {
//     throw err
//   }
// }
