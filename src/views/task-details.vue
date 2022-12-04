<template>
  <div class="screen-black"></div>

  <section v-click-outside="closeDetails" v-if="task" class="task-details">

    <section class="task-header">
      <div class="task-cover">
        <button class="btn-cover opacity-input">Cover</button>
      </div>
      <div class="task-title-container">
        <div class="task-title">
          <textarea rows="1" class="task-title-edit" v-model="task.title"
            @blur="updateTaskTitle($event)">{{ task.title }}</textarea>
        </div>
        <p class="in-group" v-if="group">in list: {{ group.title }}</p>
        <button class="close-details opacity-input" @click="closeDetails"></button>
      </div>
    </section>

    <section class="task-main">
      <section class="task-content">
        <section class="members-and-labels">
          <section class="members-container small-container">
            <h5 class="small-title-margin">Members</h5>
            <div class="member-list-container">
              <ul v-if="taskMembers.length" v-for="taskMember in taskMembers" class="clean-list">
                <li class="avatar">
                  <img :src="taskMember.imgUrl" :style="{ width: 100 + '%', borderRadius: 100 + '%' }">
                </li>
              </ul>
              <button class="btn-member-modal task-content-btn" @click="toggleMembersModal"></button>
            </div>
          </section>


          <section class="labels-container small-container">
            <h5 class="small-title-margin">Labels</h5>
            <div v-if="task.labels.length" class="labels-list-container">

              <div v-for="label in task.labels" :key="label.id" class="label">
                <div class="label-bg" :style="{ backgroundColor: label.color }">
                  <div v-if="label.title" class="label-title-place-holder">{{ label.title }}</div>
                </div>
                <div v-if="label.title" class="label-title">{{ label.title }}</div>
                <div class="label-circle" :style="{ backgroundColor: label.color }"></div>
              </div>
              <button class="btn-label-modal task-content-btn" @click="toggleLabelsModal"></button>
            </div>
          </section>
        </section>

        <div v-if="task.dueDate" class="task-date small-container">
          <h5 class="small-title-margin">Due date</h5>
          <div class="small-container">
            <input @change="toggleDuedate" type="checkbox">
            <button class="task-content-btn" @click="toggleDateModal">
              <span class="date-info">
                {{ formattedDate }} <span>{{ duedateComplete }}</span>
              </span>
              <span class="arrow-down"></span>
            </button>
          </div>
        </div>
        <div class="task-info">
          <task-description @updateTaskDesc="updateTaskDesc" :task="task" />

          <task-attachment v-if="task.attachments?.length" @deleteAttachment="updateTask" :task="task" />

          <task-checklist :task="task" @updateTask="updateTask" />

          <task-map :task="task" />
          <task-comments @saveTask="updateTask" :task="task" />
        </div>
      </section>

      <section class="task-sidebar">
        <div class="add-to-card-container">
          <h5 class="small-title add-to-card-title">Add to card</h5>
          <div class="btn-container">
            <button class="task-detail-btn join"><span>join</span> </button>
            <button @click="toggleMembersModal()" class="task-detail-btn members"><span>Members</span> </button>
            <button @click="toggleLabelsModal()" class="task-detail-btn labels"><span>Labels</span> </button>
            <button @click="toggleChecklistModal()" class="task-detail-btn checklist"><span>Checklist</span> </button>
            <button @click="toggleDateModal()" class="task-detail-btn dates"><span>Dates</span> </button>
            <button @click="toggleAttachmentModal()" class="task-detail-btn attachment"><span>Attachment</span>
            </button>
            <button class="task-detail-btn location"><span>Location</span> </button>
            <button class="task-detail-btn custom-field"><span>Custom Fields</span> </button>
          </div>
        </div>
        <div class="action-container">
          <h5 class="small-title">Actions</h5>
          <div class="btn-container">
            <button class="task-detail-btn move"><span>Move</span> </button>
            <button class="task-detail-btn copy"><span>Copy</span> </button>
            <button class="task-detail-btn make-template"><span>Make template</span></button>
            <button class="task-detail-btn watch"><span>Watch</span> </button>
            <button @click="removeTask" class="task-detail-btn archive"><span>Archive</span></button>
            <button class="task-detail-btn share"><span>Share</span></button>
          </div>
        </div>

      </section>
    </section>
  </section>

  <taskChecklistModal v-if="isChecklistModal" @closeCheckListModal="toggleChecklistModal" :task="task" :gruop="group"
    @updateTask="updateTask" />
  <taskLabelsModal @removeLabelFromTask="removeLabelFromTask" @saveLabelToTask="saveLabelToTask"
    @closeModal="toggleLabelsModal" @updateTask="updateTask" v-if="isLabelsModalOpen" :board="board" :task="task" />
  <taskDatesModal :task="task" v-if="isDateModal" @closeDateModal="toggleDateModal" @saveTask="updateTask" />
  <taskAttachmentModal :task="task" v-if="isAttachmentModal" @closeAttachmentModal="toggleAttachmentModal"
    @saveTask="updateTask"></taskAttachmentModal>
  <taskMembersModal @saveTask="updateTask" :task="task" v-if="isMembersModal" @closeMembersModal="toggleMembersModal" />
