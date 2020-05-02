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

//detail帖子数据
export function detaildata(params) {
  return request({
    url: "/detail/data",
    params,
  });
}

//点赞模块
export async function addLike(data) {
  return await request({
    method: "post",
    url: "/like/addLike",
    data,
  });
}
