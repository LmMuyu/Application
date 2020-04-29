import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);
const state = {
  iconStatus: false,
  user: JSON.parse(localStorage.getItem("user")) || false, //用户信息
  token: JSON.parse(localStorage.getItem("token")) || false,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {},
});
