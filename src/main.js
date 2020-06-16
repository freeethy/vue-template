import Vue from "vue";
import App from "@/App.vue";
import VueRouter from "vue-router";
import { getRouters } from "@/router";
// import router from "@/router";
import store from "@/store";
import "@/api/index";
import "@/icons/index";
import "@/plugins/element.js";

import "@/styles/index.scss";
import { verifyAuth, getQueryString } from "./utils/index.js";
Vue.prototype.$verifyAuth = verifyAuth;

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
Vue.config.productionTip = false;

let code = getQueryString("code", window.location.search) || "";
console.log(code);

store.dispatch("getUserInfo", { code }).then(res => {
  const { moduleCodes, buttons } = res;
  let routes = getRouters({ moduleCodes, buttons });
  store.state.router = routes;
  let routers = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes: routes,
    scrollBehavior() {
      document.querySelector(".container") &&
        document.querySelector(".container").scrollTo(0, 0);
    }
  });
  new Vue({
    router: routers,
    store,
    render: h => h(App)
  }).$mount("#app");
});
