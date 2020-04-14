<template>
  <transition
    enter-active-class="animated fadeInRightBig faster"
    leave-active-class="animated fadeOutRightBig faster"
    :duration="{ enter: 250, leave: 100 }"
  >
    <div id="detail">
      <loadIng class="laoding" v-if="loading" />
      <detailHeadColumn class="nav" ref="nav" />
      <detailTabs
        id="tabs"
        class="tabs"
        @sorts="sorts"
        ref="isdetailtabs"
        v-show="detailTabsDisplay"
        @switchdiaplay="switchdiaplay"
      />
      <div v-if="!loading">
        <scroll class="scroll" ref="scroll" @monitor="position" :bounce="false" :probeType="3">
          <detailContentHaed :pasteval="pasteheadval" />
          <detailContent @loadimg="loadimg" :content="pastedata.content" class="content" />
          <detailContentBottom
            :pasteval="pastebottomval"
            class="contentbottom"
            :commentlength="commentlength"
          />
          <detailTabs
            class="tabs"
            ref="detailtabs"
            @sorts="sorts"
            v-show="!detailTabsDisplay"
            @switchdiaplay="switchdiaplay"
          />
          <displayBar :paste="commentData" :iSposts="false" v-if="bardisply" />
        </scroll>
        <detilBottom v-if="!bardisply" />
      </div>
      <DateilSearchFor class="swarchfor" v-if="publish" @focus="focus" />
      <DateilPublish class="publish" @blur="blur" @shareit="shareit" v-else :publish="!publish" />
    </div>
  </transition>
</template>

<script>
/** 子组件*/
import DetailContentBottom from "./childcomps/DetailContentBottom";
import DetailContentHaed from "./childcomps/DetailContentHaed";
import DetailHeadColumn from "./childcomps/DetailHeadColumn";
import DateilSearchFor from "./childcomps/DateilSearchFor";
import DateilPublish from "./childcomps/DateilPublish";
import DetailContent from "./childcomps/DetailContent";
import DetilBottom from "./childcomps/DetilBottom";
import DetailTabs from "./childcomps/DetailTabs";

/** 公共组件*/
import displayBar from "components/content/displaybar/displayBar";
import loadIng from "components/content/loading/loadIng";
import Scroll from "components/content/scroll/Scroll";

/**方法 */
// import { ICONSTATUS } from "@/store/mutations-types";
import { homeModifyData, detaildata } from "network/home";
import { DetailShareit } from "network/detail";

