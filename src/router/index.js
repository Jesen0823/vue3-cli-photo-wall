import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: { path: 'wallMark', query: { id: '0' } },
    name: 'index',
    component: () =>
      import(/* webpackChunkName: "index" */ '../views/MainIndex.vue'),
    children: [
      {
        path: 'wallMark',
        name: 'wallMessage',
        component: () =>
          import(
            /* webpackChunkName: "index_WallMessage" */ '../views/WallMessage.vue'
          )
      }
    ]
  },
  {
    path: '/icon',
    name: 'iconDemo',
    component: () =>
      import(/* webpackChunkName: "index" */ '../views/IconDemo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
