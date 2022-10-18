import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../components/HomePage";
import TaskPage from "../components/TaskPage";
import TaskEditPage from "../components/TaskEditPage.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
    },
    {
        path: "/task/:id",
        name: "TaskPage",
        component: TaskPage,
    },
    {
        path: "/task-edit/:id",
        name: "TaskEditPage",
        component: TaskEditPage,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;