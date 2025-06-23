import { createRouter, createWebHistory } from 'vue-router';
import ProtocolList from '../components/ProtocolList.vue';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Protocols',
            component: ProtocolList,
        },
    ],
});
export default router;
