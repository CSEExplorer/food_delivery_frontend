import axiosInstance from "./axiosInstance";

export const loginUser = (data) => {
  return axiosInstance.post("/api/auth/jwt/login", data);
};

export const registerUser = (data) => {
  return axiosInstance.post("/api/auth/jwt/register", data);
};

export const fetchCurrentUser = () => {
  return axiosInstance.get("/api/auth/jwt/me");
};

export const refreshAccessToken = () => {
  return axiosInstance.post("/api/auth/jwt/refresh");
};

export const logout = () => {
  return axiosInstance.post("/api/auth/jwt/logout");
};
