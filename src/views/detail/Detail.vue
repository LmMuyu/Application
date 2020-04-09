<template>
  <transition
    enter-active-class="animated fadeInRightBig faster"
    leave-active-class="animated fadeOutRightBig faster"
    :duration="{ enter: 250, leave: 100 }"
  >
    <div id="detail">
      <loadIng class="laoding" v-if="loading" />
      <detailHeadColumn class="nav" ref="nav" />
      <detailTabs id="tabs" class="tabs" ref="detailtabs" v-if="detailTabsDisplay" />
      <div v-if="!loading">
        <scroll class="scroll" ref="scroll" @monitor="position" :probeType="3">
          <detailContentHaed :pasteval="pasteheadval" />
          <detailContent @loadimg="loadimg" :content="pastedata.content" class="content" />
          <detailContentBottom
            :pasteval="pastebottomval"
            class="contentbottom"
            :commentlength="commentlength"
          />
          <detailTabs class="tabs" ref="detailtabs" v-if="!detailTabsDisplay" />
          <displayBar :paste="pastedata.comment" :iSposts="false" />
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
/** 子组件*/
import detailContentBottom from "./childcomps/detailContentBottom";
import detailContentHaed from "./childcomps/detailContentHaed";
import detailContent from "./childcomps/detailContent";
import detailHeadColumn from "./childcomps/detailHeadColumn";
import detailTabs from "./childcomps/detailTabs";

/** 公共组件*/
import displayBar from "components/content/displaybar/displayBar";
import loadIng from "components/content/loading/loadIng";
import Scroll from "components/content/scroll/Scroll";

/**方法 */
import { ICONSTATUS } from "@/store/mutations-types";
import { homeModifyData } from "network/home";

export default {
  name: "detail",
  components: {
    detailContentBottom,
    detailContentHaed,
    detailHeadColumn,
    detailContent,
    detailTabs,
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
      pastedata: {}, //数据
      loading: true, //加载显示
      PitchHeight: 0, //标签栏的距离高
      detailTabsDisplay: false //标签栏是否显示
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
    commentlength() {
      return this.pastedata["comment"].length;
    }
  },
  watch: {
    pastedata(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loading = false;
      }
    },
    deep: true
  },
  created() {
    this.pastedata = this.$route.query.paste;
  },
  methods: {
    position(position) {
      if (-position >= this.PitchHeight) {
        this.detailTabsDisplay = true;
      } else {
        this.detailTabsDisplay = false;
      }
    },
    loadimg() {
      this.PitchHeight =
        this.$refs.detailtabs.$el.offsetTop - this.$refs.nav.$el.offsetHeight;
    }
  },
  mounted() {
    this.$bus.$on("islike", async id => {
      //查找id下的对象
      let iid = await this.pastedata.comment.find(item => {
        return item.id === id;
      });
      //查找iid下的kikeid数组中有没有登录者id
      let likeid = await iid.likeid.find(item => {
        return item === 1000;
      });
      //有登录者id
      if (likeid) {
        iid.like--; //再次点赞时取消点赞并点赞数减一
        let index = await iid.likeid.findIndex(item => {
          return item === 1000;
        }); //查找登录者id位置
        iid.likeid.splice(index, 1); //删除登录者id

        this.$store.commit(ICONSTATUS, false);
      } else {
        await homeModifyData({ iid: this.pastedata.id, id }).then(res => {
          console.log(res);
        });
        //没有登录者id
        iid.like++; //点赞数加一
        iid.likeid.unshift(1000); //将登录者id添加到数组中

        this.$store.commit(ICONSTATUS, true);
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
  height: calc(100vh - 32px);
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
</style>