</template>

<script>
import { utilService } from '../services/util.service'
import taskDescription from '../cmps/board-cmps/task-cmps/task-details-cmps/task-description.cmp.vue'
import taskAttachment from '../cmps/board-cmps/task-cmps/task-details-cmps/task-attachment.cmp.vue'
import taskChecklist from '../cmps/board-cmps/task-cmps/task-details-cmps/task-checklist.cmp.vue'
import taskComments from '../cmps/board-cmps/task-cmps/task-details-cmps/task-comments.cmp.vue'
import taskMap from '../cmps/board-cmps/task-cmps/task-details-cmps/task-map.cmp.vue'

import ClickOutside from 'vue-click-outside'

import taskChecklistModal from '../cmps/board-cmps/task-cmps/task-details-cmps/task-details-modals-cmps/task-checklist-modal.cmp.vue'
import taskLabelsModal from '../cmps/board-cmps/task-cmps/task-details-cmps/task-details-modals-cmps/task-labels-modal.cmp.vue'
import taskDatesModal from '../cmps/board-cmps/task-cmps/task-details-cmps/task-details-modals-cmps/task-date-modal.cmp.vue'
import taskMembersModal from '../cmps/board-cmps/task-cmps/task-details-cmps/task-details-modals-cmps/task-members-modal.cmp.vue'
import taskAttachmentModal from '../cmps/board-cmps/task-cmps/task-details-cmps/task-details-modals-cmps/task-attachment-modal.cmp.vue'

