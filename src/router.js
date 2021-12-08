import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";
import Profile from "./components/Profile.vue";
import Home_header from "./components/Home_header.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    // { path: "/", component: Home },
    { path: "/login", component: Login },
    // { path: "/profile", component: Profile },

    {
      path: "/",
      component: Home_header,
      children: [
        { path: "/", component: Home, name: "Home" },
        { path: "/profile", component: Profile },
      ],
    },

    { path: "*", redirect: "/" },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPage = ["/login", "/register"];
  const authRequired = !publicPage.includes(to.path);
  const loggedIn = localStorage.getItem("token");

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  next();
});
