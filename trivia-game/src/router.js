import { createRouter, createWebHistory } from "vue-router";
import Start from "./views/Start.vue"

const routes = [
    {
        path: "/",
        component: Start,
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})