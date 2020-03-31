import axios from "axios";

export function homeRequest(config) {
  const instance = axios.create({
    // baseURL: "http://localhost:8080",
    timeout: 5000
  });

  instance.interceptors.response.use(
    response => {
      return response.data;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return instance(config);
}
