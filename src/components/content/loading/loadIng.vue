<template>
  <div class="loading">
    <van-loading :size="size" type="spinner" />
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 24
    }
  }
};
</script>

<style scoped>
</style>