import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)
Vue.use(VueMeta)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */
export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,
    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    const isGame = to.matched.some(record => record.meta.isGame)
    if (isGame) {
      store.commit('routing/UPDATE', to.params.id)
    }
    next()
  })

  return Router
}
