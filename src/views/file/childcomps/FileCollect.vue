<template>
  <div class="collect">
    <layoutNav class="nav">
      <div slot="left">
        <div class="left" @click="back">
          <img src="~assets/image/file/return.svg" alt />
        </div>
      </div>
      <div slot="center" class="center">
        <span>我的收藏</span>
      </div>
      <div slot="right" class="right">
        <span class="text">编辑</span>
      </div>
    </layoutNav>
  </div>
</template>

<script>
import layoutNav from "components/content/layoutnav/layoutNav";

export default {
  name: "collect",
  components: {
    layoutNav
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.collect {
  height: 100vh;
}
.left {
  height: 100%;
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav {
  padding: 4px;
}
.center span {
  padding: 8px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.right span {
  padding: 8px;
  height: 100%;
  float: right;
}
.text {
  color: #00a8ff;
}
</style>