import axios from "axios";
import QS from "qs";

import Vue from "vue";
import { Message } from "element-ui";

const $axios = axios.create({
  // 设置超时时间
  timeout: 20000,
  // 基础url，会在请求url中自动添加前置链接
  baseURL: ""
});

$axios.defaults.withCredentials = true; // 让ajax携带cookie

Vue.prototype.$axios = $axios;
// 请求拦截器
$axios.interceptors.request.use(
  config => {
    if (config.urlPrefix === undefined) {
      config.url = process.env.VUE_APP_API_BASE_URL + config.url;
    } else {
      config.url = config.urlPrefix + config.url;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 响应拦截器
$axios.interceptors.response.use(
  response => {
    const code = response.status;

    if (typeof response.data == "string") {
      let msg = response.data;
      Message({
        message: msg || "Error",
        type: "error",
        duration: 5 * 1000
      });
      return Promise.reject({ msg });
    } else if ((code >= 200 && code < 300) || code === 304) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
        case 403:
          Message({
            message: "登录信息过期，请关闭页面重新进入" || "Error",
            type: "error",
            duration: 5 * 1000
          });
          break;
        case 404:
          Message({
            message: "网络请求不存在",
            type: "error",
            duration: 5 * 1000
          });
          break;
        default:
          Message({
            message: error.response.data.message || "异常",
            type: "error",
            duration: 5 * 1000
          });
      }
    } else {
      // 请求超时或者网络有问题
      if (error.message.includes("timeout")) {
        Message({
          message: error.msg || "请求超时！请检查网络是否正常",
          type: "error",
          duration: 5 * 1000
        });
      } else if (error.msg) {
        Message({
          message: error.msg || "请求失败，请检查网络是否已连接",
          type: "error",
          duration: 5 * 1000
        });
      } else {
        Message({
          message: error.msg || "请求失败，请检查网络是否已连接",
          type: "error",
          duration: 5 * 1000
        });
      }
    }
    return Promise.reject(error);
  }
);

export const post = (url, params = {}, config = {}) => {
  return $axios({
    method: "post",
    url,
    data: params,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    ...config
  });
};

export const $delete = (url, params = {}, config = {}) => {
  return $axios({
    method: "delete",
    url,
    data: params,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    ...config
  });
};

export const get = (url, params = {}, config = {}) => {
  const query = QS.stringify(params);
  if (query) {
    url += `?${query}`;
  }
  return $axios({
    method: "get",
    url,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    ...config
  });
};

export const put = (url, params = {}, config = {}) => {
  return $axios({
    method: "put",
    url,
    data: params,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    ...config
  });
};

Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$delete = $delete;
Vue.prototype.$put = put;

export default $axios;
