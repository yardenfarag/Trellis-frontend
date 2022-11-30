<template>
  <div class="screen-black"></div>
  <section v-click-outside="closeDetails" v-if="task" class="main-task-details">
    <div class="task-cover">
      <button @click="closeDetails" class="close-details">X</button>
      <button class="cover-btn">Cover</button>
    </div>
    <div class="task-header">
      <h5 contenteditable="true" @blur="updateTaskTitle($event)">{{ task.title }}</h5>
      <p v-if="group">in list: {{ group.title }}</p>
    </div>
    <section class="task-info flex">
      <section class="task-content">

        <div v-if="task.dueDate">
          <input type="checkBox">
          Due date: {{ task.dueDate }}
        </div>
        <section>Members: {{ task.memberIds }} Labels: {{ task.labelIds }}</section>
        <task-description @updateTaskDesc="updateTaskDesc" :task="task" />
        <task-attachment :task="task" />
        <task-checklist :task="task" />
        <task-map :task="task" />
        <task-comments :task="task" />
      </section>

      <section class="task-sidebar">
        <h6>Add to card</h6>
        <button class="task-detail-btn">join</button>
        <button class="task-detail-btn">Members</button>
        <button class="task-detail-btn">Labels</button>
        <button class="task-detail-btn">Checklist</button>
        <button class="task-detail-btn">Dates</button>
        <button class="task-detail-btn">Attachment</button>
        <button class="task-detail-btn">Location</button>
        <button class="task-detail-btn">Custom Fields</button>
        <h6>Actions</h6>
        <button class="task-detail-btn">Move</button>
        <button class="task-detail-btn">Copy</button>
        <button class="task-detail-btn">Make template</button>
        <button class="task-detail-btn">Watch</button>
        <hr>
        <button @click="removeTask" class="task-detail-btn">Archive</button>
        <button class="task-detail-btn">Share</button>

      </section>
    </section>
  </section>

</template>

<script>
import taskDescription from '../cmps/board-cmps/task-cmps/task-details-cmps/task-description.cmp.vue'
import taskAttachment from '../cmps/board-cmps/task-cmps/task-details-cmps/task-attachment.cmp.vue'
import taskChecklist from '../cmps/board-cmps/task-cmps/task-details-cmps/task-checklist.cmp.vue'
import taskComments from '../cmps/board-cmps/task-cmps/task-details-cmps/task-comments.cmp.vue'
import taskMap from '../cmps/board-cmps/task-cmps/task-details-cmps/task-map.cmp.vue'
import ClickOutside from 'vue-click-outside'

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
      boardId: null,
    }
  },

  async created() {

    const boardId  = this.$route.params.boardId
    this.boardId = boardId
    if (!this.$store.getters.board) await this.$store.dispatch({ type: 'setCurrBoard', boardId })

    const board = JSON.parse(JSON.stringify(this.board))

    const groupId = this.$route.params.groupId
    this.group = board.groups.find(group => group.id === groupId)

    const taskId = this.$route.params.taskId
    this.task = this.group.tasks.find(task => task.id === taskId)
  },

  methods: {
    async removeTask() {
      const boardToSave = JSON.parse(JSON.stringify(this.board))
      const groupId = this.$route.params.groupId
      await this.$store.dispatch({ type: 'removeTask', board: boardToSave, groupId, taskId: this.task.id })
      this.$router.push('/board/' + this.boardId)
    },
    closeDetails() {
      console.log(this.boardId)
      this.$router.push('/board/' + this.boardId)
    },
    async updateTaskTitle(ev) {
      const newTitle = ev.target.innerText
      const taskToEdit = JSON.parse(JSON.stringify(this.task))
      taskToEdit.title = newTitle
      const boardToSave = JSON.parse(JSON.stringify(this.board))
      await this.$store.dispatch({ type: 'saveTask', board: boardToSave, groupId: this.group.id, taskToSave: taskToEdit })
    },
    async updateTaskDesc(desc){
      // console.log(desc)
      const taskToEdit = JSON.parse(JSON.stringify(this.task))
      taskToEdit.description = desc
      const boardToSave = JSON.parse(JSON.stringify(this.board))
      await this.$store.dispatch({ type: 'saveTask', board: boardToSave, groupId: this.group.id, taskToSave: taskToEdit })
    }
  },
  computed: {
    board() {
      return this.$store.getters.board 
    }
  },
  directives: {
    ClickOutside
  }
}
</script>
