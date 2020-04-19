<template>
  <div id="file">
    <FileHeadInfo :headinfo="headinfo" />
  </div>
</template>

<script>
import FileHeadInfo from "./childcomps/FileHeadInfo";
import { mapGetters } from "vuex";

export default {
  name: "file",
  components: {
    FileHeadInfo
  },
  data() {
    return {};
  },
  watch: {
    userinfo() {
      console.log(123);
    }
  },
  computed: {
    ...mapGetters(["userinfo"]),
    headinfo() {
      let info = null;

      if (localStorage.getItem("token")) {
        class headinfo {
          constructor({ name, image, posts, grade, attention }) {
            this.name = name; //名称
            this.image = image; //头像
            this.posts = posts.length; //帖子数量
            this.grade = grade; //级别
            this.attention = attention.length; //关注数量
          }
        }
        info = new headinfo(this.userinfo);
      } else {
        info = {};
      }

      return info;
    }
  }
};
</script>

<style scoped>
</style>