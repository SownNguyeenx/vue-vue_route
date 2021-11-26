import Vue from "vue";
import VueRouter from "vue-router";
import About from "./components/About.vue";
import Home from "./components/HelloWorld.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Home },
    { path: "/login", component: About },

    // { path: '/login', component: Login },
    { path: "*", redirect: "/" },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPage = ["/login", "/register"];
  const authRequired = !publicPage.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  next();
});
