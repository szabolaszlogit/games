import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/rps",
      name: "rps",
      component: () => import("../components/rps/RockPaperScissors.vue"),
    },
    {
      path: "/memory",
      name: "memory",
      component: () => import("../components/memory/MemoryGame.vue"),
    },
    ,
    {
      path: "/mole",
      name: "mole",
      component: () => import("../components/mole/MoleWack.vue"),
    },
  ],
});

export default router;
