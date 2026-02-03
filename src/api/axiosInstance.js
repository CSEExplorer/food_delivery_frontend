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

// What this code is designed to do
// This code exists so that when the access token (stored in a cookie) expires,
//  it is automatically refreshed using the refresh token, and the user does NOT have to log in again.

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // console.log("FULL ERROR:", error);
    // console.log("ERROR CONFIG:", error.config);
    // console.log("ERROR RESPONSE:", error.response);
    const originalRequest = error.config;

    // If unauthorized & not already retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/jwt/login") &&
      !originalRequest.url.includes("/api/auth/jwt/refresh")
    ) {
      originalRequest._retry = true;

      try {
        // 🔄 Ask backend to refresh using refreshToken cookie
        await axiosInstance.post("/api/auth/jwt/refresh");

        // 🔁 Retry original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        try {
          await axiosInstance.post("/api/auth/logout");
        } finally {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
