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
          <displayBar :paste="pastedata.comment" :istexts="true" :divider="true" :iSposts="false" />
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import detailContentBottom from "./childcomps/detailContentBottom";
import detailContentHaed from "./childcomps/detailContentHaed";
import detailContent from "./childcomps/detailContent";
import detailHeadColumn from "./childcomps/detailHeadColumn";
import detailTabs from "./childcomps/detailTabs";

import displayBar from "components/content/displaybar/displayBar";
import loadIng from "components/content/loading/loadIng";
import Scroll from "components/content/scroll/Scroll";

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
  data() {
    return {
      pastedata: {}, //数据
      loading: true, //加载显示
      PitchHeight: 0, //标签栏的距离高
      detailTabsDisplay: false //标签栏是否显示
    };
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
      //帖子底部值
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
  mounted() {
    this.$bus.$on("islikes", async id => {
      let iid = await this.pastedata["comment"].find(item => {
        return item.id === id;
      });

      iid.like++;
    });
  }
};
</script>

<style scoped>
#detail {
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 99;
  background-color: #fafafa;
  overflow: hidden;
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