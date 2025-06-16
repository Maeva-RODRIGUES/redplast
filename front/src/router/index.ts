import { createRouter, createWebHistory } from 'vue-router'
// Make sure the path is correct and the file exists
import ProtocolList from '../components/ProtocolList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  
    {
    path: '/',
    name: 'Protocols',
    component: ProtocolList ,
  },
  ],
})

export default router
