import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/components/Home.vue'
import WtsPhoto from '/src/components/WtsPhoto.vue'
import WtsMaterial from '/src/components/WtsMaterial.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/photo',
        name: 'Photo',
        component: WtsPhoto,
    },
    { 
        path: '/material/:id',
        name: 'material',
        component: WtsMaterial
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router