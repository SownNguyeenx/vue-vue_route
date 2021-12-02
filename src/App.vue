<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import { mapState, mapActions } from "vuex";

export default {
  name: "App",

  // computed: {
  //   ...mapState({
  //     alert: (state) => state.alert,
  //   }),
  // },

  // methods: {
  //   ...mapActions({
  //     clearAlert: "alert/clear",
  //   }),
  // },

  // watch: {
  //   $route() {
  //     this.clearAlert();
  //   },
  // },
};
</script>

<style scoped>
#app {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: "Jost", sans-serif;
  background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
}
</style>
