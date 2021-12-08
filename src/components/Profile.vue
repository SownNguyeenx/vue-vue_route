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
        <span>Update</span>
        <div>||</div>
        <span>Delete</span>
      </div>
      <div>content:{{ post.content }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { authHeader } from "../helper/helper";
import jwt_decode from "jwt-decode";

export default {
  name: "Profile",

  data() {
    return {
      posts: [
        {
          id: "",
          title: "",
          content: "",
          author: "",
        },
      ],
      user_id: "",
    };
  },

  beforeMount() {
    this.getPostByUserId();
  },

  mounted() {
    let token = localStorage.getItem("token");
    this.user_id = jwt_decode(token).id;
    console.log(this.user_id);
  },

  methods: {
    getPostByUserId() {
      return axios
        .get(
          "http://127.0.0.1:5000/get-post-userId",
          { id: this.user_id },
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>