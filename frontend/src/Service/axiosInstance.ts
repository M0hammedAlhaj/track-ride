import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";

const axiosWithAuth = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosWithAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const axiosPublic = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

export { axiosWithAuth, axiosPublic };
export default axiosWithAuth;
