<template>
  <div>
    <VirtualList
      :keeps="5"
      :data-key="'uid'"
      :data-sources="items"
      :data-component="itemComponent"
      :style="virualHeihgt"
    />
  </div>
</template>

<script>
import VirtualList from "vue-virtual-scroll-list";

import VirualListShow from "./VirualListShow";

export default {
  name: "virtuallist",
  components: {
    VirtualList
  },
  data() {
    return {
      itemComponent: VirualListShow,
      items: [],
      virualHeihgt: {
        height: 360 + "px",
        "overflow-y": "auto"
      }
    };
  }
};
</script>

<style scoped>
</style>