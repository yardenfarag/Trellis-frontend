<template>
    <div class="modal-wrapper">
        <div class="modal-container cover-modal">
            <section class="modal-header">
                <h5 class="title-modal-header">Cover</h5>
                <span @click="closeModal()" class="close material-symbols-outlined">
                    close
                </span>
            </section>
            <div>
                <div class="modal-body-wrapper">
                    <section class="modal-body">
                        <div class="size-container">
                            <h4 class="small-title">Size</h4>
                            <div class="size-btns-grid-container">
                                <button @click="setAsTop(true)">as Top</button>
                                <button @click="setAsTop(false)">as Background</button>
                            </div>
                        </div>

                        <button class="primary-btn-modal btn-remove-cover" v-if="task.style?.bg"
                            @click="setAsCover('')">Remove
                            cover</button>

                        <div class="text-color-container">
                            <h4 class="small-title">Text color</h4>
                            <div v-if="task" class="text-color-btns-grid-container">

                                <div class="image dark" :style="{ backgroundImage: task.style.bg, }"
                                    @click="setTextColor('white')">
                                </div>
                                <span class="white">{{ task.title }}</span>


                                <div class="image bright" :style="{
                                    backgroundImage: task.style.bg,
                                }" @click="setTextColor('black')">
                                </div>
                                <span class="black">{{ task.title
                                }}</span>

                            </div>
                        </div>

                        <h4 class="small-title-margin-top">Colors</h4>
                        <div class="colors-grid-container">
                            <div v-for="color in colors" class="color-placeholder">
                                <button @click="setAsCover(color)" class="color"
                                    :style="{ background: color }"></button>
                            </div>
                        </div>
                        <h4 class="small-title-margin-top">Attachment</h4>
                        <div class="upload-container">
                            <button class="primary-btn-modal btn-uploader">
                                <img-uploader :str="uploadTxt" @uploaded="onUploaded"></img-uploader>
                            </button>
                        </div>

                        <h4 class="small-title-margin-top">Photos from Pixles</h4>
                        <div class="imgs-grid-container">
                            <div v-if="images" v-for="image in images.splice(0, 6)"
                                @click="setPexlesAsCover(image.src.large)" class="img-placeholder">
                                <img :src="image.src.tiny">
                            </div>
                        </div>
                        <button class="primary-btn-modal btn-open-search">Search for photos</button>
                        <div class="terms-container">
                            <div class="terms">By using images from Pexels, you agree to their <span>license</span> and
                                <span>terms of service</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import imgUploader from '../../../../img-uploader.vue'
import { utilService } from '../../../../../services/util.service'
import { uploadService } from '../../../../../services/upload.service'

export default {
    emits: ['toggleCoverModal', 'saveTask'],
    props: {
        task: Object
    },
    name: 'task-cover-modal',
    components: {
        imgUploader
    },
    data() {
        return {
            colors: ['#f4f5f7', '#f5dd29', '#ffaf3f', '#ef7564', '#cd8de5',
                '#5ba4cf', '#29cce5', '#6deca9', '#ff8ed4', '#172b4d'],
            uploadTxt: 'Upload a cover image',
            images: null,
            searchTerm: '',
            asTop: true,
            textColor: false,
        }
    },
    created() {
        this.searchImages('nature')
    },
    methods: {
        closeModal() {
            this.$emit('toggleCoverModal')
        },
        setAsCover(color) {
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            if (!taskToSave.style) taskToSave.style = {}
            if (!taskToSave.style.bg) taskToSave.style.bg = ''
            if (taskToSave.style.bg === color) taskToSave.style.bg = ''
            else taskToSave.style.bg = color
            taskToSave.style.asTop = this.asTop
            taskToSave.style.textColor = 'black'
            this.$emit('saveTask', taskToSave)
        },
        onUploaded(imgUrl, fileName) {
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            if (!taskToSave.style) taskToSave.style = {}
            if (!taskToSave.style.bg) taskToSave.style.bg = ''
            taskToSave.style.bg = `url(${imgUrl})`
            taskToSave.style.asTop = this.asTop
            taskToSave.style.textColor = 'black'

            const image = { fileName, createdAt: Date.now(), imgUrl, id: utilService.makeId() }
            if (!taskToSave.attachments) taskToSave.attachments = []
            taskToSave.attachments.push(image)
            this.$emit('saveTask', taskToSave)
        },
        setPexlesAsCover(imgUrl) {
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            if (!taskToSave.style) taskToSave.style = {}
            if (!taskToSave.style.bg) taskToSave.style.bg = ''
            taskToSave.style.bg = `url(${imgUrl})`
            taskToSave.style.asTop = this.asTop
            taskToSave.style.textColor = 'black'
            this.$emit('saveTask', taskToSave)

        },
        setAsTop(bool) {
            if (!bool) this.textColor = true
            else this.textColor = false
            this.asTop = bool
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            taskToSave.style.asTop = bool
            this.$emit('saveTask', taskToSave)
        },
        setTextColor(color) {
            if (color === this.task.style.textColor) return
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            taskToSave.style.textColor = color
            this.$emit('saveTask', taskToSave)
        },
        async searchImages(searchTerm) {
            try {
                const images = await uploadService.getImages(searchTerm)
                this.images = images.photos
            }
            catch (err) {
                console.log('Cannot get images')
                throw err
            }
        },
    },
    computed: {
    },
    mounted() {
        console.log(this.task)
    },
    unmounted() {


    },
};
</script>
<style>

</style>