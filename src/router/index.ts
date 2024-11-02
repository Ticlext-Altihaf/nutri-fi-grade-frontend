import { createRouter, createWebHistory } from 'vue-router'
import QuaggaScannerView from '../views/QuaggaScannerView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'camera',
      component: QuaggaScannerView,
    },
  ],
})

export default router
