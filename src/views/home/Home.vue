<template>
  <div id="home">
    <Tabs :backcolor="'#22a6b3'" :title="title" ref="tabs" />
    <div slot="pull">
      <tabSwiper :Numberofcells="2" ref="tabswiper" @swiperindex="swiperindex">
        <!--官方-->
        <div slot="tab1">
          <Scroll
            class="scroll"
            ref="scroll"
            :probeType="3"
            @monitor="monitor"
            :pulldown="pulldown"
            @pulling="pulling"
          >
            <loadIng class="loading" :size="20" v-if="loading" />
            <div class="title" v-if="headtitle">
              松开即可刷新
              <img src="~assets/image/home/header.svg" alt />
            </div>
            <homeSearch />
            <homeSwiper :swiperData="swiperData" />
            <displayBar :paste="paste.list" />
          </Scroll>
        </div>

        <!--社区-->
        <div slot="tab2"></div>
      </tabSwiper>
    </div>
  </div>
</template>

<script>
import homeSwiper from "./childcomps/homeSwiper";
import homeSearch from "./childcomps/homeSearch";

import Tabs from "components/content/Tabs/Tabs.vue";
import tabSwiper from "components/content/swiper/tabSwiper.vue";
import Scroll from "components/content/scroll/Scroll";
import displayBar from "components/content/displaybar/displayBar.vue";

import { hometData, pasteData } from "network/home";
import loadIng from "components/content/loading/loadIng.vue";

export default {
  name: "home",
  components: {
    Tabs,
    homeSearch,
    homeSwiper,
    tabSwiper,
    Scroll,
    displayBar,
    loadIng
  },
  data() {
    return {
      title: ["官方", "社区"], //标签
      swiperData: [], //轮播图数据
      paste: {
        page: 1, //页数
        list: [] //帖子
      },
      pulldown: {
        //下拉刷新回弹高度
        threshold: 32,
        stop: 0
      },
      loading: true,
      headtitle: false
    };
  },
  created() {
    this.hometData();
  },
  methods: {
    hometData() {
      hometData(this.paste.page)
        .then(value => {
          // console.log(value);
          this.paste.page++;

          //轮播图
          const swiperdata = value[1].list;
          this.swiperData = swiperdata;

          //帖子
          const { list } = value[0];
          this.paste.list = list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    refresh() {
      //下拉刷新
      pasteData(this.paste.page).then(({ list }) => {
        this.paste.list.unshift(...list);

        this.$toast("刷新成功");

        this.scroll.refresh();
      });
    },
    swiperindex(index) {
      this.tabs.model = index;
    },
    monitor(position) {
      if (-position < 16) {
        this.headtitle = true;
      }
    },
    pulling() {
      setTimeout(() => {
        this.scroll.scrollTo(0, 0, 0);
        this.scroll.finishPullDown();
      }, 2000);
      this.headtitle = false;
      console.log(123);
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
    },
    pullrefresh() {
      return this.$refs.pullrefresh;
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
.loading {
  display: flex;
  justify-content: center;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #d1d8e0;
}
.title img {
  width: 12px;
  height: 12px;
}
</style>