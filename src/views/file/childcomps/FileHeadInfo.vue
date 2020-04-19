<template>
  <div class="headinfo">
    <v-list-item>
      <v-list-item-avatar color="teal" size="42">
        <img :src="headinfo.image" alt v-if="headinfo.image" />
        <img src="~assets/image/file/user.svg" v-else alt />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title
          class="headline"
          @click="Router"
        >{{headinfo.name ? headinfo.name : "点击登录"}}</v-list-item-title>
        <div class="item" v-if="Object.keys(headinfo).length !== 0">
          <v-list-item-subtitle>级别:{{headinfo.grade}}</v-list-item-subtitle>
          <v-list-item-subtitle>帖子:{{headinfo.posts}}</v-list-item-subtitle>
          <v-list-item-subtitle>回复:{{headinfo.attention}}</v-list-item-subtitle>
        </div>
      </v-list-item-content>
      <v-list-item-content class="listitem" v-if="Object.keys(headinfo).length !== 0">
        <span class="font">编辑信息</span>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: "headinfo",
  props: {
    headinfo: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    Router() {
      this.$router.push("/loginreg").catch(err => {
        err;
      });
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to);
    console.log(from);
    next();
  }
};
</script>

<style scoped>
.item {
  display: flex;
}
.item > div {
  flex: 1;
}
.listitem {
  display: flex;
  justify-content: center;
  align-items: center;
}
.font {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: none;
  border: 1px solid #0984e3;
  padding: 4px 16px;
  color: #74b9ff;
}
</style>