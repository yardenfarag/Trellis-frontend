<template>
  <div class="task-cover">
    Cover
    <button>Cover</button>
  </div>
  <div class="task-header">
    <h5>{{ task.title }}</h5>
    <small v-if="group">in list: {{group.title}}</small>
  </div>
  <section v-if="task" class="task-details flex">
    <section class="main-task-details">
    
    <div v-if="task.dueDate">
        <input type="checkBox">
        Due date: {{ task.dueDate }}
      </div>
      <section>Members: {{task.memberIds}} Labels: {{ task.labelIds }}</section> 
      <task-description />
      <task-attachment />
      <task-checklist />
      <task-map />
      <task-comments />
    </section>

    <section class="task-sidebar">
      <h6>Add to card</h6>
      <button>join</button>
      <button>Members</button>
      <button>Labels</button>
      <button>Checklist</button>
      <button>Dates</button>
      <button>Attachment</button>
      <button>Location</button>
      <button>Custom Fields</button>
      <h6>Actions</h6>
      <button>Move</button>
      <button>Copy</button>
      <button>Make template</button>
      <button>Watch</button>
      <hr>
      <button>Archive</button>
      <button>Share</button>

    </section>


  </section>
</template>

 <script>
import { groupService } from '../services/group.service.local';
import { taskService } from '../services/task.service.local';
import taskDescription from '../cmps/board-cmps/task-cmps/task-details-cmps/task-description.cmp.vue'
import taskAttachment from '../cmps/board-cmps/task-cmps/task-details-cmps/task-attachment.cmp.vue'
import taskChecklist from '../cmps/board-cmps/task-cmps/task-details-cmps/task-checklist.cmp.vue'
import taskComments from '../cmps/board-cmps/task-cmps/task-details-cmps/task-comments.cmp.vue'
import taskMap from '../cmps/board-cmps/task-cmps/task-details-cmps/task-map.cmp.vue'
 
export default {
 name: 'task-details',
    components: {
      taskDescription,
      taskAttachment,
      taskChecklist,
      taskComments,
      taskMap,
    },
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
