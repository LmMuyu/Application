<template>
  <div id="detail">
    <detailHeadColumn class="nav" />
  </div>
</template>

<script>
import detailHeadColumn from "./childcomps/detailHeadColumn.vue";

export default {
  name: "detail",
  components: {
    detailHeadColumn
  },
  data() {
    return {
      paste: {}
    };
  },
  created() {
    this.paste = this.$route.query.paste;
  }
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 99;
  background-color: #ffffff;
}
.head{
  box-shadow: 0 1px 1px #fafafa;
}
</style>