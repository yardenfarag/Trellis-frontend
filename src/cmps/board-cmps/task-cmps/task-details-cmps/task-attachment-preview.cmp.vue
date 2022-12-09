<template>
    <section class="attachment-preview">
        <div class="preview">
            <img :src="attachment.imgUrl" alt="">
        </div>
        <div class="attachment-info">
            <div class="file-name">
                {{ attachment.fileName }}
            </div>
            <div class="crud">
                <span>{{ formattedTime }}</span> -
                <!-- <span @click="$emit('deleteAttachment', attachment.id)">Delete</span> - -->
                <span @click="onRemove($event, attachment.id)">Delete</span> -
                <span @click="isEdit = true">Edit</span>
                <section v-if="isEdit" class="modal-container">
                    <button @click="isEdit = false">X</button>
                    <div class="modal-title">
                        <h5>Edit attachment</h5>
                    </div>
                    <div class="edit-attachment">
                        <h6>Link name</h6>
                        <input v-model="fileName" type="text">
                    </div>
                    <button @click="saveAttachment" class="call-to-action">Update</button>
                </section>
            </div>
        </div>
    </section>
    <deleteModal v-if="isDeleteModal" :pos="modalPos" @remove="removeAttachment" @closeModal="closeDeleteModal"
        :toDelete="'attachment'" />
</template>
<script>
import { utilService } from '../../../../services/util.service';
import deleteModal from '../task-details-cmps/task-details-modals-cmps/delete-modal.cmp.vue'
export default {
    emits: ['deleteAttachment', 'saveAttachment'],
    name: 'task-attachment-preview',
    props: {
        attachment: Object,

    },
    components: {
        deleteModal
    },
    data() {
        return {
            currAttachmentId: null,
            isDeleteModal: false,
            isEdit: false,
            fileName: this.attachment.fileName
        };
    },
    created() { },
    methods: {
        closeDeleteModal() {
            this.isDeleteModal = false
            this.currAttachmentId = null
        },
        onRemove(ev, attachmentId) {
            this.currAttachmentId = attachmentId
            const elPos = ev.target.getBoundingClientRect()
            const top = elPos.top + elPos.height + 8
            const left = elPos.left
            this.modalPos = { top, left }
            this.isDeleteModal = true
        },
        removeAttachment() {
            this.$emit('deleteAttachment', this.currAttachmentId)
        },
        saveAttachment() {
            const attachmentToSave = JSON.parse(JSON.stringify(this.attachment))
            attachmentToSave.fileName = this.fileName
            this.$emit('saveAttachment', attachmentToSave)
            this.isEdit = false
        }
    },
    computed: {
        formattedTime() {
            return utilService.timeAgo(this.attachment.createdAt)
        },
    },
    unmounted() { },
};
</script>
<style>

</style>