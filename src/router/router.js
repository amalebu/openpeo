import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/page/Home.vue'


const routes = [
  { path: '/', name:'home', component: Home },
  { path: '/cart', name:'cart', component: () => import('@/page/Cart.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 })
      }, 500)
    })
  },
})

export default router