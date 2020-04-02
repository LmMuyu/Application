<template>
  <div id="home">
    <div class="homeloading">
      <loadIng :letter="'加载中...'" :color="'#4834d4'" :vertical="true" v-if="homeloading" />
    </div>
    <Tabs :backcolor="'#22a6b3'" :title="title" ref="tabs" />
    <div v-if="!homeloading">
      <tabSwiper :Numberofcells="2" ref="tabswiper" @swiperindex="swiperindex">
        <!--官方-->
        <div slot="tab1">
          <scroll
            class="scroll"
            ref="scroll"
            :probeType="0"
            @monitor="monitor"
            :pulldown="pulldown"
            @pulling="pulling"
            @PullUp="PullUp"
            :PullUpLoading="PullUpLoading"
          >
            <loadIng class="loading" :size="20" v-if="loading" />
            <homeHeadTitle class="title" v-if="headtitle" />
            <div class="homes">
              <homeSearch />
              <homeSwiper :swiperData="swiperData" />
              <displayBar :paste="paste.list" />
            </div>
            <loadIng v-if="uploading" />
          </scroll>
        </div>

        <!--社区-->
        <div slot="tab2"></div>
      </tabSwiper>
    </div>
  </div>
</template>

<script>
import homeHeadTitle from "./childcomps/homeHeadTitle";
import homeSwiper from "./childcomps/homeSwiper";
import homeSearch from "./childcomps/homeSearch";

import Tabs from "components/content/Tabs/Tabs.vue";
import tabSwiper from "components/content/swiper/tabSwiper.vue";
import Scroll from "components/content/scroll/Scroll";
import displayBar from "components/content/displaybar/displayBar.vue";
import loadIng from "components/content/loading/loadIng.vue";

import { hometData, pasteData } from "network/home";

export default {
  name: "home",
  components: {
    Tabs,
    homeSearch,
    homeSwiper,
    tabSwiper,
    Scroll,
    displayBar,
    loadIng,
    homeHeadTitle
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
        //下拉刷新
        threshold: 32,
        stop: 0
      },
      PullUpLoading: {
        threshold: 24
      },
      loading: false, //下拉加载中
      headtitle: true, //下拉即可刷新
      homeloading: true, //第一次进入页面加载
      uploading: false //上拉加载中
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
          this.homeloading = false;

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
    refresh() {},
    swiperindex(index) {
      this.tabs.model = index;
    },
    monitor(position) {
      position;
    },
    pulling() {
      this.headtitle = false;
      this.loading = true;
      //下拉刷新
      pasteData(this.paste.page).then(({ list }) => {
        this.scroll.finishPullDown();
        this.paste.list.unshift(...list);

        setTimeout(() => {
          this.headtitle = true;
          this.loading = false;
          this.$toast("刷新成功");
          this.scroll.refresh();
        }, 1500);
      });
    },
    PullUp() {
      //上拉加载
      this.uploading = true;
      pasteData(this.paste.page).then(({ list }) => {
        this.uploading = false;
        this.paste.list.push(...list);
        this.$nextTick(() => {
          this.scroll.finishPullUp();
        });
      });
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
  position: absolute;
  top: -16px;
  z-index: -9;
  transform: translateX(150%);
}
.title img {
  width: 12px;
  height: 12px;
}
.homeloading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>