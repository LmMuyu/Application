import { homeRequest } from "./request";

export function hometData() {
  return Promise.all([
    new Promise(resolve => {
      homeRequest("/home/paste").then(value => {
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
