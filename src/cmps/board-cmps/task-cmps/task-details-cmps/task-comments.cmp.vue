<template>
  <section class="activity-container">
    <div class="title-container flex space-between">
      <h3>Activity</h3>
      <button title="Coming soon" class="task-content-btn ">Show details</button>
    </div>

    <div class="add-comments">
      <img :src="loggedinUser.imgUrl" :style="{ borderRadius: 50 + '%', width: 30 + 'px', height: 30 + 'px' }">
      <div class="open-txt" v-if="!addComment" @click.stop="openAddComment">Write a comment...</div>
      <div v-if="addComment" class="comment-input">
        <textarea class="add-txt-input" ref="comment" v-model="comment.txt" type="text"
          placeholder="Write a comment..."></textarea>
        <button class="call-to-action" @click="saveComment(comment)">Save</button>
        <button class="task-content-btn" @click="addComment = false">Cancel</button>
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

  <!-- <section v-if="showActivities" class="task-activity-log">
    <div v-for="activity in taskActivities" class="activity-info flex align-center">
      <img :src="activity.byMember?.imgUrl" :style="{ width: 40 + 'px', 'border-radius': 50 + '%' }">
      <h3>{{ activity.byMember.fullname }}</h3>
      <h4>{{ activity.txt }}</h4>
      <div class="time">
        <h6>{{ formattedTime }}</h6>
      </div>
    </div>
  </section> -->
</template>

<script>
import { utilService } from '../../../../services/util.service';
import taskCommentPreview from './task-comment-preview.cmp.vue';
// import taskActivities from './task-details-modals-cmps/task-activities.cmp.vue';
export default {
  emits: ['saveTask'],
  props: {
    task: Object,
    // taskActivities: Array,
  },
  name: 'task-comments',
  components: {
    taskCommentPreview,
    // taskActivities
  },
  data() {
    return {
      showActivities: false,
      addComment: false,
      comment: {
        txt: '',
        createdAt: '',
        byMember: {}
      },
    };
  },
  async created() {
    await this.$store.dispatch({ type: 'loadUsers' })
  },
  methods: {
    toggleActivityLog() {
      this.showActivities = !this.showActivities
    },
    openAddComment() {
      this.addComment = true
      this.$nextTick(() => {
        this.$refs.comment.focus()
      })
    },
    deleteComment(commentId) {
      const taskToEdit = JSON.parse(JSON.stringify(this.task))
      const commentIdx = taskToEdit.comments.findIndex(comment => comment.id === commentId)
      taskToEdit.comments.splice(commentIdx, 1)
      this.$emit('saveTask', taskToEdit)
    },
    saveComment(comment) {
      if (!comment.txt) return
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
      let activityTxt
      if (commentToSave.isEdited) {
        activityTxt = `edited ${commentToSave.txt} on ${taskToEdit.title}`
      } else {
        activityTxt = `commented ${commentToSave.txt} on ${taskToEdit.title}`
      }
      this.$emit('saveTask', taskToEdit, activityTxt)
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
    formattedTime(activity) {
      return utilService.timeAgo(activity.createdAt)
    }
  },
  unmounted() { },
};
</script>
<style>

</style>