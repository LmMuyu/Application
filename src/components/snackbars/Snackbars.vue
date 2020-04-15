<template>
  <div class="snackbars text-center ma-2">
    <v-snackbar
      :bottom="position === 'bottom'"
      :right="position === 'right'"
      :left="position === 'left'"
      :top="position === 'top'"
      :color="color"
    >{{ text }}</v-snackbar>
  </div>
</template>

<script>
export default {
  name: "snackbars",
  props: {
    text: {
      //文字
      type: String,
      default: ""
    },
    position: {
      // 位置
      type: String,
      default: "bottom"
    },
    timeout: {
      // 多久时间自动隐藏
      type: Number,
      default: 3000
    },
    color: {
      type: String,
      default: "#000000"
    }
  }
};
</script>

<style scoped>
</style>