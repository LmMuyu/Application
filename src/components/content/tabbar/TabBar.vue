<template>
  <div class="tabbar">
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="home-o" @click="Router('/home')">首页</van-tabbar-item>
      <van-tabbar-item name="search" icon="search">标签</van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item name="setting" icon="contact" @click="Router('/file')">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  data() {
    return {
      active: "home"
    };
  },
  methods: {
    Router(path) {
      this.$router
        .push({
          path
        })
        .catch(err => {
          err;
        });
    }
  }
};
</script>

<style scoped>
</style>