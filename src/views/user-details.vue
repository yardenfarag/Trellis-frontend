<template>
  <section v-if="user" class="flex column align-center">
    <h1>User Details - {{ user.fullname }}</h1>
    <img style="max-width: 200px;" :src="user.imgUrl" />
    <details>
      <summary>Full JSON</summary>
      <pre>{{ user }}</pre>
    </details>
  </section>
</template>

<script>
// import {userService} from '../services/user.service'

export default {
  data() {
    return {
      // user: null
    }
  },
  async created() {
    // const user = await userService.getById(id)
    // this.user = user
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser
    },
    userId() {
      return this.$route.params.id
    },
  },
}
</script>