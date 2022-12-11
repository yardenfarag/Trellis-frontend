<template>
  <div class="main-home-header">
    <header class="home-header flex space-between">
      <div class="logo logo-home flex ">
        <router-link class="router-link" to="/board">
          <h2 class="main-logo main-logo-home">Trellis</h2>
        </router-link>
      </div>
      <ul class="header-nav-home flex clean-list">
        <li>
          <router-link to="/login">Login / Signup</router-link>
        </li>
        <li class="demo-li flex">
          <router-link class="demo" to="/Board">Start Demo</router-link>
        </li>
      </ul>
    </header>
  </div>

  <section class="main-home main-layout flex column">


    <section class="home-hero flex column align-center full">
      <div class="hero-content">
        <h1>Trellis brings all your tasks, teammates, and tools together</h1>
        <h3>Keep everything in the same place — even if your team isn’t.</h3>
        <button>
          <router-link to="/board">Start Demo</router-link>
        </button>
      </div>
      <img src="https://res.cloudinary.com/trellis22/image/upload/v1670494972/ipby6adf3dgntlrmszgr.png" alt="">
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
              <p>Trello boards keep tasks organized and work moving forward. In a glance, see everything from “things to
                do”
                to “aww yeah, we did it!”</p>
            </div>
            <div v-if="isCard1Select" class="side-border"></div>
          </button>
          <button :class="isCard2" @click="cardClicked101(2)" class="card">
            <div>
              <h3>Lists</h3>
              <p>The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit
                to
                your team’s needs. There’s no wrong way to Trello.</p>
            </div>
            <div v-if="isCard2Select" class="side-border"></div>
          </button>
          <button :class="isCard3" @click="cardClicked101(3)" class="card">
            <h3>Cards</h3>
            <p>Cards represent tasks and ideas and hold all the information to get the job done. As you make progress,
              move
              cards across lists to show their status.</p>
            <div v-if="isCard3Select" class="side-border"></div>
          </button>
        </div>
        <div class="imgs-101">
          <img v-if="isCard1Select"
            src="https://res.cloudinary.com/trellis22/image/upload/v1670495093/lct3teodje75igsgcgkb.png" alt="">
          <img v-if="isCard2Select"
            src="https://res.cloudinary.com/trellis22/image/upload/v1670498276/afpnu0hcogho9sarj5ut.png" alt="">
          <img v-if="isCard3Select"
            src="https://res.cloudinary.com/trellis22/image/upload/v1670495093/lct3teodje75igsgcgkb.png" alt="">
        </div>
      </div>
    </section>

    <section class="trello-action flex column">
      <div class="action-content flex column">
        <p>TRELLO IN ACTION</p>
        <h2>Workflows for any project, big or small</h2>
      </div>

      <div class="carousel-buttons flex">
        <button @click="setCarouselSide('right')" class="right"></button>
        <button @click="setCarouselSide('left')" class="left"></button>
      </div>

      <div :class="carouselSide" class="action-cards flex">
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
            <p>Empower your team meetings to be more productive, empowering, and dare we say—fun.</p>
          </div>
        </div>
        <div class="card">
          <div class="action-card-header" style="background-color: #fbe485"></div>
          <div class="action-card-content">
            <h3>Task management</h3>
            <p>Use Trello to track, manage, complete, and bring tasks together like the pieces of a puzzle, and make
              your team’s projects a cohesive success every time.</p>
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
            <p>Use Trello as your team’s go-to command center for content curation, revisions, handoff, and publishing.
            </p>
          </div>
        </div>
      </div>

      <div class="action-bottom flex space-between">
        <p>No need to start from scratch. Jump-start your workflow with a proven playbook designed for different teams.
          Customize it to make it yours.</p>
        <a class="home-a">Lets Explore this all!</a>
      </div>
    </section>

    <section class="see-work flex column align-center full">
      <div class="see-work-content">
        <h2>See work in a whole new way</h2>
        <p>View your team’s projects from every angle and bring a fresh perspective to the task at hand.</p>
        <a class="home-a">Discover all Trellis views</a>
      </div>

      <div class="callout flex justify-center">
        <div class="callout-img">
          <img src="https://res.cloudinary.com/trellis22/image/upload/v1670495478/aqvgu8kmaiarhayot8am.png" alt="">
        </div>
        <div class="call-out-content flex column justify-center">
          <div class="callout-title flex align-center">
            <span class="hit"></span>
            <h3>Hit deadlines every time</h3>
          </div>
          <p>From weekly sprints to annual planning, Timeline view keeps all tasks on track. Quickly get a glimpse of
            what’s coming down the pipeline and identify any gaps that might impede your team’s progress.</p>
        </div>
      </div>

      <div class="callout flex  space-between">
        <div class="call-out-content flex column justify-center">
          <div class="callout-title flex align-center">
            <span class="stay"></span>
            <h3>Stay on top of tasks</h3>
          </div>
          <p>Start each day without any surprises. Whether scheduling an editorial calendar or staying on top of to-dos,
            Calendar view is like a crystal ball giving you a clear vision of what work lies ahead.</p>
        </div>
        <div class="callout-img">
          <img src="https://res.cloudinary.com/trellis22/image/upload/v1670749077/fd6op2uca87ezwvukd4m.png" alt="">
        </div>
      </div>
    </section>

    <footer class="full flex justify-center">
      <div class="main-footer flex column">
        <div class="logo logo-home footer-logo flex ">
          <router-link class="router-link" to="/board">
            <h2 style="color: white" class="main-logo  main-logo-home">Trellis</h2>
          </router-link>
        </div>

        <div class="footer-members flex space-between">
          <div class="team-member flex align-center">
            <img src="https://res.cloudinary.com/trellis22/image/upload/v1670483306/klnvwv9pzfe7hiue3pjn.jpg" alt="">
            <div>
              <h3>Yarden Farag</h3>
              <p>Full Stack</p>
            </div>
          </div>
          <div class="team-member flex align-center">
            <img src="https://res.cloudinary.com/trellis22/image/upload/v1670484170/xjoaitrdmbp63amfy2kw.jpg" alt="">
            <div>
              <h3>Omer Mazig</h3>
              <p>Full Stack</p>
            </div>
          </div>
          <div class="team-member flex align-center">
            <img src="https://res.cloudinary.com/trellis22/image/upload/v1670482998/e1245f8zfamjjdgbvhsa.png" alt="">
            <div>
              <h3>Yotam Gross</h3>
              <p>Full Stack</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      isCard1Select: true,
      isCard2Select: false,
      isCard3Select: false,
      currentCarouselSide: 'right',
    }
  },
  computed: {
    isCard1() {
      if (this.isCard1Select) return 'card-selected'
    },
    isCard2() {
      if (this.isCard2Select) return 'card-selected'
    },
    isCard3() {
      if (this.isCard3Select) return 'card-selected'
    },
    carouselSide() {
      if (this.currentCarouselSide === 'right') return
      if (this.currentCarouselSide === 'left') return 'left'
    }
  },
  created() {
  },
  methods: {
    cardClicked101(val) {
      if (val === 1) {
        this.isCard1Select = true
        this.isCard2Select = false
        this.isCard3Select = false
      }
      if (val === 2) {
        this.isCard1Select = false
        this.isCard2Select = true
        this.isCard3Select = false
      }
      if (val === 3) {
        this.isCard1Select = false
        this.isCard2Select = false
        this.isCard3Select = true
      }
    },
    setCarouselSide(side) {
      this.currentCarouselSide = side
    }
  }

}
</script>
