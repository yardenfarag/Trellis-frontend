<template>
    <section class="attachment-preview flex align-center">
        <div class="preview">
            <img :style="{ width: 200 + 'px' }" :src="attachment.imgUrl" alt="">
        </div>
        <div class="attachment-info flex column align-center">
            <div class="file-name">
                {{ attachment.fileName }}
            </div>
            <div class="crud">
                <span>{{ formattedTime }}</span> -
                <button @click="$emit('deleteAttachment', attachment.id)">Delete</button> -
                <button @click="isEdit = true">Edit</button>

                <section v-if="isEdit" class="modal-container">
                    <button @click="isEdit = false">X</button>
                    <div class="modal-title">
                        <h5>Edit attachment</h5>
                    </div>
                    <hr>
                    <div class="edit-attachment">
                        <h6>Link name</h6>
                        <input v-model="fileName" type="text">
                    </div>
                    <button @click="saveAttachment" class="call-to-action">Update</button>
                </section>
            </div>
        </div>
    </section>
</template>
<script>
import { utilService } from '../../../../services/util.service';
export default {
    name: 'task-attachment-preview',
    props: {
        attachment: Object,
    },
    components: {},
    data() {
        return {
            isEdit: false,
            fileName: this.attachment.fileName
        };
    },
    created() { },
    methods: {
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