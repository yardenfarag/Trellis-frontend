<!-- :style="{ backgroundColor: board.style.headerClr }" -->
<template>
  <header :style="{ backgroundColor: bgColor }" class="app-header flex align-center">
    <div class="dark"></div>
    <section class="header-nav flex align-center">
      <div class="logo flex align-center">
        <router-link class="router-link" to="/board">
          <h2 class="main-logo">Trellis</h2>
        </router-link>
      </div>

      <div class="header-actions flex align-center space-between">

        <div class="start-section flex align-center">
          <div class="btn-dropdown">
            <button @click="toggleRecentModal($event)" class="recent"><span>Recent</span>
              <span class="material-symbols-outlined">
                keyboard_arrow_down
              </span></button>
            <button @click="toggleStarredModal($event)" class="starred"><span>Starred</span><span
                class="material-symbols-outlined">
                keyboard_arrow_down
              </span> </button>
          </div>

          <button class="opacity-input" @click="openCreateModal($event)">Create</button>
        </div>

        <div class="end-section flex align-center">
          <button class="search">Search</button>
          <button class="notifications"></button>
          <img @click="toggleUserModal($event)" v-if="loggedinUser" :src="loggedinUser.imgUrl"
            :style="{ borderRadius: 50 + '%', width: 30 + 'px', height: 30 + 'px', objectFit: 'cover' }">
        </div>

      </div>
    </section>
  </header>
  <boardCreateModal :pos="modalOpenPos" @closeModal=closeCreateModal v-if="isCreateBoard" />
  <recentBoardsModal :pos="modalOpenPos" v-if="isRecentBoards"></recentBoardsModal>
  <starredBoardsModal :pos="modalOpenPos" v-if="isStarredBoards"></starredBoardsModal>
  <userModal v-if="isUserModal" :user="loggedinUser"></userModal>
</template>
<script>
import boardCreateModal from '../board-cmps/board-header-cmps/board-create-modal.cmp.vue';
import recentBoardsModal from './recent-boards-modal.cmp.vue';
import starredBoardsModal from './starred-boards-modal.cmp.vue';
import userModal from './user-modal.cmp.vue'
export default {
  name: 'app-header',
  components: {
    boardCreateModal,
    recentBoardsModal,
    starredBoardsModal,
    userModal,
  },
  data() {
    return {
      isUserModal: false,
      isStarredBoards: false,
      isRecentBoards: false,
      isCreateBoard: false,
      modalOpenPos: null
    };
  },
  created() { },
  methods: {
    toggleUserModal(ev) {
      if (this.isUserModal) this.isUserModal = false
      else {
        const elPos = ev.target.getBoundingClientRect()
        const top = elPos.top + elPos.height + 8
        const left = elPos.left
        this.modalOpenPos = { top, left }
        this.isUserModal = true
      }
    },
    toggleStarredModal(ev) {
      if (this.isStarredBoards) this.isStarredBoards = false
      else {
        const elPos = ev.target.getBoundingClientRect()
        const top = elPos.top + elPos.height + 8
        const left = elPos.left
        this.modalOpenPos = { top, left }
        this.isStarredBoards = true
      }
    },
    toggleRecentModal(ev) {
      if (this.isRecentBoards) this.isRecentBoards = false
      else {
        const elPos = ev.target.getBoundingClientRect()
        const top = elPos.top + elPos.height + 8
        const left = elPos.left
        this.modalOpenPos = { top, left }
        this.isRecentBoards = true
      }
    },
    closeCreateModal() {
      this.isCreateBoard = false
    },
    openCreateModal(ev) {
      const elPos = ev.target.getBoundingClientRect()
      const top = elPos.top + elPos.height + 8
      const left = elPos.left
      this.modalOpenPos = { top, left }
      this.isCreateBoard = true
    },
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
    bgColor() {
      if (this.board) {
        return this.board.style.headerClr
      }
      return '#026aa7'
    }
  },
  unmounted() { },
};
</script>
<style>

</style>