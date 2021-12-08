import Vue from "vue";
import axios from "axios";
import Vuex from "vuex";
import { router } from "../router";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    status: {},
  },
  mutations: {
    loginRequest(state) {
      state.status = { loggingIn: true };
    },
    loginSuccess(state) {
      state.status = { loggedIn: true };
    },
    registerRequest(state) {
      state.status = { registering: true };
    },
    registerSuccess(state) {
      state.status = {};
    },
    logoutSuccess(state) {
      state.status = {};
    },
  },
  actions: {
    login({ commit }, user) {
      commit("loginRequest");
      return (
        axios
          .post("http://127.0.0.1:5000/login", JSON.stringify(user), {
            headers: { "Content-Type": "application/json" },
          })
          // .then(handleResponse)
          .then((response) => {
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem(
              "refresh_token",
              JSON.stringify(response.data.token)
            );
            router.push("/");
            console.log(response);
            commit("loginSuccess");
          })
          .catch((error) => console.log(error))
      );
    },

    register({ commit }, user) {
      commit("registerRequest");
      return (
        axios
          .post("http://127.0.0.1:5000/signup", JSON.stringify(user), {
            headers: { "Content-Type": "application/json" },
          })
          // .then(handleResponse)
          .then((response) => {
            commit("registerSuccess");
            console.log(response);
          })
          .catch((error) => console.log(error))
      );
    },

    logout({ commit }, refresh_token) {
      return axios
        .post("http://127.0.0.1:5000/logout", JSON.stringify(refresh_token), {
          headers: { "Content-Type": "application/json" },
        })
        .then(() => {
          localStorage.clear();
          location.reload();
          commit("logoutSuccess");
        })
        .catch((error) => console.log(error));
    },

    refresh_access_token(refresh_token) {
      return axios
        .post(
          "http://127.0.0.1:5000/refresh_token",
          JSON.stringify(refresh_token)
        )
        .then((response) =>
          localStorage.setItem("token", JSON.stringify(response.data.token))
        )
        .catch((error) => console.log(error));
    },

    handleResponse(response) {
      return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
          if (response.status === 401) {
            // tự động logout nếu response 401 được trả về từ api
            // this.logout();
            location.reload(true);
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        return data;
      });
    },
  },
});
