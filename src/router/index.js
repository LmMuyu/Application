import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Home = () => import("views/home/Home");

const Detail = () => import("views/detail/Detail");
const DetailPubilsh = () => import("views/detail/childcomps/DateilPublish");

const File = () => import("views/file/File");
const Collect = () => import("views/collect/Collect");

const LoginReg = () => import("views/loginreg/LoginReg");
const Login = () => import("views/loginreg/childcomps/Login");
const Registered = () => import("views/loginreg/childcomps/Registered");

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/detail",
    name: "detail",
    component: Detail,
    children: [
      {
        path: "pubilsh",
        name: "pubilsh",
        component: DetailPubilsh,
      },
    ],
  },
  {
    path: "/file",
    name: "file",
    component: File,
    children: [
      {
        path: "collect",
        name: "collect",
        component: Collect,
      },
    ],
  },
  {
    path: "/loginreg",
    name: "loginreg",
    redirect: "/loginreg/LR1",
    component: LoginReg,
    children: [
      {
        path: "LR1",
        name: "login",
        component: Login,
      },
      {
        path: "LR2",
        name: "registered",
        component: Registered,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (to.path === "/loginreg/LR1" || to.path === "/loginreg/LR2") {
    token ? next(false) : next();
  } else {
    next();
  }
});

export default router;
