<template>
  <div class="displayposts">
    <v-card max-width="1980" class="mx-auto" outlined>
      <v-list-item>
        <v-list-item-avatar color="grey">
          <img v-lazy="pastedata.img" alt />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">{{pastedata.name}}</v-list-item-title>
          <v-list-item-subtitle class="date">{{pastedata.date}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <div class="image">
        <v-img
          v-for="(item, index) in pastedata.content.image"
          :key="index"
          class="img"
          :src="item"
          height="100%"
          width="100%"
          @load="loadimage"
        ></v-img>
      </div>

      <v-card-text>{{pastedata.title}}</v-card-text>

      <v-card-actions>
        <v-btn text color="deep-purple accent-4">
          <span class="font">官方</span>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>赞</v-btn>
        <v-btn icon>踩</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "displayposts",
  props: {
    pastedata: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    loadimage() {
      this.$bus.$emit("imgload"); //src\views\home\Home.vue
    }
  }
};
</script>

<style scoped>
.font {
  background-color: #ecf0f1;
  padding: 4px 14px;
  border-radius: 5px;
}
.image {
  display: flex;
}
.image .img {
  flex: 1;
}
.date {
  font-size: 12px;
}
</style>