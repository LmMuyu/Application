<template>
  <div class="content">
    <v-card max-width="1920" flat class="mx-auto">
      <div class="contents">
        <v-card-text>{{content.content}}</v-card-text>
        <div v-for="(item, index) in this.content.image" :key="index">
          <img :src="item" alt @load="loadimg" />
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "detailcontent",
  props: {
    content: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    loadimg() {
      this.$emit("loadimg");
    }
  }
};
</script>

<style  scoped>
.v-card__subtitle, .v-card__text, .v-card__title{
  padding: 0;
}
.contents{
  padding: 0 16px;
}
</style>