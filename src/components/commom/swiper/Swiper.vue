<template>
  <div class>
    <div class="swiper-container" ref="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in imageswiper" :key="index">{{item}}</div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要滚动条 -->
      <div class="swiper-scrollbar"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "swiper",
  props: {
    imageswiper: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      mySwiper: null
    };
  },
  mounted() {
    this.mySwiper = new Swiper(this.$refs.swiper, {});
  }
};
</script>

<style scoped>
</style>