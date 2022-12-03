<!-- :style="{ background: board.style.bgc || 'white' }" -->
<template>
  <header v-if="board" :style="{ backgroundColor: board.style.headerClr }" class="app-header flex align-center">
    <div class="dark"></div>
    <section class="header-nav flex align-center">
      <div class="logo flex align-center">
        <img src="../../../public/favicon.ico" alt="">
        <h2>Trellis</h2>
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
    }
  },
  unmounted() { },
};
</script>
<style>

</style>