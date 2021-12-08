import Vue from "vue";
import { axios } from "vue/types/umd";
import Vuex from "vuex";

Vue.use(Vuex);

export const account = new Vuex.Store({
  namespaced: true,
  state: {
    posts: {},
  },
  getters: {},
  mutations: {
    getPost(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    getAllPost({ commit }) {
      return axios
        .get("http://127.0.0.1:5000/get-all-post", {
          headers: this.authHeader(),
        })
        .then((response) => {
          commit("getPost", response.data.posts);
        })
        .catch((error) => console.log(error));
    },
  },
});
