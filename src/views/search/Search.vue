<template>
  <div id="search">
    <!--start 头部 header-->
    <header>
      <layoutNav :left="3" :center="18" :right="3">
        <div slot="center">
          <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
        </div>
      </layoutNav>
    </header>
    <!--end 头部 header-->
  </div>
</template>

<script>
import layoutNav from "components/content/layoutnav/layoutNav";

export default {
  name: "search",
  components: {
    layoutNav
  },
  data() {
    return {
      value: ""
    };
  }
};
</script>

<style scoped>
.van-search {
  padding: 0;
}
</style>