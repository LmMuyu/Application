<template>
  <div class="head">
    <layoutNav class="headnav">
      <div slot="left" class="left" @click="router">
        <div class="back">
          <img src="~assets/image/detail/return.svg" alt />
        </div>
      </div>
      <div slot="center" class="center">
        <div>官方</div>
      </div>
    </layoutNav>
  </div>
</template>

<script>
import layoutNav from "components/content/layoutnav/layoutNav.vue";

export default {
  components: {
    layoutNav
  },
  methods: {
    router() {
      this.$router.push("/home").catch(err => {
        err;
      });
    }
  }
};
</script>

<style scoped>
.left,
.center {
  display: flex;
  align-items: center;
  height: 32px;
}
.left img {
  width: 27px;
  height: 27px;
}
.center {
  justify-content: center;
}
.head {
  padding: 4px;
}
.back {
  width: 32px;
}
</style>