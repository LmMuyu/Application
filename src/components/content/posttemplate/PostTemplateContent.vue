<template>
  <div class="content">
    <v-card max-width="1920" flat class="mx-auto">
      <div class="contents">
        <v-card-text>{{content.content || content.title}}</v-card-text>
        <div :class="path !== '/detail' ? 'homecontent': '' ">
          <div v-for="(item, index) in content.image" :key="index">
            <img :src="item" alt @load="loadimg" />
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "PostTemplateContent",
  props: {
    content: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      path: ""
    };
  },
  created() {
    this.path = this.$route.path;
  },
  methods: {
    loadimg() {
      this.$emit("loadimg");
    }
  }
};
</script>

<style  scoped>
.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 0;
}
.contents {
  padding: 0 16px;
}
.homecontent {
  display: flex;
  flex-wrap: wrap;
}
</style>