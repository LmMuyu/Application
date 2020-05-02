<template>
  <div class="postshow">
    <PostTemplateContentHaed :pasteval="headdata" />
    <PostTemplateContent :content="content" @click.native="Router" />
    <PostTemplateContentBottom
      :pasteval="bottomdata"
      :commentlength="post.comment.length"
      :id="post.id"
      :status="post.status"
    />
  </div>
</template>

<script>
import PostTemplateContentBottom from "components/content/posttemplate/PostTemplateContentBottom";
import PostTemplateContentHaed from "components/content/posttemplate/PostTemplateContentHaed";
import PostTemplateContent from "components/content/posttemplate/PostTemplateContent";

import { STOREPOST } from "@/store/mutations-types";
import { debounce } from "common/debounce";

export default {
  name: "HomePostShow",
  components: {
    PostTemplateContentBottom,
    PostTemplateContentHaed,
    PostTemplateContent
  },
  props: {
    PostData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      post: this.PostData
    };
  },
  computed: {
    //头部数据
    headdata() {
      class head {
        constructor({ img, name, date }) {
          this.img = img; //头像
          this.name = name; //名称
          this.date = date; //发帖时间
        }
      }
      return new head(this.post);
    },
    content() {
      class content {
        constructor({ content, id, title }) {
          this.title = title;
          this.image = content.image;
          this.id = id;
        }
      }
      return new content(this.post);
    },
    // 底部数据
    bottomdata() {
      class bottom {
        constructor({ like, plate }) {
          this.like = like; //点赞数量
          this.plate = plate; //板块
        }
      }
      return new bottom(this.post);
    }
  },
  mounted() {
    this.$bus.$on("jumpcomment", () => {
      let path = this.$route.path;
      if (path !== "/home") return;

      let _debounce = debounce(this.storePost, 500);
      _debounce(); //储存每次跳转到详情页的帖子

      this.$router
        .push({
          path: "/detail",
          query: {
            id: this.post.id,
            goto: true
          }
        })
        .catch(err => {
          err;
        });
    });
  },
  methods: {
    storePost() {
      this.$store.commit(STOREPOST, this.post);
    },
    Router() {
      this.storePost(); //储存每次跳转到详情页的帖子

      this.$router
        .push({
          path: "/detail",
          query: {
            id: this.post.id,
            goto: false
          }
        })
        .catch(err => {
          err;
        });
    }
  }
};
</script>

<style scoped>
</style>