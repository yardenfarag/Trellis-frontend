<template>
  <header class="app-header flex align-center">
    <section class="header-nav flex align-center">
      <div class="logo flex align-center">
        <img src="../../../public/favicon.ico" alt="">
        <h2>Trellis</h2>
      </div>

      <div class="header-actions flex align-center space-between">

        <div class="start-section flex align-center">
          <button>Recent</button>
          <button>Starred</button>
          <button @click="isCreateBoard = !isCreateBoard">Create</button>
        </div>

        <div class="end-section flex align-center">
          <input type="text" placeholder="Search">
          <button>🔔</button>
          <button>🐭</button>
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
  created() { },
  methods: {},
  computed: {},
  unmounted() { },
};
</script>
<style>

</style>