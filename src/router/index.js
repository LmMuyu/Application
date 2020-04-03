import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Home = () => import("views/home/Home");

const Detail = () => import("views/detail/Detail");

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/detail",
    name: "detail",
    component: Detail
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
