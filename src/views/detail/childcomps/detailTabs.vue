<template>
  <div class="tabs">
    <layoutNav class="van-row">
      <div slot="left" class="left">
        <span
          v-for="(item, index) in ['全部评论','只看楼主']"
          :key="index"
          :class="{active:indexs === index}"
          @click="active(index)"
          class="font"
        >{{ item }}</span>
      </div>
      <div slot="right" class="right">
        <span :class="{active:isindex === 0}" @click="isindexs(0)">正序</span>
        <v-divider class="inset" inset vertical></v-divider>
        <span :class="{active:isindex === 1}" @click="isindexs(1,inverted)">倒序</span>
      </div>
    </layoutNav>
  </div>
</template>

<script>
import layoutNav from "components/content/layoutnav/layoutNav.vue";

export default {
  name: "tabs",
  components: {
    layoutNav
  },
  data() {
    return {
      indexs: 0,
      isindex: 0
    };
  },
  methods: {
    active(index) {
      this.indexs = index;
    },
    isindexs(value, sort) {
      value === 0 ? (this.isindex = 0) : (this.isindex = 1);

      this.$emit("sorts", sort);
    }
  }
};
</script>

<style scoped>
.active {
  color: #3498db;
}
.font,
.right {
  font-size: 14px;
  flex: 1;
}
.left {
  display: flex;
  justify-content: space-around;
}
.right {
  display: flex;
  justify-content: flex-end;
}
.left span,
.right span {
  padding: 8px 0;
}
.right span {
  padding: 8px;
}
.inset {
  margin-bottom: 8px;
}
</style>