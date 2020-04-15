import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Home = () => import("views/home/Home");

const Detail = () => import("views/detail/Detail");
const DetailPubilsh=()=>import("views/detail/childcomps/DateilPublish")

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
    component: Detail,
    children:[
      {
        path:"pubilsh",
        name:"pubilsh",
        component:DetailPubilsh
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach((to, _from, next) => {
  next();
});

export default router;
