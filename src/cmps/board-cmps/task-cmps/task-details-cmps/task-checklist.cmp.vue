<template>

  <!-- <section v-if="isChecklistModal" class="checklist-modal">
    <button @click="closeModal">X</button>
    <h2>Add checklist</h2>
    <hr>
    <label for="title">Title</label>
    <input v-model="listTitle" type="text">
    <button @click="addCheckList" class="call-to-action">Add</button>
  </section> -->

  <section v-if="task.checklists" class="checklists-container">
    <div v-for="checklist in task.checklists" class="checklists">

      <div class="title">
        <progress :value=progressCount(checklist)></progress>
        <h3><span class="task-details-icon">🗹</span>{{ checklist.title }}</h3>
        <button>Hide checked items</button>
        <button @click="removeChecklist(checklist.id)">Delete</button>
      </div>
      <div v-for="todo in checklist.todos" class="checklist-todos">
        <input type="checkBox" :checked="todo.isDone" @change="toggleTodo(todo.id, checklist.id)" />
        <h4 class="todo-title" :class="{ checked: todo.isDone }">{{ todo.title }}</h4>
        <button @click="deleteTodo(todo.id, checklist.id)">X</button>
      </div>
      <button v-if="!addItem" @click="addItem = true ; writeTodo(checklist)">Add an item</button>

      <div v-if="(addItem && checklist.id === currChecklist.id)" class="add-todo">

        <textarea v-model="todoTitle" placeholder="Add an item" cols="30" rows="10"></textarea>

        <button @click="addTodo(checklist.id)">Add</button>
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
    // isChecklistModal: Boolean,
  },
  name: 'task-checklist',
  components: {},
  data() {
    return {
      addItem: false,
      listTitle: '',
      todoTitle: '',
      currChecklist: null,
    };
  },
  created() { },
  methods: {
    writeTodo(checklist) {
      this.currChecklist = checklist
    },
    // closeModal() {
    //   this.$emit('closeCheckListModal', false)
    // },
    // addCheckList() {
    //   this.closeModal()
    //   const checklist = boardService.getEmptyChecklist()
    //   checklist.title = this.listTitle
    //   const updateTask = JSON.parse(JSON.stringify(this.task))
    //   if (updateTask.checklists) updateTask.checklists.push(checklist)
    //   else updateTask.checklists = [checklist]
    //   this.$emit('updateTask', updateTask)
    //   this.listTitle = ''
    // },
    removeChecklist(id) {
      const updateTask = JSON.parse(JSON.stringify(this.task))
      const clIdx = updateTask.checklists.findIndex(cl => cl.id === id)
      updateTask.checklists.splice(clIdx, 1)
      this.$emit('updateTask', updateTask)
    },
    addTodo(checklistId) {
      this.addItem = false
      const todo = boardService.getEmptyTodo()
      todo.title = this.todoTitle
      const updateTask = JSON.parse(JSON.stringify(this.task))
      const clIdx = updateTask.checklists.findIndex(cl => cl.id === checklistId)
      updateTask.checklists[clIdx].todos.push(todo)
      this.$emit('updateTask', updateTask)
      this.todoTitle = ''
    },
    deleteTodo(todoId, checklistId) {
      const updateTask = JSON.parse(JSON.stringify(this.task))
      const clIdx = updateTask.checklists.findIndex(cl => cl.id === checklistId)
      const tdIdx = updateTask.checklists[clIdx].todos.findIndex(td => td.id === todoId)
      updateTask.checklists[clIdx].todos.splice(tdIdx, 1)
      this.$emit('updateTask', updateTask)
    },
    toggleTodo(todoId, checklistId) {
      const updateTask = JSON.parse(JSON.stringify(this.task))
      const clIdx = updateTask.checklists.findIndex(cl => cl.id === checklistId)
      const tdIdx = updateTask.checklists[clIdx].todos.findIndex(td => td.id === todoId)
      updateTask.checklists[clIdx].todos[tdIdx].isDone = !updateTask.checklists[clIdx].todos[tdIdx].isDone
      this.$emit('updateTask', updateTask)
    },


  },
  computed: {
    progressCount() {
      return checklist => {
        const todos = checklist.todos?.length
        if (!todos) return 0
        const doneTodos = checklist.todos.filter((todo) => todo.isDone).length
        return doneTodos / todos
      }
    }
  },
  unmounted() { },
}
</script>
<style>

</style>