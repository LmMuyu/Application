<template>
  <div class="loading">
    <van-loading :size="size" :color="color" :vertical="vertical" :type="type">{{letter}}</van-loading>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 24
    },
    type: {
      type: String,
      default: "circular"
    },
    color: {
      type: String,
      default: "#c9c9c9"
    },
    letter: {
      type: String,
      default: ""
    },
    vertical: {
      type: Boolean,
      default() {
        return false;
      }
    }
  }
};
</script>

<style scoped>
</style>