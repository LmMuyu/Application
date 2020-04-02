import { homeRequest } from "./request";

export function hometData(page) {
  return Promise.all([
    new Promise(resolve => {
      homeRequest({
        url: "/home/paste",
        params: {
          page
        }
      }).then(value => {
        resolve(value);
      });
    }),
    new Promise(resolve => {
      homeRequest("/home/swiper").then(value => {
        resolve(value);
      });
    })
  ]);
}

export function pasteData(page) {
  return homeRequest({
    url: "/home/paste",
    params: {
      page
    }
  });
}
