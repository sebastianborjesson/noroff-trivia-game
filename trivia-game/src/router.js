import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from './components/HelloWorld.vue';
const routes = [
    {
        path: "/",
        component: HelloWorld,
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})