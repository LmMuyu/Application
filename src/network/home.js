import { request } from "./request";

export function hometData(page) {
  return Promise.all([
    new Promise(resolve => {
      request({
        url: "/home/paste",
        params: {
          page
        }
      }).then(value => {
        resolve(value);
      });
    }),
    new Promise(resolve => {
      request("/home/swiper").then(value => {
        resolve(value);
      });
    })
  ]);
}

export function pasteData(page) {
  return request({
    url: "/home/paste",
    params: {
      page
    }
  });
}

export function homeModifyData(data) {
  return request({
    method: "post",
    url: "/home/paste/post",
    data
  });
}

export function detaildata(params) {
  return request({
    url: "/detail/data",
    params
  });
}
