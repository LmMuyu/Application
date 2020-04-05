<template>
  <transition
    enter-active-class="animated fadeInRightBig faster"
    leave-active-class="animated fadeOutRightBig faster"
    :duration="{ enter: 250, leave: 100 }"
  >
    <div id="detail">
      <loadIng class="laoding" v-if="loading" />
      <detailHeadColumn class="nav" />
      <div v-if="!loading">
        <scroll class="scroll" ref="scroll">
          <detailContentHaed :pasteval="pasteheadval" />
          <detailContent :content="pastedata.content" class="content" />
          <detailContentBottom :pasteval="pastebottomval" class="contentbottom" />
          <detailTabs class="tabs" />
          <ul>
            <li>11</li>
            <li>12</li>
            <li>13</li>
            <li>14</li>
            <li>15</li>
            <li>16</li>
            <li>17</li>
            <li>18</li>
            <li>19</li>
            <li>110</li>
            <li>12</li>
            <li>13</li>
            <li>14</li>
            <li>15</li>
            <li>16</li>
            <li>17</li>
            <li>18</li>
            <li>19</li>
            <li>110</li>
            <li>12</li>
            <li>13</li>
            <li>14</li>
            <li>15</li>
            <li>16</li>
            <li>17</li>
            <li>18</li>
            <li>19</li>
            <li>110</li>
          </ul>
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
    loadIng,
    Scroll
  },
  data() {
    return {
      pastedata: {},
      loading: true
    };
  },
  created() {
    this.pastedata = this.$route.query.paste;
  },
  methods: {},
  mounted() {},
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
    }
  },
  watch: {
    pastedata(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loading = false;
      }
    },
    deep: true
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
  margin-top: 10px;
  background: #ffffff;
}
.contentbottom {
  background: #ffffff;
}
</style>