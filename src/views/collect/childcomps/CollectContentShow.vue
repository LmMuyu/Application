<template>
  <div class="contentshow">
    <v-card class="mx-auto" tile max-width="100%" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="headinfo">
            <div class="overline mb-4">{{collectpost.name}}</div>
            <span>13</span>
          </div>
          <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey">
          <img :src="collectpost.img" alt />
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn text>Button</v-btn>
        <v-btn text>Button</v-btn>
      </v-card-actions>
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
  }
};
</script>

<style scoped>
.theme--light.v-card.v-card--outlined {
  border: none;
}
.headinfo{
  display: flex;
  
}
</style>
