<template><div></div></template>

<script>
export default {
  name: "Home",
  methods: {
    logout() {
      localStorage.removeItem("uesr");
    },
  },
};
</script>

<style>
</style>