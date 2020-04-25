<template>
  <div id="collect">
    <!--header 头部 start-->
    <header>
      <CollectHead class="collecthead" />
    </header>
    <!--header 头部 end-->
    <CollectContent />
  </div>
</template>

<script>
import CollectContent from "./childcomps/CollectContent";
import CollectHead from "./childcomps/CollectHead";

export default {
  name: "collect",
  components: {
    CollectContent,
    CollectHead
  }
};
</script>

<style scoped>
#collect {
  background: #ffffff;
}
.collecthead {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: #ffffff;
}
</style>