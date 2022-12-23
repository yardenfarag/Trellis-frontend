
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
          <button @click.stop="showSearchBoards" v-if="!isSearchBoards" class="search">Search</button>
          <button @click.stop="showSearchBoards" v-if="!isSearchBoards" class="search-small"></button>
          <input class="search-boards-input" ref="search" v-if="isSearchBoards" v-model="filterBy.txt" type="search"
            placeholder="Search Trellis">

          <!-- <button class="notifications"></button> -->
          <img @click.stop="isUserModal = !isUserModal" v-if="loggedinUser" :src="loggedinUser.imgUrl"
            :style="{ borderRadius: 50 + '%', width: 30 + 'px', height: 30 + 'px', objectFit: 'cover', cursor: 'pointer' }">
        </div>

      </div>
    </section>
  </header>
  <section v-if="boards.length" class="small-modal-container search-boards">
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
      isSearchBoards: false,
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
    showSearchBoards() {
      this.isSearchBoards = true
      this.isRecentBoards = false
      this.isStarredBoards = false
      this.isCreateBoard = false
      this.isUserModal = false
      this.$nextTick(() => {
        this.$refs.search.focus()
      })
    },
    async goToDetails(board) {
      const currBoard = JSON.parse(JSON.stringify(board))
      currBoard.recentlyViewed = Date.now()
      await this.$store.dispatch({ type: 'saveBoard', board: currBoard })
      await this.$router.push('/board/' + board._id)
      location.reload()
    },
    closeModals() {
      this.filterBy.txt = ''
      this.isSearchBoards = false
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
        this.isSearchBoards = false
      }
      if (modal === 'starred') {
        if (this.isStarredBoards) return this.isStarredBoards = false
        this.isRecentBoards = false
        this.isStarredBoards = true
        this.isCreateBoard = false
        this.isUserModal = false
        this.isSearchBoards = false
      }
      if (modal === 'create') {
        if (this.isCreateBoard) return this.isCreateBoard = false
        this.isRecentBoards = false
        this.isStarredBoards = false
        this.isCreateBoard = true
        this.isUserModal = false
        this.isSearchBoards = false
      }
      if (modal === 'user') {
        if (this.isUserModal) return this.isUserModal = false
        this.isRecentBoards = false
        this.isStarredBoards = false
        this.isCreateBoard = false
        this.isUserModal = true
        this.isSearchBoards = false
      }
    },
  },
  computed: {
    boards() {
      let boards = JSON.parse(JSON.stringify(this.$store.getters.boards))
      let filteredBoards
      if (this.filterBy.txt) {
        const regex = new RegExp(this.filterBy.txt, 'i')
        filteredBoards = boards.filter(board => regex.test(board.title))
      }
      if (filteredBoards) return filteredBoards
      return []
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