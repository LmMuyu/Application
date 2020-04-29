<template>
  <div class="post">
    <HomePostShow
      class="postshow"
      v-for="(item, index) in list"
      :key="index"
      :PostData="item"
    />
  </div>
</template>

<script>
import HomePostShow from "./HomePostShow";

export default {
  name: "HomePost",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    HomePostShow
  }
};
</script>

<style scoped>
.postshow {
  margin-bottom: 15px;
}
</style>