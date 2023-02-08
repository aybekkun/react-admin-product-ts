import axios, {  InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";

const $host = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

$authHost.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  (config.headers as AxiosRequestHeaders).authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF5YmVrIiwiaWF0IjoxNjc0Mzk4NjY3fQ.UXUWCE2ycb96sVmjey3Bc9pd01YqMmiHpjU2ttLwjJ0`;
  return config;
});
//${window.localStorage.getItem("token")}
export { $host, $authHost };
