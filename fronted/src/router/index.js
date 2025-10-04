import { createRouter, createWebHistory } from 'vue-router'

import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'
import Page1 from '@/views/Page1.vue'
import Page2 from '@/views/Page2.vue'
import Home from '@/views/Home.vue'
import Record from '@/views/Record.vue'
import Manage from '@/views/Manage.vue'

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
  },
  {
    path: '/page1',
    name: 'Page1',
    component: Page1,
  },
  {
    path: '/page2',
    name: 'Page2',
    component: Page2,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/record',
    name: 'Record',
    component: Record,
  },
  {
    path: '/manage',
    name: 'Manage',
    component: Manage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
