import { request } from "./request";

export function hometData(page) {
  return Promise.all([
    new Promise((resolve) => {
      request({
        url: "/home/paste",
        params: {
          page,
        },
      }).then((value) => {
        resolve(value);
      });
    }),
    new Promise((resolve) => {
      request("/home/swiper").then((value) => {
        resolve(value);
      });
    }),
  ]);
}

export function pasteData(page) {
  return request({
    url: "/home/paste",
    params: {
      page,
    },
  });
}

export async function addLike(data) {
  const value = await request({
    method: "post",
    url: "/like/addLike",
    data,
  });

  return value;
}

export function deletelike(data) {
  return request({
    method: "post",
    url: "/like/deletelike",
    data,
  });
}
