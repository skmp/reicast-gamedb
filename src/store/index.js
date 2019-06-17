import Vue from 'vue'
import Vuex from 'vuex'

import window from './window/'
import routing from './routing'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default new Vuex.Store({
  modules: {
    window,
    routing
  }
})
