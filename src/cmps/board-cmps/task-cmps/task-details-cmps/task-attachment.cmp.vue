<template>
  <div v-if="task.attachments" class="attachment-container">
    <div class="title">
      <h3><span class="icon">🔗</span>Attachments</h3>
    </div>
    <div v-if="task.attachments" class="task-attachment">
      <img v-for="attachment in task.attachments" src="task.attachment.imgUrl" alt="">
    </div>
  </div>
</template>
 
<script>
export default {
  props: ['task'],
  name: 'task-attachment',
  components: {},
  data() {
    return {};
  },
  created() { },
  methods: {},
  computed: {},
  unmounted() { },
};
</script>
<style>

</style>