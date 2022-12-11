
<template>
  <header @click.stop="closeModals" :style="{ backgroundColor: bgColor }" class="app-header flex align-center">
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
            <button @click.stop="openModal($event, 'recent')" class="recent"><span>Recent</span>
              <span class="material-symbols-outlined">
                keyboard_arrow_down
              </span></button>
            <button @click.stop="openModal($event, 'starred')" class="starred"><span>Starred</span><span
                class="material-symbols-outlined">
                keyboard_arrow_down
              </span> </button>
          </div>

          <button class="opacity-input create" @click.stop="openModal($event, 'create')">Create</button>
          <button class="opacity-input create-small" @click.stop="openModal($event, 'create')"></button>
        </div>

        <div class="end-section flex align-center">
          <button class="search">Search</button>
          <button class="search-small"></button>
          <!-- <input v-model="filterBy.txt" type="search" placeholder="Serach Trellis">

          <section class="modal-container">
            <section v-if="filterBy.txt" class="small-modal-container recent">
              <section class="small-modal-body">
                <ul class="small-modal-list">
                  <li @click="goToDetails(board)" v-for="board in boards" class="small-modal-li">
                    <div class="li-content">
                      <div class="board-cover"
                        :style="{ background: board.style.preview ? board.style.preview : board.style.bgc, backgroundSize: 'cover' }">
                      </div>
                      <div class="board-info">
                        <div class="board-info-title">{{ board.title }}</div>
                        <div class="board-info-team">A Team</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </section>
            </section>
          </section> -->

          <button class="notifications"></button>
          <img @click.stop="isUserModal = !isUserModal" v-if="loggedinUser" :src="loggedinUser.imgUrl"
            :style="{ borderRadius: 50 + '%', width: 30 + 'px', height: 30 + 'px', objectFit: 'cover' }">
        </div>

      </div>
    </section>
  </header>
  <boardCreateModal :pos="modalOpenPos" @closeModal=closeModals v-if="isCreateBoard" />
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
      filterBy: {
        txt: '',
      },
      isRecentBoards: false,
      isStarredBoards: false,
      isCreateBoard: false,
      isUserModal: false,
      modalOpenPos: null
    };
  },
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
  },
  methods: {
    async goToDetails(board) {
      const currBoard = JSON.parse(JSON.stringify(board))
      currBoard.recentlyViewed = Date.now()
      await this.$store.dispatch({ type: 'saveBoard', board: currBoard })
      await this.$router.push('/board/' + board._id)
      location.reload()
    },
    closeModals(){
      this.isRecentBoards = false
        this.isStarredBoards = false
        this.isCreateBoard = false
        this.isUserModal = false
    },
    openModal(ev, modal) {

      const elPos = ev.target.getBoundingClientRect()
      const top = elPos.top + elPos.height + 8
      const left = elPos.left
      this.modalOpenPos = { top, left }

      if (modal === 'recent') {
        if (this.isRecentBoards) return this.isRecentBoards = false
        this.isRecentBoards = true
        this.isStarredBoards = false
        this.isCreateBoard = false
        this.isUserModal = false
      }
      if (modal === 'starred') {
        if (this.isStarredBoards) return this.isStarredBoards = false 
        this.isRecentBoards = false
        this.isStarredBoards = true
        this.isCreateBoard = false
        this.isUserModal = false
      }
      if (modal === 'create') {
        if (this.isCreateBoard) return this.isCreateBoard = false
        this.isRecentBoards = false
        this.isStarredBoards = false
        this.isCreateBoard = true
        this.isUserModal = false
      }
      if (modal === 'user') {
        if (this.isUserModal) return  this.isUserModal = false
        this.isRecentBoards = false
        this.isStarredBoards = false
        this.isCreateBoard = false
        this.isUserModal = true
      }
    },
  },
  computed: {
    boards() {
      const boards = this.$store.getters.boards
      if (this.filterBy.txt) {
        const regex = new RegExp(this.filterBy.txt, 'i')
        boards.filter(board => regex.test(board.title))
      }
      return boards
    },
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