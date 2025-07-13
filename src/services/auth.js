import axios from "axios";

const API_URL_LOCAL = "http://192.168.18.25:3000/api";
// const API_URL_LIVE = process.env.NEXT_PUBLIC_BASE_URL;

const authApi = axios.create({
  baseURL: API_URL_LOCAL,
  withCredentials: false,
});

authApi.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("axios interceptor error", error);

    return Promise.reject(error);
  }
);

export default authApi;
