import { request } from "./request";

export function DetailShareit(data) {
  return request({
    url: "/detail/data/shareit",
    method: "post",
    data,
  });
}

export function DetailCollect(data) {
  return request({
    method: "post",
    url: "/detail/collect",
    data,
  });
}
