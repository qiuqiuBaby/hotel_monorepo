import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'settledMerchants',
      component: () => import('@/views/SettledMerchants.vue')
    }
  ]
})

export default router
