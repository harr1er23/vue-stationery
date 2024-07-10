import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from '../layouts/AppLayout.vue'
import Home from '../pages/Home.vue'
import Favorite from '../pages/Favorite.vue'
import Profile from '../pages/Profile.vue'
import Login from '../pages/Login.vue'

const routes = [
  {
    name: 'App',
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: '/favorite',
        name: 'Favorite',
        component: Favorite
      },
      {
        path: '/category/:id',
        name: 'Category',
        component: Home
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
