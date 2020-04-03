<template>
  <div class="homeSearch.vue">
    <layoutNav :left="1" :center="22" :right="1">
      <div slot="center">
        <van-search v-model="value" placeholder="搜索" shape="round" />
      </div>
    </layoutNav>
  </div>
</template>

<script>
import layoutNav from "components/content/layoutnav/layoutNav";

export default {
  name: "homesearch",
  components: {
    layoutNav
  },
  data() {
    return {
      value:""
    }
  },
};
</script>

<style scoped>
</style>