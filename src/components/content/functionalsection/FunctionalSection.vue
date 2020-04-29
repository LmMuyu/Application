<template>
  <div class="funsec">
    <v-card class="mx-auto isscard" max-width="100%" tile>
      <v-list flat :elevation="0">
        <v-subheader>{{title}}</v-subheader>
        <v-list-item-group v-model="item" color="primary">
          <div
            v-for="(item, index) in fealist"
            :key="index"
            class="group"
            @click="Router(item.path)"
          >
            <v-list-item v-if="pathshow(item.path)">
              <img :src="item.image" alt class="image" />
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
              <div>
                <img src="~assets/image/file/arrowright.svg" alt />
              </div>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { DELETELOGIN } from "@/store/mutations-types";
import { mapGetters } from "vuex";

export default {
  name: "FunctionalSection",
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
  computed: {
    ...mapGetters(["token"]),
    pathshow() {
      return function(path) {
        return !this.token && path === "deletelogin" ? false : true;
      };
    }
  },
  methods: {
    Router(path) {
      if (path === "deletelogin") {
        if (!localStorage.getItem("token")) return;

        this.$dialog
          .confirm({
            message: "确定要退出登录?"
          })
          .then(() => {
            this.$store.commit(DELETELOGIN);
          })
          .catch(() => {
            // on cancel
          });
      } else {
        this.$router.push(`/file/${path}`).catch(err => {
          err;
        });
      }
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