export default {
  name: 'task-details',
  components: {
    taskDescription,
    taskAttachment,
    taskChecklist,
    taskComments,
    taskMap,
    taskChecklistModal,
    taskLabelsModal,
    taskDatesModal,
    taskMembersModal,
    taskAttachmentModal,
  },
  data() {
    return {
      task: null,
      group: null,
      boardId: null,
      isLabelsModalOpen: false,
      isChecklistModal: false,
      isDateModal: false,
      isMembersModal: false,
      isAttachmentModal: false,
    }
  },

  async created() {
    this.$store.dispatch({ type: 'loadUsers' })
    const boardId = this.$route.params.boardId
    this.boardId = boardId
    if (!this.$store.getters.board) await this.$store.dispatch({ type: 'setCurrBoard', boardId })

    const board = JSON.parse(JSON.stringify(this.board))

    const groupId = this.$route.params.groupId
    this.group = board.groups.find(group => group.id === groupId)

    const taskId = this.$route.params.taskId
    this.task = this.group.tasks.find(task => task.id === taskId)
    document.querySelector('html').classList.remove('board-page')
  },


  methods: {
    async toggleDuedate() {
      const taskToEdit = JSON.parse(JSON.stringify(this.task))
      taskToEdit.dueDate.isDone = !taskToEdit.dueDate.isDone
      let newActivity
      if (taskToEdit.dueDate.isDone) {
        newActivity = utilService.setActivity(`marked the due date on ${taskToEdit.title} complete`, taskToEdit)
      } else {
        newActivity = utilService.setActivity(`marked the due date on ${taskToEdit.title} incomplete`, taskToEdit)
      }
      await this.updateTask(taskToEdit, newActivity)
    },
    toggleMembersModal() {
      this.isLabelsModalOpen = false
      this.isChecklistModal = false
      this.isDateModal = false
      this.isAttachmentModal = false
      this.isMembersModal = !this.isMembersModal
    },
    toggleLabelsModal() {
      this.isMembersModal = false
      this.isChecklistModal = false
      this.isDateModal = false
      this.isAttachmentModal = false
      this.isLabelsModalOpen = !this.isLabelsModalOpen
    },
    toggleChecklistModal() {
      this.isMembersModal = false
      this.isLabelsModalOpen = false
      this.isDateModal = false
      this.isAttachmentModal = false
      this.isChecklistModal = !this.isChecklistModal
    },
    toggleDateModal() {
      this.isMembersModal = false
      this.isLabelsModalOpen = false
      this.isChecklistModal = false
      this.isAttachmentModal = false
      this.isDateModal = !this.isDateModal
    },
    toggleAttachmentModal() {
      this.isMembersModal = false
      this.isLabelsModalOpen = false
      this.isChecklistModal = false
      this.isDateModal = false
      this.isAttachmentModal = !this.isAttachmentModal
    },

    async removeTask() {
      const boardToSave = JSON.parse(JSON.stringify(this.board))
      const groupId = this.$route.params.groupId
      const newActivity = utilService.setActivity(`archived ${this.task.title}`, this.task)
      boardToSave.activities.unshift(newActivity)
      await this.$store.dispatch({ type: 'removeTask', board: boardToSave, groupId, taskId: this.task.id })
      this.$router.push('/board/' + this.boardId)
    },
    closeDetails() {
      this.$router.push('/board/' + this.boardId)
    },
    async updateTaskTitle(ev) {
      let newTitle = this.task.title
      if (!newTitle) {
        return
      } else {
        const taskToEdit = JSON.parse(JSON.stringify(this.task))
        taskToEdit.title = newTitle
        const boardToSave = JSON.parse(JSON.stringify(this.board))
        await this.$store.dispatch({ type: 'saveTask', board: boardToSave, groupId: this.group.id, taskToSave: taskToEdit })
      }
    },
    async updateTaskDesc(desc) {
      const taskToEdit = JSON.parse(JSON.stringify(this.task))
      taskToEdit.description = desc
      const boardToSave = JSON.parse(JSON.stringify(this.board))
      await this.$store.dispatch({ type: 'saveTask', board: boardToSave, groupId: this.group.id, taskToSave: taskToEdit })
    },
    async updateTask(updatedTask, activity) {
      this.task = updatedTask
      const boardToSave = JSON.parse(JSON.stringify(this.board))
      if (activity) boardToSave.activities.unshift(activity)
      await this.$store.dispatch({ type: 'saveTask', board: boardToSave, groupId: this.group.id, taskToSave: updatedTask })
    },
  },
  computed: {
    duedateComplete() {
      if (this.task.dueDate.isDone) {
        return 'completed'
      }
      return ''
    },
    formattedDate() {
      return utilService.dueDateFormat(this.task.dueDate?.info)
    },
    board() {
      return this.$store.getters.board
    },
    users() {
      return this.$store.getters.users
    },
    taskMembers() {
      let members = this.users?.filter(user => {
        return this.board?.memberIds?.includes(user._id)
      })
      let taskMembers = members?.filter(member => {
        return this.task?.memberIds?.includes(member._id)
      })
      return taskMembers
    },
    loggedinUser() {
      this.$store.getters.loggedinUser
    }
  },
  directives: {
    ClickOutside
  },
  unmounted() {
    document.querySelector('html').classList.add('board-page')
  },
}
</script>
