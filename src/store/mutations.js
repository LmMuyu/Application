import { ICONSTATUS, USERINFO, FAVORITEPOST } from "./mutations-types";

export default {
  [ICONSTATUS](state, payload) {
    if (payload) {
      state.iconStatus = true;
    } else {
      state.iconStatus = false;
    }
  },
  [USERINFO](_state, payload) {
    localStorage.setItem("user", JSON.stringify(payload));
  },
  [FAVORITEPOST](state, payload) {
    let userinfo = state.user; //登录用户
    userinfo.collect.unshift(payload); //收藏

    localStorage.setItem("user", JSON.stringify(userinfo)); //重新向localStorage添加用户
  },
};
