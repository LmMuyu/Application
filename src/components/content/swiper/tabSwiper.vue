<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in Numberofcells" :key="index">
        <slot :name="`tab${item}`"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "tabswiper",
  props: {
    Numberofcells: {
      type: Number,
      default: 1
    },
    shortSwipes: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      swiper: null
    };
  },
  mounted() {
    let _this = this;
    this.swiper = new Swiper(".swiper-container", {
      slidesPerView: "auto",
      resistanceRatio: 0,
      shortSwipes: this.shortSwipes, //设置为false时，只能长切换，进行快速切换的滑动无法触发切换。
      on: {
        slideChangeTransitionEnd() {
          _this.$emit("swiperindex", this.activeIndex);
        }
      }
    });
  }
};
</script>

<style scoped>
</style>