<template>
  <section class="activity-container">
    <div class="title flex">
      <h3><span>💬</span>Activity</h3>
      <button>Show details</button>
    </div>

    <div class="add-comments">
      <img :src="loggedinUser.imgUrl" :style="{ borderRadius: 50 + '%', width: 30 + 'px', height: 30 + 'px' }">
      <button v-if="!addComment" @click.stop="addComment = true">Write a comment...</button>
      <div v-if="addComment" class="comment-input">
        <input v-model="comment.txt" type="text" placeholder="Write a comment...">
        <button @click="saveComment(comment)">Save</button>
        <button @click="addComment = false">Cancel</button>
      </div>

      <div v-if="task.comments" class="comments">
        <div class="comment-list">
          <div v-for="comment in task.comments" class="comment">
            <task-comment-preview @saveComment="saveComment" @deleteComment="deleteComment" :comment="comment">
            </task-comment-preview>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { utilService } from '../../../../services/util.service';
import taskCommentPreview from './task-comment-preview.cmp.vue';
export default {
  emits: ['saveTask'],
  props: ['task'],
  name: 'task-comments',
  components: {
    taskCommentPreview
  },
  data() {
    return {
      addComment: false,
      comment: {
        txt: '',
        createdAt: '',
        byMember: {}
      },
    };
  },
  async created() {
    await this.$store.dispatch({ type: 'getLoggedinUser' })
    await this.$store.dispatch({ type: 'loadUsers' })
  },
  methods: {
    deleteComment(commentId) {
      const taskToEdit = JSON.parse(JSON.stringify(this.task))
      const commentIdx = taskToEdit.comments.findIndex(comment => comment.id === commentId)
      taskToEdit.comments.splice(commentIdx, 1)
      this.$emit('saveTask', taskToEdit)
    },
    saveComment(comment) {
      const taskToEdit = JSON.parse(JSON.stringify(this.task))
      const commentToSave = JSON.parse(JSON.stringify(comment))
      commentToSave.byMember = this.loggedinUser
      commentToSave.createdAt = Date.now()
      if (commentToSave.id) {
        const commentIdx = taskToEdit.comments.findIndex(comment => comment.id === commentToSave.id)
        taskToEdit.comments.splice(commentIdx, 1, commentToSave)
      } else {
        commentToSave.id = utilService.makeId()
        taskToEdit.comments.unshift(commentToSave)
      }
      let newActivity
      if (commentToSave.isEdited) {
        newActivity = utilService.setActivity(`edited ${commentToSave.txt} on ${taskToEdit.title}`, taskToEdit)
      } else {
        newActivity = utilService.setActivity(`commented ${commentToSave.txt} on ${taskToEdit.title}`, taskToEdit)
      }
      this.$emit('saveTask', taskToEdit, newActivity)
      this.comment = {
        txt: '',
        createdAt: '',
        byMember: {}
      }
      this.addComment = false

    },
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  unmounted() { },
};
</script>
<style>

</style>