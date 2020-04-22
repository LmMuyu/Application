import { request } from "./request";

export function postLogin(data) {
  return request({
    method: "post",
    url: "/registered",
    data,
  });
}

export function loginPost(data) {
  return request({
    method: "post",
    url: "/login",
    data,
  });
}
