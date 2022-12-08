<template>
  <section class="flex column align-center">
    <div class="logo">
      <h1> <span></span> Trellis</h1>
    </div>
    <section v-if="user">
      <h1>Hello, {{ user.fullname }}</h1>
      <h1>Welcome to Trellis</h1>
      <div class="actions flex align-center">
        <router-link :to="'/user/' + user._id">
          <button>Profile</button>
        </router-link>
        <button @click="logout">Logout</button>
      </div>
      <router-link to="/board">Go to boards</router-link>
    </section>
    <section v-else>
      <article className="login-signup">
        <p>Login</p>
        <form @submit.prevent="login">
          <input type="text" v-model="credentials.username" placeholder="username" />
          <input type="password" v-model="credentials.password" placeholder="password" />
          <button>Login</button>
        </form>
        <p>Sign up</p>
        <form @submit.prevent="signup">
          <input type="text" v-model="signupInfo.fullname" placeholder="full name" />
          <input type="text" v-model="signupInfo.username" placeholder="username" />
          <input type="password" v-model="signupInfo.password" placeholder="password" />
          <input type="text" v-model="signupInfo.imgUrl" placeholder="image URL">
          <imgUploader :str="uploadTxt"></imgUploader>
          <button>Sign up</button>
        </form>
        <router-link to="/board">Continue in guest mode</router-link>
      </article>
    </section>
  </section>
</template>
<script>
import imgUploader from '../cmps/img-uploader.vue'
export default {
  name: 'login-signup',
  components: {
    imgUploader
  },
  data() {
    return {
      uploadTxt: 'Upload image',
      credentials: {
        username: '',
        password: '',
      },
      signupInfo: {
        fullname: '',
        username: '',
        password: '',
        imgUrl: '',
      }
    };
  },
  created() { },
  methods: {
    logout() {
      this.$store.dispatch({ type: 'logout' })
      this.user = null
    },
    login() {
      this.$store.dispatch({ type: 'login', userCred: this.credentials })
      this.credentials = {
        username: '',
        password: '',
      }
    },
    signup() {
      this.$store.dispatch({ type: 'signup', userCred: this.signupInfo })
      this.signupInfo = {
        fullname: '',
        username: '',
        password: '',
        imgUrl: '',
      }
    },
  },
  computed: {
    user() {
      const user = this.$store.getters.loggedinUser
      if (user?._id) {
        return user
      } else return null
    },
  },
  unmounted() { },
};
</script>
<style>

</style>