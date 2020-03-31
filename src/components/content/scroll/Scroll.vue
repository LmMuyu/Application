<template>
  <div ref="wrapper" class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "scroll",
  props: {
    probeType: {
      type: Number,
      default() {
        return 0;
      }
    },
    PullUpLoading: {
      //上啦阈值
      type: Object,
      default() {
        return {};
      }
    },
    fade: {
      type: Boolean,
      default() {
        return false;
      }
    },
    bounce: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  created() {},
  methods: {
    scrollTo(time = "800") {
      this.scroll.scrollTo(0, 0, time);
    },
    //上拉加载
    finishPullUp() {
      this.scroll.finishPullUp();
      this.scroll.refresh();
    },
    //重新刷新滚动高度
    refresh() {
      this.scroll.refresh();
    },
    getScrollY() {
      //判断scroll有没有值
      return this.scroll ? this.scroll.y : 0;
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, //开启点击事件
      probeType: this.probeType, //开启实时滚动的位置
      pullUpLoad: this.PullUpLoading, //上拉加载
      scrollbar: this.fade, //是否开启滚动条
      mouseWheel: true, //在PC端使用,鼠标无法实现滚动的解决办法
      bounce: this.bounce //是否开启当滚动超过边缘的时候会有一小段回弹动画
    });
    //监听滚动并将y值传出
    this.scroll.on("scroll", position => {
      this.$emit("monitor", position.y);
    });
    //监听上拉加载
    this.scroll.on("pullingUp", () => {
      this.$emit("PullUp");
    });
  }
};
</script>

<style scoped>
</style>
