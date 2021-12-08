<template>
  <div class="container" style="width: 1000px; margin: auto">
    <div class="header" style="display: flex">
      <div class="name">{{ name }}</div>
      <div class="search" style="margin-left: 100px">
        <input class="search-box" type="text" placeholder="Search here..." />
      </div>
      <div class="nav">
        <router-link to="/">Home</router-link>
      </div>
      <div class="nav">
        <router-link to="/profile">Profile</router-link>
      </div>
      <div class="nav" @click="doLogout">Logout</div>
    </div>

    <div class="post" id="add-post">
      <div class="task-bar">Status</div>
      <div>
        <input
          class="title-box"
          type="text"
          v-model="post.title"
          placeholder="Caption"
          required
        />
      </div>
      <div>
        <textarea
          class="post-box"
          name="post"
          placeholder="What's in your mind"
          v-model="post.content"
        ></textarea>
      </div>
      <div>
        <button class="submit-post" @click="submitPost">Post</button>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "Home",

  data() {
    return {
      name: "",
      post: {
        title: "",
        contemt: "",
        author: "",
        user_id: "",
      },
      refresh_token: {
        refresh_token: "",
      },
    };
  },

  beforeMount() {},

  mounted() {
    let token = localStorage.getItem("token");
    this.name = jwt_decode(token).name;
    this.post.author = this.name;
    this.post.user_id = jwt_decode(token).id;
    this.refresh_token.refresh_token = JSON.parse(
      localStorage.getItem("refresh_token")
    );
  },

  methods: {
    ...mapActions(["logout", "refresh_access_token", "authHeader"]),
    doLogout() {
      this.logout(this.refresh_token);
    },

    submitPost() {
      return axios
        .post("http://127.0.0.1:5000/add-post", this.post, {
          headers: this.authHeader(),
        })
        .then(() => {
          location.reload();
        })
        .catch((error) => console.log(error));
    },

    // check_refresh_token() {
    //   let refresh_token = JSON.parse(localStorage.getItem("refresh_token"));
    //   let token = JSON.parse(localStorage.getItem("token"));
    //   if (refresh_token) {
    //     if (!token) {
    //       this.refresh_access_token(this.refresh_token);
    //     }
    //   } else {
    //     this.logout();
    //   }
    // },
  },
};
</script>

<style>
</style>