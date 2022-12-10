<template>
  <section>
    <user-msg />
    <app-header v-if="!isHome" />
    <router-view />
  </section>
</template>

<script>


import { store } from './store/store'
import appHeader from './cmps/app-header-cmps/app-header.vue'
import userMsg from './cmps/user-msg.vue'
import { userService } from './services/user.service'


export default {
  created() {
    console.log('Vue App created')
    const user = userService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })
  },
  computed: {
    isHome() {
      if (this.$route.name === 'home' || this.$route.name === 'loginSignup') return true
      return false
    }
  },
  components: {
    appHeader,
    userMsg
  },
}
</script>