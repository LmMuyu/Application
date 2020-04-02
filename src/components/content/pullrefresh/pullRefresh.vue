<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <slot name="pull"></slot>
  </van-pull-refresh>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    onRefresh() {
      this.$emit("refresh");
    }
  }
};
</script>

<style scoped>
</style>