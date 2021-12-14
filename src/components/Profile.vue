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
          <div style="font-size: 25px">
            title:
            <input
              class="inp-post title"
              type="text"
              v-model="post.title"
              placeholder="Caption"
            />
          </div>
        </div>
      </div>

      <textarea v-model="post.content" class="inp-post content"></textarea>

      <hr />
      <div style="display: flex; margin-left: 300px">
        <div
          class="tool-profile"
          @click="updatePost(post.id, post.title, post.content)"
        >
          Update
        </div>
        <div class="tool-profile">||</div>
        <div class="tool-profile" @click="delPost(post.id)">Delete</div>
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
      posts: {
        id: "",
        title: "",
        content: "",
        author: "",
        user_id: "",
      },
    };
  },

  beforeMount() {
    let token = localStorage.getItem("token");
    this.posts.user_id = jwt_decode(token).id;
    this.getPostByUserId();
  },

  methods: {
    getPostByUserId() {
      return axios
        .post("http://127.0.0.1:5000/get-post-userId", this.posts, {
          headers: authHeader(),
        })
        .then((response) => {
          this.posts = response.data.post;
          // console.log(response);
        })
        .catch((error) => console.log(error));
    },

    delPost(id) {
      return axios
        .post(
          "http://127.0.0.1:5000/del-post",
          { id },
          {
            headers: authHeader(),
          }
        )
        .then(() => location.reload())
        .catch((error) => console.log(error));
    },

    updatePost(id, title, content) {
      return axios
        .put(
          "http://127.0.0.1:5000/update-post",
          { id, title, content },
          {
            headers: authHeader(),
          }
        )
        .then(() => location.reload)
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.tool-profile {
  margin-left: 10px;
  /* margin-top: 10px; */
  margin-bottom: 10px;
  font-size: 25px;
  cursor: pointer;
}
.inp-post {
  border: 0;
}
.title {
  width: auto;
  font-size: 20px;
}
.content {
  width: 480px;
  margin: 5px;
}
</style>