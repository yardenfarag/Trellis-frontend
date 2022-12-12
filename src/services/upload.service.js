export const uploadService = {
  uploadImg,
  // getBgImages,
  getImgs
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

async function getImgs(searchTerm) {
  try {
    const key = "563492ad6f9170000100000184261325f845484f9e96f25b9ed85744" 
    const url = `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=10&page=1`
    // const res = await client.photos.search({ query, per_page: 10 })
    const res = await fetch(url, {
      // method: 'GET', 
      headers: new Headers({
        accept: 'application/json',
        Authorization: key, 
    }), 
    })
    return res.json()
  }
  catch (err) {
    throw err
  }
}


// const ACCESS_KEY ='wUWEzu8rt2t-exlLjtpXhpe8P8_fxGWyzRmd-dtB0x8'
// async function getImgs(searchTerm, perPage) {
//   const url = `https://api.unsplash.com/search/photos?page=1&query=${searchTerm}&per_page=${perPage}?client_id=${ACCESS_KEY}`
//   // const api=createApi({accessKey:ACCESS_KEY})
//   fetch(url)
//   .then((res) => {
//     console.log(res)
//   })
//   .catch(err => console.log('error', err))
//   //  const res=await api.search.getPhotos({query:value, page: 1, perPage: 10})
//   //  console.log(`res.response.results = `, res.response.results)
//   // return res.response.results
 
// }

