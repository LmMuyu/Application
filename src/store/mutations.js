import {
  DELETECOLLECT,
  FAVORITEPOST,
  DELETELOGIN,
  ICONSTATUS,
  STOREPOST,
  USERINFO,
} from "./mutations-types";

export default {
  [ICONSTATUS](state, payload) {
    payload ? (state.iconStatus = true) : (state.iconStatus = false);
  },
  [USERINFO](_state, payload) {
    localStorage.setItem("user", JSON.stringify(payload));
  },
  [FAVORITEPOST](state, payload) {
    let userinfo = state.user; //登录用户
    userinfo.collect.unshift(payload); //收藏

    localStorage.setItem("user", JSON.stringify(userinfo)); //重新向localStorage添加用户
  },
  [DELETECOLLECT](state, payload) {
    let collect = state.user;
    collect.collect.splice(payload, 1);

    localStorage.getItem("user", JSON.stringify(collect));
  },
  //退出登录
  [DELETELOGIN](state) {
    state.user = state.token = false; //清空登录信息
    localStorage.clear(); //清空游览器登录信息
  },
  [STOREPOST](state, payload) {
    state.storepost = payload;
  },
};
