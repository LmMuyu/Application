import Vue from "vue";
import axios from "axios";

Vue.use(axios);

export function homeRequest(config) {
  const instance = axios.create({
    // baseURL: baseURL,
    timeout: 5000
  });

  return instance(config);
}
