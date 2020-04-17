<template>
  <div class="headinfo">
    <v-list-item>
      <v-list-item-avatar color="teal" size="42">
        <img src="~assets/image/file/user.svg" alt />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline" @click="Router">点击登录</v-list-item-title>
        <div class="item">
          <v-list-item-subtitle>级别:</v-list-item-subtitle>
          <v-list-item-subtitle>帖子:</v-list-item-subtitle>
          <v-list-item-subtitle>回复</v-list-item-subtitle>
        </div>
      </v-list-item-content>
      <v-list-item-content class="listitem">
        <span class="font">编辑信息</span>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: "headinfo",
  methods: {
    Router() {
      this.$router.push("/loginreg").catch(err => {
        err;
      });
    }
  }
};
</script>

<style scoped>
.item {
  display: flex;
}
.item > div {
  flex: none;
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