import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./plugins/vant.js";
import vuetify from "./plugins/vuetify";
import "swiper/css/swiper.css";
import "./mock/home";
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload);
Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
