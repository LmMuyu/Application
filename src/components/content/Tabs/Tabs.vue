<template>
  <div class="tabs">
    <v-tabs
      :background-color="backcolor"
      :active-class="slidercolor"
      :color="color"
      v-model="model"
      dark
    >
      <v-tab v-for="(item, index) in title" :key="index" @click="tabindex(index)">{{item}}</v-tab>
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
    return {
      model: 0
    };
  },
  methods: {
    tabindex(index) {
      this.$bus.$emit("tabindex", index); //src\views\home\Home.vue
    }
  }
};
</script>

<style scoped>
</style>