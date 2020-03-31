<template>
  <div class="homeswiper">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in swiperData" :key="index">
        <img :src="item" alt />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  naem: "homeswiper",
  props: {
    swiperData: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
</style>