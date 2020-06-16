import Vue from "vue";
import Vuex from "vuex";
import * as getters from "./getters.js";
import modules from "./modules";

Vue.use(Vuex);

const store = new Vuex.Store({
  getters,
  modules,
  strict: false
});

// 支持热加载
if (module.hot) {
  Object.keys(modules).forEach(modName => {
    module.hot.accept(["./modules/" + modName], () => {
      const _module = require("./modules/" + modName).default;
      const o = {};
      o["modules_" + modName] = _module;
      store.hotUpdate(o);
    });
  });
}

export default store;
