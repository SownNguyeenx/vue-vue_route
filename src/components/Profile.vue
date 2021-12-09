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
      <div style="display: flex; float: right">
        <div class="tool-profile" @click="updatePost">Update</div>
        <div class="tool-profile">||</div>
        <div class="tool-profile" @click="delPost">Delete</div>
      </div>
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
      user: {
        user_id: "",
      },
    };
  },

  beforeMount() {
    this.getPostByUserId();
  },

  mounted() {
    let token = localStorage.getItem("token");
    this.user.user_id = jwt_decode(token).id;
    console.log(this.user);
  },

  methods: {
    getPostByUserId() {
      return axios
        .get(
          "http://127.0.0.1:5000/get-post-userId",
          JSON.stringify(this.user),
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          this.posts = response.data.post;
          console.log(response);
        })
        .catch((error) => console.log(error));
    },

    delPost() {
      return axios
        .delete("http://127.0.0.1:5000/del_post", {
          headers: authHeader(),
        })
        .then()
        .catch((error) => console.log(error));
    },

    updatePost() {
      return axios
        .put("http://127.0.0.1:5000/update_post", {
          headers: authHeader(),
        })
        .then()
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.tool-profile {
  margin-left: 5px;
  /* margin-top: 10px; */
  font-size: 25px;
  cursor: pointer;
}
</style>