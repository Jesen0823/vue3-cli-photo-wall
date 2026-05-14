import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () =>
      import(/* webpackChunkName: "index" */ '../views/MainIndex.vue')
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
