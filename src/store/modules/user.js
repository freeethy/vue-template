import { getUserInfo } from "@/api/common.js";
const state = {
  userInfo: {}
};
const getters = {};
const mutations = {
  SET_USER_INFO: (state, data) => {
    return (state.userInfo = data);
  }
};
const actions = {
  async getUserInfo({ commit }, data) {
    let res = await getUserInfo(data);
    if (res.code === 0) {
      (() => {
        commit("SET_USER_INFO", res.data);
      })();
    }
    return { ...res.data };
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
