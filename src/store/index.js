import Vue from 'vue'
import Vuex from 'vuex'

import layout from './modules/layout'

import { createStore } from 'vuex-extensions';
import createCache from 'vuex-cache';

Vue.use(Vuex)

export default createStore(Vuex.Store, {
  plugins: [createCache()],
  state: {

  },
  mutations: {
  },
  actions: {
  },
  getters: {

  },
  modules: {
    layout: layout,

  }
})
