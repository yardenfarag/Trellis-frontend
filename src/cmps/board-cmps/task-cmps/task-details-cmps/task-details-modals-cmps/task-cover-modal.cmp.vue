<template>
    <div :style="{ top: pos.top + 'px', left: pos.left + 'px' }" class="modal-container cover-modal">
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

                    <button class="primary-btn-modal btn-remove-cover" v-if="(isImgUrl || isBgc)"
                        @click="removeCover('')">Remove
                        cover</button>

                    <div v-if="isImgUrl" class="text-color-container">
                        <h4 class="small-title">Text color</h4>
                        <div v-if="task" class="text-color-btns-grid-container">

                            <div class="image dark" :style="img" @click="setTextColor('white')">
                            </div>
                            <span class="white">{{ task.title }}</span>


                            <div class="image bright" :style="img" @click="setTextColor('black')">
                            </div>
                            <span class="black">{{ task.title
                            }}</span>

                        </div>
                    </div>

                    <h4 class="small-title-margin-top">Colors</h4>
                    <div class="colors-grid-container">
                        <div v-for="color in colors" class="color-placeholder">
                            <button @click="setColorAsCover(color)" class="color"
                                :style="{ background: color }"></button>
                        </div>
                    </div>
                    <h4 class="small-title-margin-top">Attachment</h4>
                    <div v-if="task.attachments" class="imgs-grid-container">
                        <div v-for="attachment in task.attachments" @click="setPexlesAsCover(image.src.large)"
                            class="img-placeholder">
                            <img :src="attachment.imgUrl">
                        </div>
                    </div>
                    <div class="upload-container">
                        <button class="primary-btn-modal btn-uploader">
                            <img-uploader :str="uploadTxt" @uploaded="onUploaded"></img-uploader>
                        </button>
                    </div>

                    <h4 class="small-title-margin-top">Photos from Pixles</h4>
                    <div class="imgs-grid-container">
                        <div v-if="images" v-for="image in imagesToShow" @click="setPexlesAsCover(image.src.large)"
                            class="img-placeholder">
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
</template>
<script>

import imgUploader from '../../../../img-uploader.vue'
import { utilService } from '../../../../../services/util.service'
import { uploadService } from '../../../../../services/upload.service'

export default {
    emits: ['closeModal', 'saveTask'],
    props: {
        task: Object,
        pos: Object
    },
    name: 'task-cover-modal',
    components: {
        imgUploader
    },
    data() {
        return {
            colors: ['#7bc86c', '#f5dd29', '#ffaf3f', '#ef7564', '#cd8de5',
                '#5ba4cf', '#29cce5', '#6deca9', '#ff8ed4', '#172b4d'],
            uploadTxt: 'Upload a cover image',
            images: null,
            searchTerm: '',
            asTop: true,
            isTextColor: false,
        }
    },
    created() {
        this.searchImages('nature')
    },
    methods: {
        closeModal() {
            this.$emit('closeModal')
        },
        removeCover() {
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            taskToSave.style = {}
            // this.asTop = false
            this.$emit('saveTask', taskToSave)
        },
        setColorAsCover(color) {
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            taskToSave.style.imgUrl = null
            taskToSave.style.bgc = color
            taskToSave.style.textColor = 'black'
            taskToSave.style.asTop = true
            this.$emit('saveTask', taskToSave)
        },
        setPexlesAsCover(imgUrl) {
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            taskToSave.style.bgc = null
            taskToSave.style.imgUrl = `url(${imgUrl})`
            this.$emit('saveTask', taskToSave)
        },
        onUploaded(imgUrl, fileName) {
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            const image = { fileName, createdAt: Date.now(), imgUrl, id: utilService.makeId() }
            if (!taskToSave.attachments) taskToSave.attachments = []
            taskToSave.attachments.push(image)
            this.$emit('saveTask', taskToSave)
            setPexlesAsCover(imgUrl)
        },
        setAsTop(bool) {
            if (!bool) this.isTextColor = true
            else this.isTextColor = false
            this.asTop = bool
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            taskToSave.style.asTop = bool
            this.$emit('saveTask', taskToSave)
        },
        setTextColor(color) {
            if (color === this.task.style.textColor) return
            console.log(color, this.task)
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
        isImgUrl() {
            return this.task.style.imgUrl
        },
        isBgc() {
            return this.task.style.bgc
        },
        img() {
            return { background: this.task.style.imgUrl }
        },
        imagesToShow() {
            return this.images.splice(0, 6)
        }
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