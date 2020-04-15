<template>
  <div class="publish">
    <van-field
      v-model="message"
      rows="1"
      autosize
      type="textarea"
      placeholder="回复~回复~"
      class="field"
      :autofocus="publish"
    />
    <div class="font">
      <van-button type="info" :disabled="!Boolean(message)" @click="shareit" class="bottom">发表</van-button>
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
  background: #ffffff;
}
.van-button--normal {
  padding: 6px 8px;
}
.van-button {
  height: auto;
  line-height: 100%;
}
.bottom {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>