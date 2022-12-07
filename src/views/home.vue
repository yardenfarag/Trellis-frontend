<template>
  <div class="main-home-header">
  <header class="home-header flex space-between">
      <div class="logo flex ">
        <router-link class="router-link" to="/board">
          <h2 class="main-logo">Trellis</h2>
        </router-link>
      </div>
      <ul class="header-nav flex clean-list">
        <li><router-link to="/login">Login / Signup</router-link></li> 
        <li class="demo-li flex"><router-link class="demo" to="/Board">Start Demo</router-link></li>
      </ul>
    </header>
  </div>

  <section class="main-home main-layout flex column">
    

    <section class="home-hero flex column align-center full">
      <div class="hero-content">
        <h1>Trellis brings all your tasks, teammates, and tools together</h1>
        <h3>Keep everything in the same place — even if your team isn’t.</h3>
        <button><router-link to="/board">Check this out!</router-link></button>
      </div>
      <img src="../assets/styles/Imgs/2022-12-04 14_13_23-Trellis _ Trello.png" alt="">
    </section>

    <section class="trello-101 full flex column">
      <h4>Trellis 101</h4>
      <h2>A productivity powerhouse</h2>
      <p>Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing
        what and what needs to get done. Learn more in our guide for getting started.</p>
      <div class="cards-101-section flex">
        <div class="cards-101">
          <button :class="isCard1" @click="cardClicked101(1)" class="card">
          <div>
          <h3>Boards</h3>
          <p>Trello boards keep tasks organized and work moving forward. In a glance, see everything from “things to do”
            to “aww yeah, we did it!”</p>
          </div>
          <div  v-if="isCard1Select" class="side-border"></div>
        </button>
        <button :class="isCard2" @click="cardClicked101(2)" class="card">
          <div>
          <h3>Lists</h3>
          <p>The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to
            your team’s needs. There’s no wrong way to Trello.</p>
          </div>
            <div  v-if="isCard2Select" class="side-border"></div>
        </button>
        <button :class="isCard3" @click="cardClicked101(3)" class="card">
            <h3>Cards</h3>
            <p>Cards represent tasks and ideas and hold all the information to get the job done. As you make progress,
              move
              cards across lists to show their status.</p>
              <div v-if="isCard3Select" class="side-border"></div>
            </button>
      </div>
        <div class="101-imgs">
          <img src="../assets/styles/Imgs/2022-12-04 14_13_23-Trellis _ Trello.png" alt="">
        </div>
      </div>
    </section>

    <section class="trello-action flex column">
      <p>TRELLO IN ACTION</p>
      <h2>Workflows for any project, big or small</h2>

      <div class="action-cards flex">
        <div class="card">
          <div class="action-card-header" style="background-color: #f79376"></div>
          <div class="action-card-content">
            <h3>Project management</h3>
            <p>Keep tasks in order, deadlines on track, and team members aligned with Trello.</p>
          </div>
        </div>
        <div class="card">
          <div class="action-card-header" style="background-color: #88e0f1"></div>
          <div class="action-card-content">
            <h3>Brainstorming</h3>
            <p>Unleash your team’s creativity and keep ideas visible, collaborative, and actionable.</p>
          </div>
        </div>
        <div class="card">
          <div class="action-card-header" style="background-color: #88f1c0"></div>
          <div class="action-card-content">
            <h3>Meetings</h3>
            <p>Empower your team meetings to be    more productive, empowering, and dare we say—fun.</p>
          </div>
        </div>
        <div class="card">
          <div class="action-card-header" style="background-color: #fbe485"></div>
          <div class="action-card-content">
            <h3>Task management</h3>
            <p>Use Trello to track, manage, complete, and bring tasks together like the pieces of a puzzle, and make your team’s projects a cohesive success every time.</p>
          </div>
        </div>
        <div class="card">
          <div class="action-card-header" style="background-color: #45c5e3"></div>
          <div class="action-card-content">
            <h3>CRM</h3>
            <p>Customize your CRM to help your sales team manage their leads and accounts effectively.</p>
          </div>
        </div>
        <div class="card">
          <div class="action-card-header" style="background-color: #8a76d7"></div>
          <div class="action-card-content">  
            <h3>Editorial calendar</h3>
            <p>Use Trello as your team’s go-to command center for content curation, revisions, handoff, and publishing.</p>
          </div>
        </div>
      </div>

      <div class="action-bottom flex space-between">
        <p>No need to start from scratch. Jump-start your workflow with a proven playbook designed for different teams. Customize it to make it yours.</p>
        <a>Lets Explore this all!</a>
      </div>
    </section>
  </section>

  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item>
      <div class="card">
          <div class="action-card-header" style="background-color: #8a76d7"></div>
          <div class="action-card-content">  
            <h3>Editorial calendar</h3>
            <p>Use Trello as your team’s go-to command center for content curation, revisions, handoff, and publishing.</p>
          </div>
        </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="card">
          <div class="action-card-header" style="background-color: #8a76d7"></div>
          <div class="action-card-content">  
            <h3>Editorial calendar</h3>
            <p>Use Trello as your team’s go-to command center for content curation, revisions, handoff, and publishing.</p>
          </div>
        </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="card">
          <div class="action-card-header" style="background-color: #8a76d7"></div>
          <div class="action-card-content">  
            <h3>Editorial calendar</h3>
            <p>Use Trello as your team’s go-to command center for content curation, revisions, handoff, and publishing.</p>
          </div>
        </div>
    </el-carousel-item>
  </el-carousel>

</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      isCard1Select: true,
      isCard2Select: false,
      isCard3Select: false,
    }
  },
  computed: {
    isCard1(){
      if(this.isCard1Select) return 'card-selected'
    },
    isCard2(){
      if(this.isCard2Select) return 'card-selected'
    },
    isCard3(){
      if(this.isCard3Select) return 'card-selected'
    },
  },
  created() {
  },
  methods: {
    cardClicked101(val){
      if(val === 1) {
        this.isCard1Select = true
        this.isCard2Select = false
        this.isCard3Select = false
      }
      if(val === 2) {
        this.isCard1Select = false
        this.isCard2Select = true
        this.isCard3Select = false
      }
      if(val === 3) {
        this.isCard1Select = false
        this.isCard2Select = false
        this.isCard3Select = true
      }
    }
  }

}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
