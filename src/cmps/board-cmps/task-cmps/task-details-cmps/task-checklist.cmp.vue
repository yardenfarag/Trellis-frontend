<template>

  <section v-if="task.checklists" class="checklists-container">
    <div v-for="checklist in task.checklists" class="checklists">

      <div class="title-container flex space-between ">
        <h3>{{ checklist.title }}</h3>
        <button class="task-content-btn danger" @click="removeChecklist(checklist.id)">Delete</button>
      </div>
      <progress class="progress-bar" :value=progressCount(checklist)></progress>
      <div class="list">
        <div v-for="todo in checklist.todos" class="checklist-todos">
          <div class="todo">
            <input type="checkBox" :checked="todo.isDone" @change="toggleTodo(todo.id, checklist.id)" />
            <h4 class="todo-title" :class="{ checked: todo.isDone }">{{ todo.title }}</h4>
          </div>
        </div>
        <!-- <button @click="deleteTodo(todo.id, checklist.id)">X</button> -->
      </div>
      <button v-if="!addItem" @click="addItem = true ; writeTodo(checklist)" class="task-content-btn">Add an
        item</button>

      <div v-if="(addItem && checklist.id === currChecklist.id)" class="add-todo">

        <textarea v-model="todoTitle" placeholder="Add an item"></textarea>
        <div class="controler">
          <button class="call-to-action" @click="addTodo(checklist.id)">Add</button>
          <button class="task-content-btn" @click="addItem = false">Cancel</button>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { localService } from '../../../../services/board.service.local';
import { utilService } from '../../../../services/util.service';
export default {
  emits: ['closeCheckListModal', 'updateTask'],
  props: {
    task: Object,
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
      // const newActivity = utilService.setActivity(`removed ${updateTask.checklists[clIdx].title} from ${updateTask.title}`, updateTask)
      this.$emit('updateTask', updateTask)
    },
    addTodo(checklistId) {
      this.addItem = false
      const todo = localService.getEmptyTodo()
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
      // let newActivity
      // if (updateTask.checklists[clIdx].todos[tdIdx].isDone) {
      //   newActivity = utilService.setActivity(`completed ${updateTask.checklists[clIdx].todos[tdIdx].title} on ${updateTask.checklists[clIdx].title}`, updateTask)
      // } else {
      //   newActivity = utilService.setActivity(`marked ${updateTask.checklists[clIdx].todos[tdIdx].title} incomplete on ${updateTask.checklists[clIdx].title}`, updateTask)
      // }
      this.$emit('updateTask', updateTask)
    }
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