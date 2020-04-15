<template>
  <div class="displaybar">
    <displayPosts
      v-for="(item, index) in paste"
      :ref="`posts${index}`"
      :key="item.id"
      :pastedata="item"
      :class="{posts:iSposts}"
    />
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
    },
    iSposts: {
      //增加上边距10px
      type: Boolean,
      default: true
    }
  },
  components: {
    displayPosts
  }
};
</script>

<style scoped>
.posts {
  margin-top: 10px;
}
</style>