import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Inscription from '@/views/Inscription.vue'
import MyHabits from '@/views/MyHabits.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: Inscription,
    },
    {
      path: '/MyHabits',
      name: 'MyHabits',
      component: MyHabits,
    },
  ],
})

export default router
