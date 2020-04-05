<template>
  <div contentbottom>
    <v-card-actions>
      <div text class="font" color="deep-purple accent-4">{{pasteval.plate}}</div>
      <div text color="deep-purple accent-4">Bookmark</div>
      <v-spacer></v-spacer>
      <div class="comment">
        <img class="like" src="~assets/image/detail/comment.svg" alt />
      </div>
      <div class="icon">
        <v-icon color="#dcdde1" small>mdi-thumb-up</v-icon>
        <span class="like">{{pasteval.like}}</span>
      </div>
      <div class="icon">
        <v-icon color="#dcdde1" small>mdi-thumb-down</v-icon>
      </div>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "contentbottom",
  props: {
    pasteval: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.icon {
  padding: 0 10px;
}
.font {
  background-color: #ecf0f1;
  border-radius: 5px;
  padding: 3px 4px;
}
.like {
  color: #dcdde1;
  font-size: 12px;
  margin-left: 4px;
}
.comment {
  display: flex;
  align-items: center;
  position: relative;
  top: 3px;
  margin-right: 5px;
}
</style>