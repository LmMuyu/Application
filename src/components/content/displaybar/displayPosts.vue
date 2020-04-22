<template>
  <div class="displayposts">
    <v-card max-width="1980" flat class="mx-auto" tile outlined>
      <div>
        <v-list-item>
          <v-list-item-avatar color="grey">
            <img :src="pastedata.img" alt />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline">{{pastedata.name}}</v-list-item-title>
            <v-list-item-subtitle class="date">{{pastedata.date | dayDate}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <div class="image" v-if=" 'content' in pastedata">
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
      </div>
      <v-card-actions class="actions">
        <div text color="deep-purple accent-4" v-if="'plate' in pastedata">
          <span class="font">{{pastedata.plate}}</span>
        </div>
        <v-spacer></v-spacer>
        <div v-if=" istexts || false ">
          <span class="istexts">回复</span>
        </div>
        <div class="icon">
          <v-icon
            :color="pastedata.likeststuc ? '#3498db':'#dcdde1' "
            small
            @click=" iSlike "
          >mdi-thumb-up</v-icon>
          <span class="like">{{ pastedata.like | thumblike }}</span>
        </div>
      </v-card-actions>
      <v-divider v-if=" divider || false "></v-divider>
    </v-card>
  </div>
</template>

<script>
import { formatDate } from "common/formatDate";
// import { mapGetters } from "vuex";

export default {
  name: "displayposts",
  filters: {
    dayDate(value) {
      let date = Number(value);
      let str = new Date(date);

      if (typeof date === "number") {
        return formatDate(str, "yyyy-MM-dd");
      } else {
        return value;
      }
    },
    thumblike(value) {
      let values = Number(value);

      if (values === 0) {
        return "";
      } else {
        return values;
      }
    }
  },
  props: {
    pastedata: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  inject: {
    divider: {
      //是否显示回复
      default: false
    },
    istexts: {
      //是否显示分割线
      default: false
    }
  },
  methods: {
    loadimage() {
      this.$bus.$emit("imgload"); //src\views\home\Home.vue
    },
    iSlike() {
      this.$bus.$emit("islike", this.pastedata.id); //src\views\detail\Detail.vue
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
  flex-wrap: wrap;
  padding: 0 16px;
}
.image .img {
  flex: 1;
}
.date {
  font-size: 12px;
}
.icon {
  padding: 0 10px;
}
.like {
  color: #dcdde1;
  font-size: 12px;
  margin-left: 4px;
}
.theme--light.v-card.v-card--outlined {
  border: 0;
}
.istexts {
  font-size: 12px;
  position: relative;
  top: 0.8px;
}
.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 8px 16px;
}
</style>