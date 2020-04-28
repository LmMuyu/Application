<template>
  <div class="contentshow" @click="detailPath">
    <v-card class="mx-auto" tile max-width="100%" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="headinfo">
            <v-avatar color="indigo" size="36">
              <span class="white--text headline">
                <img :src="collectpost.img" alt />
              </span>
            </v-avatar>
            <div class="overline mb-4">{{collectpost.name}}</div>
          </div>
          <v-list-item-subtitle>{{collectpost.title}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey">
          <img :src="collectpost.postimage" alt />
        </v-list-item-avatar>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "CollectContentShow",
  props: {
    collectinfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      collectpost: this.collectinfo //收藏的帖子
    };
  },
  methods: {
    detailPath() {
      this.$router
        .push({
          path: "/detail",
          query: {
            id: this.collectpost.id
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
.theme--light.v-card.v-card--outlined {
  border: none;
}
.headinfo {
  display: flex;
}
</style>
