import { ICONSTATUS } from "./mutations-types";

export default {
  [ICONSTATUS](state, payload) {
    if (payload) {
      state.iconStatus = true;
    } else {
      state.iconStatus = false;
    }
  },
};
