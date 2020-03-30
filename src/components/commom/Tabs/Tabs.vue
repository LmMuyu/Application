<template>
  <div class="tabs">
    <v-tabs :background-color="backcolor" :active-class="slidercolor" :color="color" dark>
      <v-tab v-for="(item, index) in title" :key="index">{{item}}</v-tab>
    </v-tabs>
  </div>
</template>


<script>
export default {
  props: {
    backcolor: {
      type: String,
      default: "#ffffff"
    },
    title: {
      type: Array,
      default() {
        return [];
      }
    },
    slidercolor: {
      type: String,
      default: "#ffffff"
    },
    //将指定的颜色应用于控件
    color: {
      type: String,
      default: "#ffffff"
    }
  },
  name: "tabs",
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>