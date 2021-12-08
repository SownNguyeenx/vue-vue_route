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
import { mapActions } from "vuex";
export default {
  name: "Profile",

  data() {
    return {
      userId: "",
      posts: [
        {
          id: "",
          title: "",
          content: "",
          author: "",
        },
      ],
    };
  },

  methods: {
    ...mapActions(["authHeader"]),
    getPostByUserId() {
      return axios
        .get("http://127.0.0.1:5000/get-post-userId", this.userId, {
          headers: this.authHeader(),
        })
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