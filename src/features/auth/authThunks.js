import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  fetchCurrentUser,
  logout as logoutApi,
  sendOtp as sendOtpApi,
  verifyOtp as verifyOtpApi,
} from "../../api/authApi";

/**
 * 🔐 LOGIN
 * Cookies are set by backend
 */
export const login = createAsyncThunk(
  "auth/login",
  async ({ usernameOrEmail, password }, { rejectWithValue }) => {
    try {
      await loginUser({ usernameOrEmail, password });

      // After login, immediately fetch user
      const response = await fetchCurrentUser();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  },
);

/**
 * 🆕 REGISTER
 * Does NOT auto-login (matches your current behavior)
 */
export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      await registerUser(data);
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  },
);

/**
 * 👤 LOAD CURRENT USER
 * Called on app start / refresh
 */
export const loadCurrentUser = createAsyncThunk(
  "auth/loadCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCurrentUser();
      return response.data;
    } catch (error) {
      return rejectWithValue("Not authenticated");
    }
  },
);

/**
 * 🚪 LOGOUT
 * Backend clears cookies
 */
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      return true;
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  },
);

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await sendOtpApi(email);
      return response.data;
      // expected: { message: "OTP sent successfully" }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send OTP",
      );
    }
  },
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      await verifyOtpApi(email, otp);
      return true; // cookie is set, no payload needed
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Invalid OTP");
    }
  },
);
