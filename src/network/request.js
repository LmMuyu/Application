import axios from "axios";

export function request(config) {
  const instance = axios.create({
    // baseURL: "http://localhost:8080",
    timeout: 5000,
  });

  instance.interceptors.response.use(
    (response) => {
      return new Promise((resolve) => {
        if (config.url == "/detail/data") {
          response.data.detaildata.favoritestatus = response.data.detaildata.status = false; //收藏状态 //点赞状态
        } else if (config.url === "/home/paste") {
          response.data.list.forEach((item) => {
            item.status = false; //点赞状态
          });
        }

        resolve(response.data);
      });
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance(config);
}
