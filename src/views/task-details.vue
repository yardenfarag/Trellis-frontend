<template>
  <div class="screen-black"></div>

  <section v-click-outside="closeDetails" v-if="task" class="task-details">

    <section class="task-header">
      <div :style="{ background: setBackground }" v-if="(task.style.bgc || task.style.imgUrl)" class="task-cover">
        <button @click="toggleCoverModal" class="btn-cover opacity-input">Cover</button>
      </div>
      <div class="task-title-container">
        <div class="task-title">
          <textarea rows="1" class="task-title-edit" v-model="newTitle"
            @blur="updateTaskTitle($event)">{{ task.title }}</textarea>
        </div>
        <p class="in-group" v-if="group">in list: {{ group.title }}</p>
        <button class="close-details opacity-input" @click="closeDetails"></button>
      </div>
    </section>

    <section class="task-main">
      <section class="task-content">
        <section class="members-and-labels">
          <section v-if="taskMembers.length" class="members-container small-container">
            <h5 class="small-title-margin">Members</h5>
            <div class="member-list-container">
              <ul v-for="taskMember in taskMembers" class="clean-list">
                <li class="avatar">
                  <img :src="taskMember.imgUrl" :style="{ width: 100 + '%', borderRadius: 100 + '%' }">
                </li>
              </ul>
              <button class="btn-member-modal task-content-btn" @click="openModal($event, 'members')"></button>
            </div>
          </section>


          <section v-if="task.labels.length" class="labels-container small-container">
            <h5 class="small-title-margin">Labels</h5>
            <div class="labels-list-container">

              <div v-for="label in task.labels" :key="label.id" class="label">
                <div class="label-bg" :style="{ backgroundColor: label.color }">
                  <div v-if="label.title" class="label-title-place-holder">{{ label.title }}</div>
                </div>
                <div v-if="label.title" class="label-title">{{ label.title }}</div>
                <div class="label-circle" :style="{ backgroundColor: label.color }"></div>
              </div>
              <button class="btn-label-modal task-content-btn" @click="openModal($event, 'labels')"></button>
            </div>
          </section>
        </section>

        <div v-if="task.dueDate" class="task-date small-container">
          <h5 class="small-title-margin">Due date</h5>
          <div class="small-container">
            <input @change="toggleDuedate" :checked="task.dueDate.isDone" type="checkbox">
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

          <task-attachment v-if="task.attachments?.length" @saveAttachment="saveTask" @deleteAttachment="saveTask"
            :task="task" />

          <task-checklist :task="task" @updateTask="saveTask" />

          <task-map :task="task" />
          <task-comments @saveTask="saveTask" :task="task" />
        </div>
      </section>

      <section class="task-sidebar">
        <div class="add-to-card-container">
          <h5 class="small-title add-to-card-title">Add to card</h5>
          <div class="btn-container">
            <button @click="openModal($event, 'members')" class="task-detail-btn members"><span>Members</span> </button>
            <button @click="openModal($event, 'labels')" class="task-detail-btn labels"><span>Labels</span> </button>
            <button @click="openModal($event, 'checklist')" class="task-detail-btn checklist"><span>Checklist</span>
            </button>
            <button @click="openModal($event, 'dates')" class="task-detail-btn dates"><span>Dates</span> </button>
            <button @click="openModal($event, 'attachment')" class="task-detail-btn attachment"><span>Attachment</span>
            </button>
            <button class="task-detail-btn location"><span>Location</span> </button>
            <button v-if="(!task.style?.bg)" @click="openModal($event, 'cover')"
              class="task-detail-btn cover"><span>Cover</span> </button>
          </div>
        </div>
        <div class="action-container">
          <h5 class="small-title">Actions</h5>
          <div class="btn-container">
            <!-- <button class="task-detail-btn move"><span>Move</span> </button>
            <button class="task-detail-btn copy"><span>Copy</span> </button> -->
            <button @click="removeTask" class="task-detail-btn archive"><span>Archive</span></button>
          </div>
        </div>

      </section>
    </section>
  </section>

  <taskChecklistModal v-if="isChecklistModal" @closeModal="closeModals" :task="task" :gruop="group" :pos="modalPos"
    @updateTask="saveTask" />
  <taskLabelsModal @closeModal="closeModals" @updateTask="saveTask" v-if="isLabelsModal" :board="board" :task="task"
    :pos="modalPos" />
  <taskDatesModal :task="task" v-if="isDateModal" @closeModal="closeModals" @saveTask="saveTask" :pos="modalPos" />
  <taskAttachmentModal :task="task" v-if="isAttachmentModal" @closeModal="closeModals" @saveTask="saveTask"
    :pos="modalPos" />
  <taskMembersModal @saveTask="saveTask" :task="task" v-if="isMembersModal" @closeModal="closeModals" :pos="modalPos" />
  <taskCoverModal :task="task" v-if="isCoverModal" @saveTask="saveTask" @closeModal="closeModals" :pos="modalPos" />
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
import taskCoverModal from '../cmps/board-cmps/task-cmps/task-details-cmps/task-details-modals-cmps/task-cover-modal.cmp.vue'

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
    taskCoverModal,
  },
  data() {
    return {
      newTitle: '',
      boardToShow: null,
      task: null,
      group: null,
      boardId: null,
      isLabelsModal: false,
      isChecklistModal: false,
      isDateModal: false,
      isMembersModal: false,
      isAttachmentModal: false,
      isCoverModal: false,

      modalPos: null
    }
  },

  async created() {
    await this.$store.dispatch({ type: 'loadUsers' })
    const taskId = this.$route.params.taskId
    const groupId = this.$route.params.groupId
    this.boardId = this.$route.params.boardId

    await this.$store.dispatch({ type: 'setCurrBoard', boardId: this.boardId })

    this.group = this.board.groups.find(group => group.id === groupId)
    this.task = this.group.tasks.find(task => task.id === taskId)

    this.newTitle = this.task.title
    document.querySelector('#app').classList.remove('board-page')
  },


  methods: {
    async toggleDuedate() {
      const taskToEdit = JSON.parse(JSON.stringify(this.task))
      taskToEdit.dueDate.isDone = !taskToEdit.dueDate.isDone
      this.saveTask(taskToEdit)
      let activityTxt
      if (taskToEdit.dueDate.isDone) {
        activityTxt = `marked the due date on ${taskToEdit.title} complete`
      } else {
        activityTxt = `marked the due date on ${taskToEdit.title} incomplete`
      }
      await this.updateTask(taskToEdit, activityTxt)
    },

    openModal(ev, modal) {
      this.closeModals()

      console.log(ev.target.getBoundingClientRect())
      const elPos = ev.target.getBoundingClientRect()
      const top = elPos.top + elPos.height + 8
      const left = elPos.left
      this.modalPos = { top, left }
      if (modal === 'members') this.isMembersModal = true
      if (modal === 'labels') this.isLabelsModal = true
      if (modal === 'checklist') this.isChecklistModal = true
      if (modal === 'dates') this.isDateModal = true
      if (modal === 'attachment') this.isAttachmentModal = true
      if (modal === 'cover') this.isCoverModal = true
    },

    closeModals() {
      this.isLabelsModal = false
      this.isChecklistModal = false
      this.isDateModal = false
      this.isMembersModal = false
      this.isAttachmentModal = false
      this.isCoverModal = false
    },

    async removeTask() {
      let activityTxt = `archived ${this.task.title}`
      const groupId = this.group.id
      const taskId = this.task.id
      await this.$store.dispatch({ type: 'removeTask', groupId, taskId, activityTxt })
      this.closeDetails()
    },
    closeDetails() {
      this.$router.push('/board/' + this.board._id)
    },
    async updateTaskTitle() {
      if (!this.newTitle) {
        this.newTitle = this.task.title
        return
      } else {
        const taskToEdit = JSON.parse(JSON.stringify(this.task))
        taskToEdit.title = this.newTitle
        this.saveTask(taskToEdit)
      }
    },
    async saveTask(taskToEdit, activityTxt) {
      this.task = taskToEdit
      const groupIdx = this.board.groups.findIndex(group => group.id === this.group.id)
      const taskIdx = this.board.groups[groupIdx].tasks.findIndex(task => task.id === this.task.id)
      this.board.groups[groupIdx].tasks.splice(taskIdx, 1, taskToEdit)
      await this.$store.dispatch({ type: 'updateTask', groupId: this.group.id, task: taskToEdit, activityTxt })
    },
    async updateTaskDesc(desc) {
      const taskToEdit = JSON.parse(JSON.stringify(this.task))
      taskToEdit.description = desc
      this.saveTask(taskToEdit)
    },
  },
  computed: {
    setBackground() {
      if (this.task.style.bgc) return this.task.style.bgc
      if (this.task.style.imgUrl) return this.task.style.imgUrl
    },
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
      return JSON.parse(JSON.stringify(this.$store.getters.board))
    },
    // taskActivities() {
    //   const taskActivities = this.board.activities.filter(activitity => {
    //     return activity.task.id === this.task.id
    //   })
    //   return taskActivities
    // },
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
    document.querySelector('#app').classList.add('board-page')
  },
}
</script>
