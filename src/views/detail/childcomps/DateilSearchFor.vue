<template>
  <div class="detailsercfor">
    <layoutNav :left="16" :center="0" :right="8" class="layoutnav">
      <div slot="left" class="left">
        <van-field
          rows="1"
          @focus="focus"
          autosize
          type="textarea"
          placeholder="回复~回复~"
          class="field"
        />
      </div>
      <div slot="right" class="right">
        <img src="~assets/image/detail/collect.svg" alt />
        <img src="~assets/image/detail/shareit.svg" alt />
      </div>
    </layoutNav>
  </div>
</template>

<script>
import layoutNav from "components/content/layoutnav/layoutNav";

export default {
  name: "detailsercfor",
  components: {
    layoutNav
  },
  methods: {
    focus() {
      this.$emit("focus")
    },
  }
};
</script>

<style scoped>
.right {
  display: flex;
  align-items: center;
  height: 44px;
  line-height: 44px;
}
.detailsercfor {
  background: #ffffff;
  box-shadow: 0px -1px rgb(245, 245, 245);
}
.field {
  background: #f0f0f0;
  border-radius: 4px;
}
.left {
  display: flex;
  align-items: center;
  height: 44px;
  line-height: 44px;
}
.van-cell {
  padding: 4px 4px;
}
.right img {
  width: 28px;
  height: 28px;
  margin-left: 6px;
}
</style>