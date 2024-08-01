import { createRouter, createWebHistory } from "vue-router";
import Main from "../vue/pages/Main";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home-page",
      component: Main,
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/home-page",
    },
  ],
});

export default router;
