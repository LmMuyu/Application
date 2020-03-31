<template>
  <div class="displaybar">
    <displayPosts v-for="(item, index) in paste" :key="index" :pastedata="item" class="posts" />
  </div>
</template>

<script>
import displayPosts from "./displayPosts";

export default {
  name: "displaybar",
  props: {
    paste: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    displayPosts
  }
};
</script>

<style scoped>
.posts{
  margin-top: 10px;
}
</style>