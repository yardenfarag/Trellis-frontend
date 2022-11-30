import Vuex from 'vuex'

import { userStore } from './modules/user.store.js'
// import { carStore } from './car.store.js'
// import { reviewStore } from './modules/review.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    // carStore,
    // reviewStore
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
