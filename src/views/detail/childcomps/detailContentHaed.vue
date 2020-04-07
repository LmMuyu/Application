<template>
  <div class="contenthead">
    <v-list-item>
      <v-list-item-avatar color="grey">
        <img :src="pasteval.img" alt />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{pasteval.name}}</v-list-item-title>
        <v-list-item-subtitle>{{pasteval.date | dayDate}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
import { formatDate } from "common/formatDate";

export default {
  naem: "contenthead",
  props: {
    pasteval: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    dayDate(value) {
      let date = Number(value);
      let str = new Date(date);

      if (typeof date === "number") {
        return formatDate(str, "yyyy-MM-dd");
      } else {
        return value;
      }
    }
  }
};
</script>

<style scoped>
.contenthead {
  background-color: #ffffff;
}
</style>