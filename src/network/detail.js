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

export function DetailModifyData(data) {
  return request({
    method: "post",
    url: "/home/paste/post",
    data,
  });
}

export function detaildata(params) {
  return request({
    url: "/detail/data",
    params,
  });
}
