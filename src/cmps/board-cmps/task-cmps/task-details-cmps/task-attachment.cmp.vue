<template>
  <div v-if="task.attachments" class="attachment-container">
    <div class="title-container">
      <h3>Attachments</h3>
    </div>
    <div v-if="task.attachments" class="task-attachment">
      <div class="attachment">
        <taskAttachmentPreview @saveAttachment="saveAttachment" @deleteAttachment="deleteAttachment"
          v-for="attachment in task.attachments" :attachment="attachment"></taskAttachmentPreview>
      </div>
    </div>
    <div class="attachment-footer">
      <button class="task-content-btn">Add an attachment</button>
    </div>
  </div>
</template>
 
<script>
import taskAttachmentPreview from './task-attachment-preview.cmp.vue';
export default {
  props: ['task'],
  name: 'task-attachment',
  components: {
    taskAttachmentPreview,
  },
  data() {
    return {};
  },
  created() { },
  methods: {
    saveAttachment(attachmentToSave) {
      const taskToSave = JSON.parse(JSON.stringify(this.task))
      const idx = taskToSave.attachments.findIndex(attachment => attachment.id === attachmentToSave.id)
      taskToSave.attachments.splice(idx, 1, attachmentToSave)
      this.$emit('saveAttachment', taskToSave)
    },
    deleteAttachment(attachmentId) {
      const taskToSave = JSON.parse(JSON.stringify(this.task))
      const idx = taskToSave.attachments.findIndex(attachment => attachment.id === attachmentId)
      taskToSave.attachments.splice(idx, 1)
      this.$emit('deleteAttachment', taskToSave)
    }
  },
  computed: {

  },
  unmounted() { },
};
</script>
<style>

</style>