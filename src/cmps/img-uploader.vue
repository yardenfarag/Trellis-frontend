<template>
  <div className="upload-preview">
    <!-- <img v-if="imgUrl" :src="imgUrl" :style="{ maxWidth: '200px', float: 'right' }" /> -->
    <label for="imgUpload">Computer</label>
    <input :style="{ display: 'none' }" type="file" @change="uploadImg" accept="img/*" id="imgUpload" />
  </div>
</template>

<script>
import { uploadService } from '../services/upload.service.js'

export default {
  data() {
    return {
      imgUrl: null,
      height: 500,
      width: 500,
      isUploading: false
    }
  },
  methods: {
    async uploadImg(ev) {
      this.isUploading = true
      const { original_filename, format, resource_type, secure_url, height, width } = await uploadService.uploadImg(ev)
      const fileName = original_filename + '.' + format
      this.isUploading = false
      this.imgUrl = secure_url
      this.height = height
      this.width = width
      this.$emit('uploaded', this.imgUrl, fileName)
    }
  },
  computed: {
    uploadMsg() {
      if (this.imgUrl) return 'Upload Another?'
      return this.isUploading ? 'Uploading....' : 'Upload Image'
    }
  }
}
</script>
