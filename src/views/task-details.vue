<template>
  <section v-if="task" class="task-details">
    <h5>{{ task.title }}</h5>
    <small v-if="group">in list: {{group.title}}</small>
  </section>
</template>

 <script>
import { groupService } from '../services/group.service.local';
import { taskService } from '../services/task.service.local';

 export default {
 name: 'task-details',
    components: {},
  data() {
   return {
      task: null,
      group: null,
   }
    },

    async created() {
        const taskId = this.$route.params.taskId
        const groupId = this.$route.params.groupId
        const boardId = this.$route.params.boardId
        this.task = await taskService.getById(boardId, groupId ,taskId)
        this.group = await groupService.getById(boardId, groupId)
    },
  
 methods: {},
 computed: {},
 unmounted() {},
  }
  </script>
