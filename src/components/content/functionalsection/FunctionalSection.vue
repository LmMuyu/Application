<template>
  <div class="funsec">
    <v-card class="mx-auto isscard" max-width="100%" tile>
      <v-list flat :elevation="0">
        <v-subheader>{{title}}</v-subheader>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item
            v-for="(item, index) in fealist"
            :key="index"
            class="group"
            @click="Router(item.path)"
          >
            <img :src="item.image" alt class="image" />
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
            <div>
              <img src="~assets/image/file/arrowright.svg" alt />
            </div>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "funsec",
  props: {
    title: {
      type: String,
      default: ""
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      item: 1,
      fealist: this.items
    };
  },
  methods: {
    Router(path) {
      this.$router.push(`/file/${path}`).catch(err => {
        err;
      });
    }
  }
};
</script>

<style scoped>
.isscard {
  box-shadow: none;
}
.group {
  border-bottom: 1px solid #f0f0f0;
}
.image {
  width: 28px;
  height: 28px;
}
</style>