<template>
  <div class="detailserchfor">
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
        <img
          src="~assets/image/detail/collect.svg"
          @click="collect"
          class="collect"
          alt
          v-if="!FavoriteStatus"
        />
        <img src="~assets/image/detail/collectstatus.svg" v-else alt />
        <img src="~assets/image/detail/shareit.svg" alt />
      </div>
    </layoutNav>
  </div>
</template>

<script>
import layoutNav from "components/content/layoutnav/layoutNav";

export default {
  name: "detailserchfor",
  components: {
    layoutNav
  },
  props: {
    FavoriteStatus: {
      tyep: Boolean,
      default: false
    }
  },
  methods: {
    focus() {
      this.$emit("focus");
    },
    collect() {
      if (!localStorage.getItem("token")) {
        this.$toast("请先登录!");
        return;
      }
      this.$emit("collect");
    }
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
.detailserchfor {
  background: #ffffff;
  /* box-shadow: 0px -1px rgb(245, 245, 245); */
}
.detailserchfor :after {
  content: "  ";
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 200%;
  height: 1;
  border-top: 1px solid #e0e0e0;
  transform-origin: 0 0;
  transform: scale(0.5, 0.5);
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
.collect {
  background-image: #0984e3;
}
</style>