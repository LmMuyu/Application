<template>
  <div></div>
</template>

<script>
export default {
  name: "virtuallistshow",
  props: {
    index: {
      type: Number
    },
    source: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>