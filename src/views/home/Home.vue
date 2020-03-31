<template>
  <div id="home">
    <Tabs :backcolor="'#22a6b3'" :title="title" ref="tabs" />
    <tabSwiper :Numberofcells="2" ref="tabswiper" @swiperindex="swiperindex">
      <!--官方-->
      <div slot="tab1">
        <Scroll class="scroll" ref="scroll">
          <homeSearch />
          <homeSwiper :swiperData="swiperData" />
          <displayBar :paste="paste" />
        </Scroll>
      </div>
      <!--社区-->
      <div slot="tab2"></div>
    </tabSwiper>
  </div>
</template>

<script>
import homeSwiper from "./childcomps/homeSwiper";
import homeSearch from "./childcomps/homeSearch";

import Tabs from "components/content/Tabs/Tabs.vue";
import tabSwiper from "components/content/swiper/tabSwiper.vue";
import Scroll from "components/content/scroll/Scroll";
import displayBar from "components/content/displaybar/displayBar.vue";

import { hometData } from "network/home";

export default {
  name: "home",
  components: {
    Tabs,
    homeSearch,
    homeSwiper,
    tabSwiper,
    Scroll,
    displayBar
  },
  data() {
    return {
      title: ["官方", "社区"], //标签
      swiperData: [], //轮播图数据
      paste: [] //帖子
    };
  },
  created() {
    this.homeContentData();
  },
  methods: {
    hometData() {
      hometData().then(value => {
        console.log(value);

        const { list } = value[0];
        this.paste = list;
      });
    },
    swiperindex(index) {
      this.tabs.model = index;
    }
  },
  mounted() {
    this.$bus.$on("tabindex", index => {
      this.swiper.slideTo(index, 200, false);
    }); //src\components\content\Tabs\Tabs.vue

    this.$bus.$on("imgload", () => {
      this.scroll.refresh();
    }); //src\components\content\displaybar\displayPosts.vue
  },
  computed: {
    swiper() {
      return this.$refs.tabswiper.swiper;
    },
    scroll() {
      return this.$refs.scroll;
    },
    tabs() {
      return this.$refs.tabs;
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
}
.scroll {
  height: calc(100vh - 48px - 50px);
}
</style>