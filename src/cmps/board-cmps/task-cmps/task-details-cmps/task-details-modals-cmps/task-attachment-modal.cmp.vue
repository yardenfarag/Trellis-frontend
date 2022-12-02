<template>
    <section class="modal-container task-attachment-modal">
        <section class="modal-header">
            <span @click="$emit('closeAttachmentModal')" class="material-symbols-outlined">
                close
            </span>
            <h5>Attach from...</h5>
        </section>
        <section class="modal-body">

            <div class="uploader">
                <img-uploader :str="computer" @uploaded="onUploaded"></img-uploader>
            </div>

            <div class="link">
                <div class="primary-link">
                    <h6>Attach a link</h6>
                    <input ref="link" @keyup.enter="saveAttachment" class="primary-input-modal" v-model="url" type="url"
                        placeholder="Paste any link here...">
                </div>
                <div class="secondery-link">
                    <h6 v-if="url">Link name (optional)</h6>
                    <input @keyup.enter="saveAttachment" v-if="url" class="primary-input-modal" v-model="fileName"
                        type="text">
                </div>
                <button class="primary-btn-modal small" @click="saveAttachment">Attach</button>
            </div>
        </section>
        <section class="modal-footer">
            <p class="tip">Tip: You can drag and drop files and links onto cards to upload them.</p>
        </section>
    </section>

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
            computer: 'Computer',
            url: '',
            fileName: '',
        };
    },
    created() { },
    methods: {
        focusOnLink() {
            this.$refs.link.focus()
        },
        saveAttachment() {
            console.log('ss');

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
    mounted() {
        this.focusOnLink()
    },
    unmounted() { },
};
</script>