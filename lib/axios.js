import axios from "axios";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: { "content-type": "application/json" },
});

instance.interceptors.request.use(
  function (config) {
    if (localStorage.getItem("token")) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 && localStorage.getItem("user")) {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      return (window.location.href = "/");
    }

    return Promise.reject(error);
  }
);

export default instance;
