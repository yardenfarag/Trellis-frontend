<template>
    <div class="modal-container">
        <button @click="$emit('closeAttachmentModal')">X</button>
        <div>
            <h5>Attach from...</h5>
        </div>
        <hr>
        <div>
            <!-- <label for="file-upload">
                Computer
                <input type="file" id="file-upload" :style="{ display: 'none' }" />
            </label> -->
            <img-uploader @uploaded="onUploaded"></img-uploader>

        </div>
        <hr>
        <div class="link">
            <h6>Attach a link</h6>
            <input v-model="url" type="url" placeholder="Paste any link here...">
            <h6 v-if="url">Link name (optional)</h6>
            <input v-if="url" v-model="fileName" type="text">
            <button @click="saveAttachment">Attach</button>
        </div>
        <hr>
        <div class="tip">
            <h6>Tip: You can drag and drop files and links onto cards to upload them.</h6>
        </div>
    </div>

</template>
<script>
import { utilService } from '../../../../../services/util.service';
import imgUploader from '../../../../img-uploader.vue'
export default {
    name: 'task-attachment-modal',
    // emits: ['closeAttachmentModal', 'saveTask'],
    props: {
        task: Object,
    },
    components: {
        imgUploader,
    },
    data() {
        return {
            url: '',
            fileName: '',
        };
    },
    created() { },
    methods: {
        saveAttachment() {
            const imgUrl = JSON.parse(JSON.stringify(this.url))
            let fileName = JSON.parse(JSON.stringify(this.fileName))
            if (!fileName) fileName = imgUrl.slice(0, 50)
            const image = { fileName, imgUrl, id: utilService.makeId(), createdAt: Date.now() }
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            taskToSave.attachments.push(image)
            this.$emit('saveTask', taskToSave)
            this.$emit('closeAttachmentModal')
        },
        onUploaded(imgUrl, fileName) {
            const image = { fileName, createdAt: Date.now(), imgUrl, id: utilService.makeId() }
            const taskToSave = JSON.parse(JSON.stringify(this.task))
            taskToSave.attachments.push(image)
            this.$emit('saveTask', taskToSave)
            this.$emit('closeAttachmentModal')
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>