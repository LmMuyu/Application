<template>
  <div class="content">
    <v-card max-width="1920" flat class="mx-auto">
      <p>
        <v-card-text>{{content.content}}</v-card-text>
        <v-img :src="content.image[0]" height="auto"></v-img>
        <v-img :src="content.image[1]" height="auto"></v-img>
        <v-img :src="content.image[2]" height="auto"></v-img>
      </p>
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
  }
};
</script>

<style  scoped>
</style>