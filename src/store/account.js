import { userService } from "../services/service";
import { router } from "../router";

const user = JSON.parse(localStorage.getItem("user"));
const state = user
  ? { status: { loggingIn: true }, user }
  : { status: {}, user: null };

const actions = {
  login({ dispatch, commit }, { username, password }) {
    commit("loginRequest", { username });

    userService.login(username, password).then(
      (user) => {
        commit("loginSuccess", user);
        router.push("/");
      },
      (error) => {
        commit("loginFailure", error);
        dispatch("alert/error", error, { root: true });
      }
    );
  },
  logout({ commit }) {
    userService.logout();
    commit("logout");
  },
  register({ dispatch, commit }, user) {
    commit("registerRequest", user);

    userService.register(user).then(
      (user) => {
        commit("registerSuccess", user);
        router.push("/login");
        setTimeout(() => {
          dispatch("alert/success", "Registration successful", { root: true });
        });
      },
      (error) => {
        commit("registerFailure");
        dispatch("alert/error", error, { root: true });
      }
    );
  },
};

const mutations = {
  loginRequest(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginSuccess(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  },
  registerRequest(state, user) {
    state.status = { registering: true };
    state.user = user;
  },
  registerSuccess(state, user) {
    state.status = {};
    state.user = user;
  },
  registerFailure(state, error) {
    state.status = {};
    state.error = error;
  },
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations,
};
