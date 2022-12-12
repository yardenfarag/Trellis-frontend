export const uploadService = {
  uploadImg,
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


