<template>
    <div class="modal-container cover-modal">
        <button @click="toggleCoverModal">X</button>
        <div class="modal-title">
            <h5>Cover</h5>
        </div>
        <hr>
        <div class="size">
            <h6>Size</h6>
            <span>1</span>---<span>2</span>
            <button v-if="task.style?.bg" @click="setAsCover('')">Remove cover</button>
        </div>
        <div class="colors">
            <h6>Colors</h6>
            <div @click="setAsCover(color)" class="color" v-for="color in colors"
                :style="{ background: color, width: 54 + 'px', height: 36 + 'px' }"></div>
        </div>
        <div v-if="task.attachments" class="attachments">
            <h6>Attachment</h6>
            <div v-for="attachment in task.attachments" class="mini-attachment">
                <img :src="attachment.imgUrl" :style="{ width: 100 + 'px', objectFit: 'contain' }">
            </div>
        </div>
        <div class="uploader">
            <img-uploader :str="uploadTxt" @uploaded="onUploaded"></img-uploader>
        </div>
        <h6>Photos from Pixles</h6>
        <section v-if="images" class="img-container menu-layout">
            <section class="menu-body">
                <div class="img-search">
                    <input type="search" placeholder="🔍Photos" v-model="searchTerm" @input="searchImages(searchTerm)">
                </div>
                <div class="images flex wrap">
                    <div v-for="image in images" @click="setPexlesAsCover(image.src.large)"
                        :style="{ borderRadius: 3 + 'px', width: 140 + 'px', height: 90 + 'px' }" class="image">
                        <img :style="{ width: 100 + '%', height: 100 + '%', objectFit: 'cover' }" :src="image.src.tiny">
                    </div>
                </div>
            </section>
            <small>By using images from Pexels, you agree to their license and terms of service</small>
        </section>

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
            uploadTxt: 'Upload a cover image' ,
            images: null, 
            searchTerm: '', 
        };
    },
    created() {
        this.searchImages('nature')
     },
    methods: {
        toggleCoverModal() {
            this.$emit('toggleCoverModal')
        },
        setAsCover(color) {
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            if (!taskToSave.style) taskToSave.style = {}
            if (!taskToSave.style.bg) taskToSave.style.bg = ''
            if (taskToSave.style.bg === color) taskToSave.style.bg = ''
            else taskToSave.style.bg = color
            console.log(taskToSave.style.bg)
            this.$emit('saveTask', taskToSave)
        },
        onUploaded(imgUrl, fileName) {
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            if (!taskToSave.style) taskToSave.style = {}
            if (!taskToSave.style.bg) taskToSave.style.bg = ''
            taskToSave.style.bg = `url(${imgUrl})`
            
            const image = { fileName, createdAt: Date.now(), imgUrl, id: utilService.makeId() }
            if (!taskToSave.attachments) taskToSave.attachments = []
            taskToSave.attachments.push(image)
            this.$emit('saveTask', taskToSave)
        },
        setPexlesAsCover(imgUrl){
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            if (!taskToSave.style) taskToSave.style = {}
            if (!taskToSave.style.bg) taskToSave.style.bg = ''
            taskToSave.style.bg = `url(${imgUrl})`
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
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>