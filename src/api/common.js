import { get } from "./index";

export function getUserInfo(params) {
  return get(`/login/infos`, params);
}
