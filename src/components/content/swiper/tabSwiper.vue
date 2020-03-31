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