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

export function DeleteCollect(data) {
  return request({
    method: "post",
    url: "/detail/deletecollect",
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

export async function detaildata(params) {
  const vlaue = await request({
    url: "/detail/data",
    params,
  });

  return vlaue;
}
