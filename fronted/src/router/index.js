import { createRouter, createWebHistory } from 'vue-router'

import Index from '../assets/views/Index.vue'
import Login from '../assets/views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    meta: { requiresAuth: true } // 表示需要登录才能访问
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
