<template>
  <div class="collectcontent">
    <Scroll class="scroll" :bounce="false">
      <CollectContentShow
        class="contentshow"
        v-for="(item, index) in usercollect"
        :key="index"
        :collectinfo="item"
      />
    </Scroll>
  </div>
</template>

<script>
import Scroll from "components/content/scroll/Scroll";

import CollectContentShow from "./CollectContentShow";

import { mapGetters } from "vuex";

export default {
  name: "CollectContent",
  components: {
    CollectContentShow,
    Scroll
  },
  computed: {
    ...mapGetters(["usercollect"])
  }
};
</script>

<style scoped>
.collectcontent{
 margin-top: 42px;
}
.contentshow {
  margin-top: 15px;
  height: 100%;
  border-top: 1px solid #bdc3c7;
  border-bottom: 1px solid #bdc3c7;
}
.scroll {
  height: calc(100vh - 42px);
}
</style>