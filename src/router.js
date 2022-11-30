import { createRouter, createWebHashHistory } from 'vue-router'

import home from './views/home.vue'
import boardDetails from './views/board-details.vue'
import boardList from './views/board-list.vue'
import taskDetails from './views/task-details.vue'
import loginSignup from './views/login-signup.vue'
import userDetails from './views/user-details.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/board',
    name: 'board-list',
    component: boardList
  },
  {
    path: '/board/:id',
    name: 'board-details',
    component: boardDetails
  },
  {
    path: '/task/:boardId/:groupId/:taskId',
    name: 'task-details',
    component: taskDetails
  },
  {
    path: '/login',
    name: 'loginSignup',
    component: loginSignup
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails
  }
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

