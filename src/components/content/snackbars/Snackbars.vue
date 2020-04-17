<template>
  <div class="snackbars">
    <v-snackbar
      v-model="snackbar"
      :timeout="0"
      :bottom="position === 'bottom'"
      :color="color"
      class="snackbar"
    >
      <span class="text">
        <van-loading type="spinner" size="16px" />
        {{ text }}
      </span>
    </v-snackbar>
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
      default: "#2d3436"
    }
  },
  data() {
    return {
      snackbar: false
    };
  }
};
</script>

<style scoped>
.snackbar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
}
.v-snack__wrapper {
  box-shadow: none;
  -webkit-box-shadow: none;
}
.text {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>