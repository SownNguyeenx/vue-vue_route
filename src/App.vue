<template>
  <div id="app">
    <div v-if="alert.message" :class="`alert ${alert.type}`">
      {{ alert.message }}
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "App",

  computed: {
    ...mapState({
      alert: (state) => state.alert,
    }),
  },

  methods: {
    ...mapActions({
      clearAlert: "alert/clear",
    }),
  },

  // watch: {
  //   $route() {
  //     this.clearAlert();
  //   },
  // },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
