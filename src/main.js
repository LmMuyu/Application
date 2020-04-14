import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./plugins/vant.js";
import vuetify from "./plugins/vuetify";
import "swiper/css/swiper.css";
import "./mock/index";
import VueLazyload from "vue-lazyload";
import Animate from "animate.css";
import FastClick from "fastclick";

FastClick.attach(document.body);
Vue.use(VueLazyload);
Vue.use(Animate);
Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
