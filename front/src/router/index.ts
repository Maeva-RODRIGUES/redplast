import { createRouter, createWebHistory } from 'vue-router'
import Protocols from '@/components/Protocols.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  
    {
    path: '/',
    name: 'Protocols',
    component: Protocols,
  },
  ],
})

export default router
