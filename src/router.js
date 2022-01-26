import { createRouter, createWebHistory } from "vue-router";
import Start from './views/Start.vue';
import Question from './views/Question.vue';
import Result from './views/Result.vue';


const routes = [
    {
        path: "/",
        component: Start,
    },
    {
        path: "/questions",
        component: Question,
    },
    {
        path: "/result",
        component: Result

    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})