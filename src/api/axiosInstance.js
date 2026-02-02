import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  withCredentials: true, // 🔥 REQUIRED for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// =======================
// RESPONSE INTERCEPTOR
// =======================
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized & not already retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/login") &&
      !originalRequest.url.includes("/api/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        // 🔄 Ask backend to refresh using refreshToken cookie
        await axiosInstance.post("/api/auth/refresh");

        // 🔁 Retry original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 🔥 Refresh failed → force logout
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
