<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.header {
  position: fixed;
  width: 1000px;
  height: 70px;
  background: #147064;
  top: 0;
  color: white;
}
.name {
  margin-left: 10px;
  font-size: 50px;
  width: 300px;
}
.search {
  margin-top: 10px;
}
.search-box {
  width: 300px;
  height: 30px;
  border-radius: 15px;
  padding: 5px;
  outline: none;
}
.post {
  display: block;
  width: 500px;
  margin: auto;
  margin-top: 100px;
  -webkit-box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
}
.task-bar {
  font-size: 30px;
  margin: 10px;
  padding: auto;
}
.post-box {
  width: 480px;
  height: 100px;
  border: white;
  background: #e9f0f2;
  margin-left: 10px;
  margin-top: 10px;
}
.submit-post {
  background: #147064;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 20px;
  width: 60px;
  margin-left: 430px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.nav {
  margin-left: 15px;
  margin-top: 20px;
  font-size: 25px;
}
.title-box {
  width: 250px;
  height: 30px;
  border-radius: 15px;
  padding: 5px;
  outline: none;
  margin: 10px;
}
</style>
