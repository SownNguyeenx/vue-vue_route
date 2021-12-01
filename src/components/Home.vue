<template>
  <div>
    <button @click="Logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: "Home",

  methods: {
    // ...mapActions({ logout: "account/logout" }),
    Logout(event) {
      event.preventDefault();
      localStorage.removeItem("token");
      location.reload(true);
    },
  },
};
</script>

<style></style>
