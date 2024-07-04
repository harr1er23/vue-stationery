import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Favorite from '../pages/Favorite.vue'
import Profile from '../pages/Profile.vue'

const routes = [
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

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
