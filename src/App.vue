<template>
  <div id="app">
    <keep-alive>
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
