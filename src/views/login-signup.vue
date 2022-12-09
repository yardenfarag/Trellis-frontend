<template>
  <section class="login flex column align-center">
    <div class="logo flex align-center">
      <img src="https://res.cloudinary.com/trellis22/image/upload/v1670572828/rqavx4mjpsvyj7nxewyw.png">
      <h1>Trellis</h1>
    </div>

    <!-- <section v-if="user">
      <h1>Hello, {{ user.fullname }}</h1>
      <h1>Welcome to Trellis</h1>
      <div class="actions flex align-center">
        <router-link :to="'/user/' + user._id">
          <button>Profile</button>
        </router-link>
        <button @click="logout">Logout</button>
      </div>
      <router-link to="/board">Go to boards</router-link>
    </section> -->

    <article className="login-signup flex column align-center">
      <section class="log-in">
        <p>Log in to Trellis</p>
        <form class="login-form flex column align-center" @submit.prevent="login">
          <input required type="text" v-model="credentials.username" placeholder="Username" />
          <input required type="password" v-model="credentials.password" placeholder="Password" />
          <button class="login-btn">Continue</button>
        </form>
      </section>
      <section class="sign-up">
        <h5>OR</h5>
        <p>Sign up</p>
        <form class="login-form flex column align-center" @submit.prevent="signup">
          <input required type="text" v-model="signupInfo.fullname" placeholder="Full name" />
          <input required type="text" v-model="signupInfo.username" placeholder="Username" />
          <input required type="password" v-model="signupInfo.password" placeholder="Password" />
          <!-- <input type="text" v-model="signupInfo.imgUrl" placeholder="image URL"> -->
          <div class="upload-photo flex align-center">
            <imgUploader class="login-btn" :str="uploadTxt" @uploaded="setImgUrl"></imgUploader>
            <div class="preview-img">
              <img :src="signupInfo.imgUrl" alt="preview">
            </div>
          </div>
          <button class="login-btn">Sign up</button>
        </form>
      </section>
    </article>
    <div class="bg-img">
      <img class="left-img" src="../assets/left-loginsignup-hero.svg" />
      <img class="right-img" src="../assets/right-loginsignup-hero.svg" />
    </div>
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
      uploadTxt: 'Upload profile picture',
      credentials: {
        username: '',
        password: '',
      },
      signupInfo: {
        fullname: '',
        username: '',
        password: '',
        imgUrl: 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png',
      }
    };
  },
  created() { },
  methods: {
    setImgUrl(imgUrl) {
      this.signupInfo.imgUrl = imgUrl
    },
    logout() {
      this.$store.dispatch({ type: 'logout' })
      this.user = null
    },
    async login() {
      if (!this.credentials.username || !this.credentials.password) return
      try {
        await this.$store.dispatch({ type: 'login', userCred: this.credentials })
        this.$router.push('/board')
        this.credentials = {
          username: '',
          password: '',
        }
      } catch (err) {
        throw err
      }
    },
    async signup() {
      if (!this.signupInfo.fullname || !this.signupInfo.username || !this.signupInfo.password) return
      try {
        await this.$store.dispatch({ type: 'signup', userCred: this.signupInfo })
        this.$router.push('/board')
        this.signupInfo = {
          fullname: '',
          username: '',
          password: '',
          imgUrl: '',
        }
      } catch (err) {
        throw err
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