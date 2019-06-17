import * as routerHelpers from './functions'

const routes = [
  {
    path: '/',
    component: () => import('layouts/Jadzia.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/games',
    component: () => import('pages/Games.vue'),
    props: routerHelpers.queryFilters,
    beforeEnter: (to, from, next) => {
      const sanitizeCats = routerHelpers.sanitizeCategories(to.query.category)
      const statusWasInvalid = routerHelpers.isInvalidStatus(to.query.status)
      const catsWereSanitized = sanitizeCats.hasOwnProperty('categories')
      if (catsWereSanitized || statusWasInvalid) {
        if (catsWereSanitized) {
          to.query.category = sanitizeCats.categories
        }
        if (statusWasInvalid) {
          to.query.status = ''
        }
        next({ path: to.path, query: { category: to.query.category, status: to.query.status } })
      }
      next()
    }
  },
  {
    path: '/games/:id',
    component: () => import('layouts/Jadzia.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Game.vue'),
        props: routerHelpers.gameListData
      }
    ],
    meta: {
      isGame: true
    }
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
