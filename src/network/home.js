import { homeRequest } from "./request";

export function homeSwiper() {
  return homeRequest({
    method: "get",
    url: "/home/swiper"
  });
}
