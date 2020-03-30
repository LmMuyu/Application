<template>
  <div id="home">
    <Tabs :backcolor="'#22a6b3'" :title="title" />
    <homeSearch />
  </div>
</template>

<script>
import homeSearch from "./childcomps/homeSearch";

import Tabs from "components/commom/Tabs/Tabs";

import { homeSwiper } from "network/home";

export default {
  name: "home",
  components: {
    Tabs,
    homeSearch
  },
  data() {
    return {
      title: ["官方", "社区"]
    };
  },
  created() {
    this.homeSwiper();
  },
  methods: {
    homeSwiper() {
      homeSwiper().then(value => {
        console.log(value);
      });
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>