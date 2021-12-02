<template>
  <div class="container" style="width: 1000px; margin: auto">
    <div class="header" style="display: flex">
      <div class="name">Name: {{ name }}</div>
      <div class="search" style="margin-left: 100px">
        <input class="search-box" type="text" placeholder="Search here..." />
      </div>
      <div class="nav-logout" @click="doLogout">Logout</div>
    </div>

    <div class="post">
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

    <div
      class="post"
      style="margin-top: 50px"
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
    </div>
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
      post: {
        title: "",
        contemt: "",
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

    submitPost() {},
  },
};
</script>

<style scoped>
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
  margin-top: 15px;
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
.nav-logout {
  margin-left: 150px;
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
