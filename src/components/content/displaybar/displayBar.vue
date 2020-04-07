<template>
  <div class="displaybar">
    <displayPosts
      v-for="(item, index) in paste"
      :key="index"
      :pastedata="item"
      :class="{posts:iSposts}"
      :divider="divider"
      :istexts="istexts"
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
      type: Boolean,
      default: true
    },
    divider: {
      type: Boolean,
      default: false
    },
    istexts: {
      type: Boolean,
      default: false
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