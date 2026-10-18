// client/src/api/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? "http://localhost:5000/api" : "/api"),
  timeout: 10000,
});

// Attach token if present
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
