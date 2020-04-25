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
          response.data.detaildata.favoritestatus = false;
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
