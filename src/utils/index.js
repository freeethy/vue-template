import store from "../store";

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, " ") +
      '"}'
  );
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function verifyAuth(code) {
  var list = [];
  list = store.getters.authList.concat(
    store.getters.deptList,
    store.getters.roleList
  );
  let index = list.findIndex(it => {
    return it === code;
  });
  return index > -1;
}

export function getQueryString(name, urlSearch) {
  if (!urlSearch) {
    return false;
  }
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = urlSearch.substr(1).match(reg);
  return r ? r[2] : false;
}

// 空字符串
export function isEmptyText(val) {
  return !val || !(val && val.trim());
}
