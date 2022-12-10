<template>

  <section v-if="task.checklists" class="checklists-container">
    <div v-for="checklist in task.checklists" class="checklists">

      <div class="title-container flex space-between ">
        <h3>{{ checklist.title }}</h3>
        <button class="task-content-btn danger" @click="onRemove($event, checklist.id)">Delete</button>
      </div>
      <div class="flex relative">
        <span class="progressbar-counter">{{ listsStatus[checklist.id] ? listsStatus[checklist.id].toFixed(0) + '%' : 0 +
            '%'
        }}</span>
        <progress class="progress-bar" :value=progressCount(checklist)></progress>
      </div>

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

  <deleteModal v-if="isDeleteModal" :pos="modalPos" @remove="removeChecklist" @closeModal="closeDeleteModal"
    :toDelete="'checklist'" />
</template>

<script>
import { utilService } from '../../../../services/util.service';
import deleteModal from '../task-details-cmps/task-details-modals-cmps/delete-modal.cmp.vue'
export default {
  emits: ['closeCheckListModal', 'updateTask'],
  props: {
    task: Object,
  },
  name: 'task-checklist',

  components: {
    deleteModal
  },
  data() {
    return {
      currChecklistId: null,
      isDeleteModal: false,
      modalPos: null,
      addItem: false,
      listTitle: '',
      todoTitle: '',
      currChecklist: null,
      listsStatus: {},
    };
  },
  created() { },
  methods: {

    closeDeleteModal() {
      this.isDeleteModal = false
      this.currChecklistId = null
    },
    onRemove(ev, checklistId) {
      this.currChecklistId = checklistId
      const elPos = ev.target.getBoundingClientRect()
      const top = elPos.top + elPos.height + 8
      const left = elPos.left
      this.modalPos = { top, left }
      this.isDeleteModal = true
    },

    writeTodo(checklist) {
      this.currChecklist = checklist
    },
    removeChecklist() {
      const updateTask = JSON.parse(JSON.stringify(this.task))
      const clIdx = updateTask.checklists.findIndex(cl => cl.id === this.currChecklistId)
      let activityTxt = `removed ${updateTask.checklists[clIdx].title} from ${updateTask.title}`
      updateTask.checklists.splice(clIdx, 1)
      this.isDeleteModal = false
      this.currChecklistId = null
      this.$emit('updateTask', updateTask, activityTxt)
    },
    addTodo(checklistId) {
      this.addItem = false
      const todo = utilService.getEmptyTodo()
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
      let activityTxt
      if (updateTask.checklists[clIdx].todos[tdIdx].isDone) {
        activityTxt = `completed ${updateTask.checklists[clIdx].todos[tdIdx].title} on ${updateTask.checklists[clIdx].title}`
      } else {
        activityTxt = `marked ${updateTask.checklists[clIdx].todos[tdIdx].title} incomplete on ${updateTask.checklists[clIdx].title}`
      }
      this.$emit('updateTask', updateTask, activityTxt)
    }
  },
  computed: {
    progressCount() {
      return checklist => {
        const todos = checklist.todos?.length
        if (!todos) return 0
        const doneTodos = checklist.todos.filter((todo) => todo.isDone).length
        this.listsStatus[checklist.id] = doneTodos / todos * 100
        return doneTodos / todos
      }
    },
  },
  unmounted() { },
}
</script>
<style>
.checked{
  text-decoration: line-through;
}
</style>