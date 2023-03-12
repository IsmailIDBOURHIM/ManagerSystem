<template>
  <!-- <nav><router-link to="/">Home</router-link></nav> -->
  <HomeView />
</template>
<script>
import HomeView from "./views/HomeView.vue";
export default {
  components: {
    HomeView,
  },
};
</script>
<style lang="scss">
@import "./css/style.css";
</style>
