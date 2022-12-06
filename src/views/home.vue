<template>
  <section class="main-home">
    
    <header class="home-header flex space-between">
      <div class="logo flex align-center">
        <router-link class="router-link" to="/board">
          <h2 class="main-logo">Trellis</h2>
        </router-link>
      </div>
      <div class="header-nav flex">
        <router-link to="/login">Login / Signup</router-link>
        <router-link class="demo" to="/Board">Start Demo</router-link>
      </div>
    </header>

    <section class="home-hero flex column align-center">
      <h1>Trellis brings all your tasks, teammates, and tools together</h1>
      <h3>Keep everything in the same place — even if your team isn’t.</h3>
      <router-link to="/board">
        <button>Check this out!</button>
      </router-link>
    </section>

    <section class="trello-101 flex column">
      <h4>TRELLO 101</h4>
      <h2>A productivity powerhouse</h2>
      <p>Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing
        what and what needs to get done. Learn more in our guide for getting started.</p>
      <div class="cards-101-section flex">
        <div class="cards-101">
        <div class="card">
          <div>
          <h3>Boards</h3>
          <p>Trello boards keep tasks organized and work moving forward. In a glance, see everything from “things to do”
            to “aww yeah, we did it!”</p>
          </div>
          <div class="side-border"></div>
        </div>
        <div class="card">
          <div>
          <h3>Lists</h3>
          <p>The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to
            your team’s needs. There’s no wrong way to Trello.</p>
          </div>
            <div class="side-border"></div>
          </div>
          <div class="card">
            <h3>Cards</h3>
            <p>Cards represent tasks and ideas and hold all the information to get the job done. As you make progress,
              move
              cards across lists to show their status.</p>
              <div class="side-border"></div>
        </div>
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
          <div class="action-card-header"></div>
          <div class="action-card-content">
            <h3>Project management</h3>
            <p>Keep tasks in order, deadlines on track, and team members aligned with Trello.</p>
          </div>
        </div>
        <div class="card">
          <div class="action-card-header"></div>
          <div class="action-card-content">
            <h3>Brainstorming</h3>
            <p>Unleash your team’s creativity and keep ideas visible, collaborative, and actionable.</p>
          </div>
        </div>
        <div class="card">
          <div class="action-card-header"></div>
          <div class="action-card-content">
            <h3>Meetings</h3>
            <p>Empower your team meetings to be    more productive, empowering, and dare we say—fun.</p>
          </div>
        </div>
        <div class="card">
          <div class="action-card-header"></div>
          <div class="action-card-content">
            <h3>Task management</h3>
            <p>Use Trello to track, manage, complete, and bring tasks together like the pieces of a puzzle, and make your team’s projects a cohesive success every time.</p>
          </div>
        </div>
        <div class="card">
          <div class="action-card-header"></div>
          <div class="action-card-content">
            <h3>CRM</h3>
            <p>Customize your CRM to help your sales team manage their leads and accounts effectively.</p>
          </div>
        </div>
        <div class="card">
          <div class="action-card-header"></div>
          <div class="action-card-content">  
            <h3>Editorial calendar</h3>
            <p>Use Trello as your team’s go-to command center for content curation, revisions, handoff, and publishing.</p>
          </div>
        </div>
      </div>
    </section>

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
