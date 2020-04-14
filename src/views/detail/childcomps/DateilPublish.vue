<template>
  <div class="publish">
    <van-field
      v-model="message"
      rows="1"
      autosize
      type="textarea"
      placeholder="回复~回复~"
      class="field"
      @blur="blur"
      :autofocus="publish"
    />
    <v-divider vertical />
    <div class="font" @click="shareit">
      <van-button type="info" class="bottom">发表</van-button>
    </div>
    <van-overlay :show="publish" z-index="-1" @click="blur"></van-overlay>
  </div>
</template>

<script>
export default {
  props: {
    publish: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      message: ""
    };
  },
  methods: {
    blur() {
      this.$emit("blur");
    },
    shareit() {
      console.log(123);
      
      this.$emit("shareit", this.message);
    }
  }
};
</script>

<style scoped>
.publish {
  width: 100%;
  display: flex;
  background: #ffffff;
  box-shadow: 0 -1px 1px #f0f0f0;
}
.font {
  min-width: 48px;
  display: flex;
  align-items: center;
  background: #ffffff;
  justify-content: center;
}
.van-button--normal {
  padding: 4px 8px;
}
.van-button {
  height: auto;
  line-height: 100%;
}
.bottom {
  float: left;
}
</style>