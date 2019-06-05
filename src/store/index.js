import Vue from 'vue'
import Vuex from 'vuex'

import example from './module-example'
import routing from './routing'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default new Vuex.Store({
  modules: {
    example,
    routing
  }
})
