import { request } from "./request";
export function DetailShareit(data) {
  return request({
    method: "post",
    url: "/detail/data/shareit/",
    data
  });
}
