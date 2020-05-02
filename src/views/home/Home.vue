<template>
  <div id="home">
    <div class="homeloading">
      <loadIng :letter="'加载中...'" :color="'#4834d4'" :vertical="true" v-if="homeloading" />
    </div>
    <Tabs :backcolor="'#22a6b3'" :title="title" ref="tabs" />
    <tabSwiper :Numberofcells="2" ref="tabswiper" @swiperindex="swiperindex">
      <!--官方-->
      <div slot="tab1" v-if="!homeloading">
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
            <homeSearch class="search" />
            <homeSwiper :swiperData="swiperData" />
            <HomePost :list="paste.list" />
          </div>
          <loadIng v-if="uploading" />
        </scroll>
      </div>

      <!--社区-->
      <div slot="tab2"></div>
    </tabSwiper>
  </div>
</template>

<script>
import homeHeadTitle from "./childcomps/homeHeadTitle";
import homeSwiper from "./childcomps/homeSwiper";
import homeSearch from "./childcomps/homeSearch";
import HomePost from "./childcomps/HomePost";

import tabSwiper from "components/content/swiper/tabSwiper.vue";
import loadIng from "components/content/loading/loadIng.vue";
import Scroll from "components/content/scroll/Scroll";
import Tabs from "components/content/Tabs/Tabs.vue";

import { hometData, pasteData, addLike } from "network/home";
import { debounce } from "common/debounce";
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    homeHeadTitle,
    homeSearch,
    homeSwiper,
    tabSwiper,
    HomePost,
    loadIng,
    Scroll,
    Tabs
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
        threshold: 32, //下拉到多少px更新
        stop: 0
      },
      PullUpLoading: {
        threshold: 24
      },
      loading: false, //下拉加载中
      headtitle: true, //下拉即可刷新
      homeloading: true, //第一次进入页面加载
      uploading: false, //上拉加载中
      scrollY: 0 //缓存滑动Y值
    };
  },
  created() {
    this.hometData();
  },
  watch: {
    $route(to) {
      if (to.path === "/home") {
        //没有登录不执行代码
        if (!localStorage.getItem("token")) return;

        //从详情页或者其他页面回来后查找store下最后一个储存的帖子
        let index = this.paste.list.findIndex(item => {
          return item.id === this.storepost.id;
        });

        //查找点赞列表里有没有登录者的id，有就改变图标状态
        this.paste.list.splice(index, 1, this.storepost);
      }
    },
    deep: true
  },
  methods: {
    hometData() {
      hometData(this.paste.page)
        .then(value => {
          // console.log(value);
          this.paste.page++;
          this.homeloading = false; //加载图表隐藏

          //轮播图
          this.swiperData = value[1].list;

          //帖子
          const { list } = value[0];
          this.paste.list = list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    swiperindex(index) {
      this.tabs.model = index;
    },
    monitor(position) {
      this.scrollY = position;
    },
    pulling() {
      this.headtitle = false;
      this.loading = true;
      //下拉刷新
      pasteData(this.paste.page).then(({ list }) => {
        this.scroll.finishPullDown();
        this.paste.list.unshift(...list);

        this.$nextTick(() => {
          this.headtitle = true;
          this.loading = false;
          this.$toast("刷新成功");
          this.scroll.refresh();
        });
      });
    },
    PullUp() {
      //上拉加载
      this.uploading = true; //开始获取数据显示加载图标
      pasteData(this.paste.page).then(({ list }) => {
        this.uploading = false; //获取后隐藏加载图标
        this.paste.list.push(...list);
        this.$nextTick(() => {
          this.scroll.finishPullUp(); //获取到数据等到下一个dom刷新时调用
        });
      });
    }
  },
  mounted() {
    this.$bus.$on("tabindex", index => {
      this.swiper.slideTo(index, 200, false); //点击跳转对应板块
    }); //src\components\content\Tabs\Tabs.vue

    this.$bus.$on("imgload", () => {
      debounce(this.$refs.scroll.refresh, 150); //每次加载图片重新刷新滑动高度
    }); //src\components\content\displaybar\displayPosts.vue

    //点赞模块
    //src\components\content\posttemplate\PostTemplateContentBottom.vue
    this.$bus.$on("homeAddLike", id => {
      /**
       * @param id 帖子id
       * @param uid 用户id
       */
      addLike({ id, uid: this.userinfo.id })
        .then(res => {
          let isPaste = this.paste.list.find(item => {
            return item.id === id;
          }); //查找帖子

          isPaste.like = res; //将发回来的点赞数量等于它
          isPaste.status = true; //改变点赞图标
          isPaste.likelist.push(this.userinfo.id);
        })
        .catch(err => {
          console.log(err);
        });
    });
  },
  computed: {
    ...mapGetters(["userinfo", "storepost"]),
    swiper() {
      return this.$refs.tabswiper.swiper;
    },
    scroll() {
      return this.$refs.scroll; //获取scroll组件
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
  background: #fafafa;
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
.search {
  background: #ffffff;
}
</style>