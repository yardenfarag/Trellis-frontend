<template>
  <div class="screen-black"></div>
  <section v-click-outside="closeDetails" v-if="task" class="main-task-details">
    <div class="task-cover">
      <button @click="closeDetails" class="close-details">X</button>
      <button class="cover-btn">Cover</button>
    </div>
    <div class="task-header">
      <div class="task-title">
        <h5 contenteditable="true" @blur="updateTaskTitle($event)">{{ task.title }}</h5>
      </div>
      <p v-if="group">in list: {{ group.title }}</p>
    </div>
    <section class="task-info flex">
      <section class="task-content">

        <div v-if="task.dueDate">
          <input type="checkBox">
          Due date: {{ task.dueDate }}
        </div>
        <section class="flex members-and-labels">
          <section>
            <h5>Members</h5>
            <div v-if="taskMembers.length" class="task-members flex">
              <div v-for="taskMember in taskMembers" class="task-member">
                <div class="avatar">
                  <img :src="taskMember.imgUrl" :style="{ width: 40 + 'px', 'border-radius': 50 + '%' }">
                </div>
              </div>
              <div @click="toggleMembersModal" class="avatar"
                :style="{ textAlign: 'center', background: 'gray', width: 40 + 'px', 'border-radius': 50 + '%' }">+
              </div>
            </div>
          </section>
          <section>
            <h5>Labels</h5>
            <div v-if="task.labels.length" class="task-labels flex">
              <div v-for="label in task.labels" :key="label.id" class="task-label">
                <div v-if="label" class="label-preview"
                  :style="[label.color ? { backgroundColor: label.color } : { backgroundColor: 'black' }]">
                  hi</div>
                <div v-if="label" class="label-circle"
                  :style="[label.color ? { backgroundColor: label.color } : { backgroundColor: 'black' }]">hi</div>
                <span class="label-title">{{ label.title }}</span>
              </div>
              <button @click="toggleLabelsModal">+</button>
            </div>
          </section>
        </section>
        <task-description @updateTaskDesc="updateTaskDesc" :task="task" />
        <hr>
        <task-attachment v-if="task.attachments?.length" @deleteAttachment="updateTask" :task="task" />
        <hr>
        <task-checklist :task="task" @updateTask="updateTask" />
        <hr>
        <task-map :task="task" />
        <hr>
        <task-comments :task="task" />
      </section>

      <section class="task-sidebar">
        <h6>Add to card</h6>
        <button class="task-detail-btn">join</button>
        <button @click="toggleMembersModal()" class="task-detail-btn">Members</button>
        <button @click="toggleLabelsModal()" class="task-detail-btn">Labels</button>
        <button @click="toggleChecklistModal()" class="task-detail-btn">Checklist</button>
        <button @click="toggleDateModal()" class="task-detail-btn">Dates</button>
        <button @click="toggleAttachmentModal()" class="task-detail-btn">Attachment</button>
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

  <taskChecklistModal v-if="isChecklistModal" @closeCheckListModal="toggleChecklistModal" :task="task" :gruop="group"
    @updateTask="updateTask" />
  <taskLabelsModal @closeModal="toggleLabelsModal" @updateTask="updateTask" v-if="isLabelsModalOpen" :board="board"
    :task="task" />
  <taskDatesModal :task="task" v-if="isDateModal" @closeDateModal="toggleDateModal" @saveTask="updateTask" />
  <taskAttachmentModal :task="task" v-if="isAttachmentModal" @closeAttachmentModal="toggleAttachmentModal"
    @saveTask="updateTask"></taskAttachmentModal>
  <taskMembersModal @saveTask="updateTask" :task="task" v-if="isMembersModal" @closeMembersModal="toggleMembersModal" />
</template>

<script>
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
    console.log(this.task);
  },


  methods: {
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
    async updateTaskDesc(desc) {
      const taskToEdit = JSON.parse(JSON.stringify(this.task))
      taskToEdit.description = desc
      const boardToSave = JSON.parse(JSON.stringify(this.board))
      await this.$store.dispatch({ type: 'saveTask', board: boardToSave, groupId: this.group.id, taskToSave: taskToEdit })
    },
    async updateTask(updatedTask) {
      this.task = updatedTask
      const boardToSave = JSON.parse(JSON.stringify(this.board))
      await this.$store.dispatch({ type: 'saveTask', board: boardToSave, groupId: this.group.id, taskToSave: updatedTask })
    },
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
    users() {
      return this.$store.getters.users
    },
    taskMembers() {
      let members = this.users.filter(user => {
        return this.board.memberIds.includes(user._id)
      })
      console.log(members);
      console.log(this.task.memberIds);
      let taskMembers = members.filter(member => {
        return this.task.memberIds.includes(member._id)
      })
      console.log(taskMembers);
      return taskMembers
    },
  },
  directives: {
    ClickOutside
  },
  unmounted() {
    document.querySelector('html').classList.add('board-page')
  },
}
</script>
