import { ICONSTATUS, USERINFO } from "./mutations-types";

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
};
