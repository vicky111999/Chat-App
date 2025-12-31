import axios from "axios";

const api = axios.create({
  baseURL: "https://chat-app-f1j8.onrender.com",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 403) {
      try {
        await api.post("/api/auth/refresh");
        return api(err.config);
      } catch {
        window.location.href = "/";
      }
    }
    return Promise.reject(err);
    
  }
);

export default api;
