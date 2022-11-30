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
          <button>Create</button>
        </div>

        <div class="end-section flex align-center">
          <input type="text" placeholder="Search">
          <button>🔔</button>
          <button>🐭</button>
        </div>

      </div>
    </section>
  </header>
</template>
<script>
export default {
  name: 'app-header',
  components: {},
  data() {
    return {};
  },
  created() { },
  methods: {},
  computed: {},
  unmounted() { },
};
</script>
<style>

</style>