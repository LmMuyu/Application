<template>
  <div class="contentbottom">
    <v-card-actions>
      <div
        v-if="'plate' in pasteval "
        text
        class="font"
        color="deep-purple accent-4"
      >{{pasteval.plate}}</div>
      <div text color="deep-purple accent-4"></div>
      <v-spacer></v-spacer>
      <div class="comment" @click="jumpcomment">
        <img src="~assets/image/commom/comment.svg" alt />
        <span class="like length">{{ commentlength | filterlength }}</span>
      </div>
      <div class="icon">
        <img src="~assets/image/commom/likeup.svg" @click="addLike" alt />
        <span class="like">{{pasteval.like}}</span>
      </div>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "PostTemplateContentBottom",
  filters: {
    filterlength(value) {
      const values = Number(value);

      if (values === 0) {
        return "";
      } else if (values > 99) {
        return "+" + values;
      } else {
        return values;
      }
    }
  },
  props: {
    pasteval: {
      type: Object,
      default() {
        return {};
      }
    },
    commentlength: {
      type: Number,
      default: 0
    },
    id: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      path: "",
      iid: this.id
    };
  },
  created() {
    this.path = this.$route.path;
  },
  methods: {
    jumpcomment() {
      this.$bus.$emit("jumpcomment"); //views/home/childcomps/HomePostShow.vue
    },
    addLike() {
      this.$bus.$emit("addLike",this.iid)
    }
  }
};
</script>

<style scoped>
.contentbottom {
  background: #fff;
}
.icon {
  padding: 0 10px;
  display: flex;
  align-items: center;
}
.icon img,
.comment img {
  width: 24px;
  height: 24px;
}
.font {
  background-color: #ecf0f1;
  border-radius: 5px;
  padding: 3px 4px;
}
.like {
  color: #2c3e50;
  font-size: 12px;
  margin-left: 4px;
}
.comment {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 3px;
  margin-right: 5px;
}
.comment span {
  font-size: 12px;
}
.length {
  position: relative;
  bottom: 2px;
}
</style>