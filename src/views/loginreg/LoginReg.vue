<template>
  <div id="loginreg">
    <layoutNav class="nav">
      <div slot="left" class="left">
        <div class="image" @click="Router">
          <img src="~assets/image/loginreg/return.svg" alt />
        </div>
      </div>
      <div slot="center" class="center">
        <div>{{position}}</div>
      </div>
    </layoutNav>
    <router-view></router-view>
  </div>
</template>

<script>
import layoutNav from "components/content/layoutnav/layoutNav";

export default {
  name: "loginreg",
  components: {
    layoutNav
  },
  computed: {
    position() {
      const path = this.$route.path.split("/")[2];
      let title = "";
      if (path === "LR1") {
        title += "登录";
      } else {
        title += "注册";
      }
      return title;
    }
  },
  methods: {
    Router() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
#loginreg {
  height: 100vh;
  position: relative;
  z-index: 999;
  background: #ffffff;
}
.left {
  display: flex;
  align-items: center;
}
.image {
  height: 100%;
  width: 48px;
}
.nav {
  padding: 4px;
}
.center {
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>