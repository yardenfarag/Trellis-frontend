<template>
  <section class="container home text-center">
    <h1>Home Page!!</h1>
    <router-link to="/board">Board list</router-link>
    <hr>
    <router-link to="/login">Login / Signup</router-link>
    <h5 class="text-center">
      Powered up Frontend
    </h5>
  </section>


</template>

<script>
export default {
  name: 'home',
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
  }

}
</script>
