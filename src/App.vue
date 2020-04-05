<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view></router-view>
    </keep-alive>

    <TabBar />
  </div>
</template>

<script>
import TabBar from "components/content/tabbar/TabBar";

export default {
  name: "App",
  components: {
    TabBar
  }
};
</script>
<style>
@import "assets/css/normalize.css";
</style>
