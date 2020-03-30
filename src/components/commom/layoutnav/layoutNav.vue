<template>
  <div class="layoutnav">
    <van-row>
      <van-col :span="left">
        <slot name="left"></slot>
      </van-col>
      <van-col :span="center">
        <slot name="center"></slot>
      </van-col>
      <van-col :span="right">
        <slot name="right"></slot>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "layoutnav",
  props: {
    left: {
      type: Number,
      default: 8
    },
    center: {
      type: Number,
      default: 8
    },
    right: {
      type: Number,
      default: 8
    }
  }
};
</script>

<style scoped>
</style>