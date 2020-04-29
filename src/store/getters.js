export default {
  iconstatu(state) {
    return state.iconStatus;
  },
  userinfo(state) {
    return state.user; //用户
  },
  usercollect(state) {
    return state.user.collect; //收藏
  },
  token(state) {
    return state.token; //token令牌
  },
};
