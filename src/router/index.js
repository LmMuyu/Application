import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Home = () => import("views/home/Home.vue");
const Official = () => import("views/home/plate/Official.vue");

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    children: [
      {
        path:""
      }
    ],
    components: {
      default: Home,
      Official
    }
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
