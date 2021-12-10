<template>
  <div>
    <div
      class="post"
      style="margin-top: 25px"
      v-for="post in posts"
      :key="post.id"
    >
      <div style="display: flex">
        <img
          src="../assets/mini1.png"
          alt="image is here"
          id="profpic"
          style="margin: 10px"
        />
        <div>
          <div style="font-size: 25px">{{ post.author }}</div>
          <div style="font-size: 50px">title: {{ post.title }}</div>
        </div>
      </div>
      <div>content:{{ post.content }}</div>
      <hr />
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";
import { authHeader } from "../helper/helper";

export default {
  name: "Home",

  data() {
    return {
      name: "",
      posts: [
        {
          id: "",
          title: "",
          content: "",
          author: "",
          // user_id: "",
        },
      ],
      loadMore: true,
    };
  },

  beforeMount() {
    this.getAllPost();
  },

  mounted() {
    let token = localStorage.getItem("token");
    this.name = jwt_decode(token).name;
    this.posts.author = this.name;
    // this.posts.user_id = jwt_decode(token).id;
  },

  methods: {
    getAllPost() {
      return axios
        .get("http://127.0.0.1:5000/get-all-post", {
          headers: authHeader(),
        })
        .then((response) => {
          // console.log(response.data);
          this.posts = response.data.post;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>
