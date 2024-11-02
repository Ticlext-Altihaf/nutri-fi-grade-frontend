import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VueBarcodeCameraView from '../views/VueBarcodeCameraView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'camera',
      component: VueBarcodeCameraView,
    },
  ],
})

export default router