export default {
  name: "detail",
  components: {
    DetailContentBottom,
    DetailContentHaed,
    DetailHeadColumn,
    DateilSearchFor,
    DetailContent,
    DateilPublish,
    DetilBottom,
    DetailTabs,
    displayBar,
    loadIng,
    Scroll
  },
  provide() {
    return {
      divider: true,
      istexts: true
    };
  },
  data() {
    return {
      id: "",
      pastedata: {}, //数据
      loading: true, //加载显示
      PitchHeight: 0, //标签栏的距离高
      detailTabsDisplay: false, //标签栏是否显示
      commentlength: 0, //评论数目
      commentData: [], //用来切换楼主评论和全部评论
      bardisply: true, //楼主评论和全部评论没有评论将用暂无评论来代替
      publish: true
    };
  },
  computed: {
    pasteheadval() {
      //帖子头部值
      class paste {
        constructor({ img, name, date }) {
          this.img = img;
          this.name = name;
          this.date = date;
        }
      }

      return new paste(this.pastedata);
    },
    pastebottomval() {
      //主帖子底部值
      class paste {
        constructor({ plate, like }) {
          this.plate = plate;
          this.like = like;
        }
      }

      return new paste(this.pastedata);
    },
    yesnull() {
      if (this.commentData.length === 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    pastedata(newval, oldval) {
      let tx = Array.isArray(this.pastedata.comment);

      if (newval !== oldval) {
        if (tx) {
          this.pastedata.comment.forEach(item => {
            let like = item.likeid.includes(1000); //首次进入详情页判度登录者id有没有在每一个回复点赞人数数组下
            //有登录者id
            if (like) {
              item.likeststuc = true; //改变图标颜色
            } else {
              return;
            }
          });

          this.commentlength = this.pastedata.comment.length;
        }
      } else {
        return;
      }
    },
    loading: {
      handler(newName, oldName) {
        if (newName !== oldName) {
          this.$nextTick(() => {
            //在下次dom循环更新后执行
            this.loadimg(); //初始化"detailTabs"子组件距离父组件"scrol"高度
          });
        }
      }
    },
    deep: true,
    immediate: true
  },
  created() {
    this.id = this.$route.query.id; //进入详情页传过来的id

    this.pastedata = detaildata(this.id).then(({ detaildata }) => {
      this.loading = false;

      this.commentData = detaildata.comment;
      this.pastedata = detaildata;
    });
  },
  methods: {
    //当滑动一定高度时是否显示标签栏
    //PitchHeight 标签栏距离父组件高度 动态获取
    position(position) {
      -position >= this.PitchHeight
        ? (this.detailTabsDisplay = true)
        : (this.detailTabsDisplay = false);
    },
    loadimg() {
      this.PitchHeight =
        this.$refs.detailtabs.$el.offsetTop - this.$refs.nav.$el.offsetHeight; //"detailTabs"子组件距离父组件"scroll"高度
    },
    findData(pastedata, id) {
      //查找帖子下的回复
      let obj = pastedata.comment.find(item => {
        return item.id === id;
      });

      if (obj.likeid.includes(1000)) return; //用户id在回复的点赞人数下有存在吗？
      obj.likeid.push(1000);
    },
    //排序
    sorts(value, index) {
      if (value === "inverted") {
        this.pastedata.comment.sort((a, b) => {
          return b.date - a.date;
        });
        this.$refs.detailtabs.isindex = this.$refs.isdetailtabs.isindex = index; //统一高亮
      } else {
        this.pastedata.comment.sort((a, b) => {
          return a.date - b.date;
        });
        this.$refs.detailtabs.isindex = this.$refs.isdetailtabs.isindex = index; //统一高亮
      }
    },
    //查看全部评论或楼主评论
    switchdiaplay(val) {
      //查看楼主评论
      if (val === 1) {
        let Lzid = this.pastedata.comment.filter(item => {
          return item.id === this.pastedata.uid;
        });

        this.commentData = Lzid;
        this.bardisply = false;
      } else {
        //查看全部评论
        this.commentData = this.pastedata.comment;
        this.bardisply = true;
      }
    },
    focus() {
      this.publish = false; //获取焦点时隐藏
    },
    blur() {
      this.publish = true; //失去焦点时显示
    },
    shareit(value) {
      const data = {
        pasteid: this.id,
        id: /[a-z][0-9][a-z][0-9][0-9][a-z][A-Z][0-9]/,
        name: "张三",
        img:
          "https://www.baidu.com/link?url=6A-JoS39znZ9NRHVStAjSi003ofY5r9VVdOCx9q3wpr8K720q6pCBDelaWfkgZVl3-NR6wITtGtmiJ3g3Cy9p744BzQm-6wpfrX3YuXXx1AtcgS-PN8o2BngMBWwAdHCZKlPQISteHLHQ3ocaOb9rmyGBr7GT8fJ7oiU8xxlCEAYrgs7J4TX9ln1uEbAoB76oSOen43_MxY704Bzo_B99EEmrKBNFS1ck28Bi7IBIwyP88jwwhrGAW6pA4raMcK9jF14t3E5WGwOr6tEqH3vXgF_Yz2u8ftuXZHiLZ6TWDEhtxDGccqEI0GMCHcdMoFTKHkYxSRR94GCSzakgG3rW3RoYYLtDOZc3-SLCDuiZhTHa3rqZKXl_4hYJuSkhDMF9AFJwQ5j_tw9farYqKNRYAA3JJ6FK_3DpZE20vbacLZ16eSminB-k5J4f41tEJy95CJKvsvZwdfZTB3KCC8LRhWUOSiK6nLCw__Ms_fDF67OkqXvRurYkvf3-Y9tbRapXu7PSN9-BoNpcUlWYQRxOiLjYwh-2QTVv5TvBuxLvd1NWSM5y1tHkMcX2XAmUodWbF5zULn91EsLMHvnaOjMLwuQNpHMHDbqyWjJhcVyLEa&timg=https%3A%2F%2Fss0.bdstatic.com%2F94oJfD_bAAcT8t7mm9GUKT-xh_%2Ftimg%3Fimage%26quality%3D100%26size%3Db4000_4000%26sec%3D1586874875%26di%3D12288d292e2e65a72cbe40b6d06daf77%26src%3Dhttp%3A%2F%2Fa4.att.hudong.com%2F21%2F09%2F01200000026352136359091694357.jpg&click_t=1586874883411&s_info=1349_625&wd=&eqid=f22d6a1c000a5823000000065e95c9fa",
        date: Date.now(),
        title: value,
        county: "广东省",
        like: 0,
        likeid: [],
        likeststuc: false
      };
      console.log(123);

      DetailShareit(data).then(val => {
        val;
      });
    }
  },
  mounted() {
    this.$bus.$on("islike", id => {
      //查找帖子下的回复
      let iid = this.pastedata.comment.find(item => {
        return item.id === id;
      });

      //查找回复的kikeid数组中有没有登录者id
      let likeid = iid.likeid.includes(1000);

      //有登录者id
      if (likeid) {
        let index = iid.likeid.findIndex(item => {
          return item === 1000;
        }); //查找登录者id位置

        iid.like--; //再次点赞时取消点赞并点赞数减一
        iid.likeid.splice(index, 1); //删除登录者id
        iid.likeststuc = false; //点赞图标变色

        //发送请求让后台删除点赞用户id
        homeModifyData({ iid: this.pastedata.id, id, method: "detele" }).then(
          value => {
            value;
          }
        );
      } else {
        //没有登录者id

        this.findData(this.pastedata, id); //将登录者id添加到数组中

        iid.like++; //点赞数加一
        iid.likeststuc = true; //点赞图标变色

        /**iid 帖子id  id 要点赞回复的id */
        //发送请求让后台添加点赞用户id
        homeModifyData({ iid: this.pastedata.id, id, method: "change" }).then(
          value => {
            value;
          }
        );
      }
    }); //src\components\content\displaybar\displayPosts.vue
  }
};
</script>

<style scoped>
#detail {
  background-color: #fafafa;
  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100%;
  z-index: 99;
}
#tabs {
  box-shadow: 0 1px #fafafa;
}
.head {
  box-shadow: 0 1px #f0f0f0;
}
.nav {
  position: relative;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #ffffff;
}
.scroll {
  height: calc(100vh - 32px - 44px);
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.tabs {
  background: #ffffff;
  position: relative;
  z-index: 999;
}
.contentbottom {
  background: #ffffff;
  margin-bottom: 10px;
}
.swarchfor {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
}
.tabbar {
  width: 100%;
}
.publish {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 9999;
}
</style>