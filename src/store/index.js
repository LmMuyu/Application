import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);
const state = {
  iconStatus: false,
  user: JSON.parse(localStorage.getItem("user")) || false, //用户信息
  token: JSON.parse(localStorage.getItem("token")) || false, //token令牌
  storepost: {}, //储存每次跳转到详情页的帖子
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {},
});
