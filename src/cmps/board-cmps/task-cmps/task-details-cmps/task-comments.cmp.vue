<template>
  <section class="activity-container">
    <div class="title">
      <h3><span>💬</span>Activity</h3>
    </div>

    <div class="add-comments">
      <p v-if="!addComment" @click="addComment = true">Write a comment...</p>
      <div class="comment-input">
        <input v-if="addComment" type="text" placeholder="Write a comment...">
        <button>Save</button>
        <button @click="addComment = false">Cancel</button>
      </div>

      <div v-if="task.comments" class="comments">
        <div class="comment-list">
          <div v-for="comment in task.comments" class="comment">
            <div class="member-avatar">
              <img src="comment.byMember.imgUrl" alt="">
            </div>
            <div class="comment-details">
              <h4>{{ comment.byMember.fullname }} <span>{{ comment.createdAt }}</span></h4>
              <p>{{ comment.txt }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['task'],
  name: 'task-comments',
  components: {},
  data() {
    return {
      addComment: false
    };
  },
  created() { },
  methods: {},
  computed: {},
  unmounted() { },
};
</script>
<style>

</style>