<template>
  <div id="file">
    <!--footer 头部 start -->
    <header>
      <FileHeadInfo :headinfo="headinfo" class="info" />
      <v-divider></v-divider>
    </header>
    <!--footer 头部 end -->
    <FunctionalSection class="funsec" ref="funsec" :items="funseclist" :title="'功能'" />
    <transition
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutRight"
      :duration="{ enter: 260, leave: 100 }"
    >
      <router-view class="chilview"></router-view>
    </transition>
  </div>
</template>

<script>
import FunctionalSection from "components/content/functionalsection/FunctionalSection";

import FileHeadInfo from "./childcomps/FileHeadInfo";

import { mapGetters } from "vuex";

export default {
  name: "file",
  components: {
    FileHeadInfo,
    FunctionalSection
  },
  data() {
    return {
      funseclist: [
        {
          text: "我的收藏",
          image: require("../../assets/image/file/collect.svg"),
          path: "collect"
        },
        {
          text: "游览记录",
          image: require("../../assets/image/file/recording.svg")
        },
        {
          text: "退出登录",
          image: require("../../assets/image/file/deletelogin.svg"),
          path: "deletelogin"
        }
      ]
    };
  },
  methods: {
    headinfos() {
      class headinfo {
        constructor({ name, image, posts, grade, attention }) {
          this.name = name; //名称
          this.image = image; //头像
          this.posts = posts.length; //帖子数量
          this.grade = grade; //级别
          this.attention = attention.length; //关注数量
        }
      }

      return new headinfo(this.userinfo);
    }
  },
  computed: {
    ...mapGetters(["userinfo"]),
    headinfo() {
      let info = null;
      localStorage.getItem("token") ? (info = this.headinfos()) : (info = {});

      return info;
    }
  }
};
</script>

<style scoped>
.funsec {
  margin-top: 15px;
}
.info::before {
  /* box-shadow: 0 1px 0px #fafafa; */
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: #e4e4e4;
  -webkit-transform-origin: left bottom;
  transform-origin: left bottom;
}
.chilview {
  height: 100vh;
  background: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
</style>