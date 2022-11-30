<template>

  <section v-if="isChecklistModal" class="checklist-modal">
    <button @click="closeModal">X</button>
    <h2>Add checklist</h2>
    <hr>
    <label for="title">Title</label>
    <input v-model="title" type="text">
    <button @click="addCheckList" class="call-to-action">Add</button>
  </section>

  <section v-if="task.checklists" class="checklists-container">
    <div v-for="checklist in task.checklists" class="checklists">
      <div class="title">
        <h3><span class="task-details-icon">🗹</span>{{ checklist.title }}</h3>
        <button>Hide checked items</button>
        <button @click="removeChecklist(checklist.id)">Delete</button>
      </div>
      <div v-for="todo in checklist.todos" class="checklist-todos">
        <input type="checkBox" /> {{ todo.title }}
      </div>
      <button v-if="!addItem" @click="addItem = true">Add an item</button>
      <div v-if="addItem" class="add-todo">
        <textarea placeholder="Add an item" cols="30" rows="10"></textarea>
        <button>Add</button>
        <button @click="addItem = false">Cancel</button>
      </div>
    </div>
  </section>
</template>

<script>
import { boardService } from '../../../../services/board.service.local';

export default {
  emits: ['closeCheckListModal', 'updateTask'],
  props: {
    task: Object,
    isChecklistModal: Boolean,
  },
  name: 'task-checklist',
  components: {},
  data() {
    return {
      addItem: false,
      title: '',
    };
  },
  created() { },
  methods: {
    closeModal() {
      this.$emit('closeCheckListModal', false)
    },
    addCheckList() {
      this.closeModal()
      const checklist = boardService.getEmptyChecklist()
      checklist.title = this.title

      if (this.task?.checklists) this.task.checklists.push(checklist)
      else this.task.checklists = [checklist]
      this.$emit('updateTask', this.task)
    },
    removeChecklist(id) {
      const taskToEdit = JSON.parse(JSON.stringify(this.task))
      const clIdx = taskToEdit.checklists.find(cl => cl.id === id)
      console.log(clIdx)
      taskToEdit.checklists.splice(clIdx, 1)
      console.log(taskToEdit.checklists)
      this.$emit('updateTask', taskToEdit)
    },

  },
  computed: {},
  unmounted() { },
}
</script>
<style>

</style>