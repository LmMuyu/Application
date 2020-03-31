<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in imagepath" :key="index">
        <img :src="item" alt />
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "swiper",
  props: {
    imagepath: {
      type: Array,
      default() {
        return [];
      }
    },
    ratio: {
      type: Number,
      default: 0.85
    },
    autoplay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mySwiper: null
    };
  },
  mounted() {
    this.mySwiper = new Swiper(".swiper-container", {
      setWrapperSize: true
    });
  }
};
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
}
</style>