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
          <button class="recent"><span>Recent</span>
            <span class="material-symbols-outlined">
              keyboard_arrow_down
            </span></button>

          <button class="starred"><span>Starred</span><span class="material-symbols-outlined">
              keyboard_arrow_down
            </span> </button>
          <button class="opacity-input" @click="isCreateBoard = !isCreateBoard">Create</button>
        </div>

        <div class="end-section flex align-center">
          <button class="search">Search</button>
          <button class="notifications"></button>
          <img :src="loggedinUser.imgUrl" :style="{ borderRadius: 50 + '%', width: 30 + 'px', height: 30 + 'px' }">
        </div>

      </div>
    </section>
  </header>
  <boardCreateModal @closeModal="isCreateBoard = false" v-if="isCreateBoard" />
</template>
<script>
import boardCreateModal from '../board-cmps/board-header-cmps/board-create-modal.cmp.vue';
export default {
  name: 'app-header',
  components: {
    boardCreateModal
  },
  data() {
    return {
      isCreateBoard: false
    };
  },
  async created() {
    await this.$store.dispatch({ type: 'getLoggedinUser' })
  },
  methods: {},
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