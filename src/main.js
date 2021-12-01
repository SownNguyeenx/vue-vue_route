import Vue from "vue";
import App from "./App";
import { router } from "./router";
// import { store } from "./store";
import { store } from "./store/index";
// import VeeValidate from "vee-validate";

// Vue.config.productionTip = false;
// Vue.use(VeeValidate);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
