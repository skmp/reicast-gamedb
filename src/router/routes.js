
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
    component: () => import('pages/Games.vue')
  },
  {
    path: '/games/:id',
    component: () => import('layouts/Jadzia.vue'),
    children: [
      { path: '', component: () => import('pages/Game.vue') },
      { path: 'reports', component: () => import('pages/GameReports.vue') }
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
