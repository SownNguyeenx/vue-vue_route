<template>
  <div>
    <div>Name: {{ name }}</div>
    <div class="post_show">
      <ul>
        <li v-for="post in posts" :key="post.id">
          {{ post.author }} : {{ post.title }}<br />
          {{ post.content }}
        </li>
      </ul>
    </div>
    <button @click="getAllPost">click</button>
    <button @click="doLogout">Logout</button>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";
// import { userService } from "../services/service";

export default {
  name: "Home",

  data() {
    return {
      name: "",
      posts: {
        id: "",
        title: "",
        content: "",
        author: "",
      },
    };
  },

  beforeMount() {
    this.getAllPost();
  },

  mounted() {
    let token = localStorage.getItem("token");
    this.name = jwt_decode(token).name;
  },

  methods: {
    doLogout() {
      localStorage.removeItem("token");
      location.reload(true);
      this.getAllPost;
    },

    authHeader() {
      let token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        return { Authorization: "Bearer " + token };
      } else {
        return {};
      }
    },

    getAllPost() {
      return axios
        .get("http://127.0.0.1:5000/get-all-post", {
          headers: this.authHeader(),
        })
        .then((response) => {
          this.posts = response.data.post;
          console.log(this.posts);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped></style>
