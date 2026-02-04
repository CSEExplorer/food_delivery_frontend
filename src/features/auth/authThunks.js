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
 */
export const login = createAsyncThunk(
  "auth/login",
  async ({ usernameOrEmail, password }, { rejectWithValue }) => {
    try {
      await loginUser({ usernameOrEmail, password });
      const response = await fetchCurrentUser();
      // console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

/**
 * 🆕 REGISTER
 */
export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      await registerUser(data);
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

/**
 * 👤 LOAD CURRENT USER
 */
export const loadCurrentUser = createAsyncThunk(
  "auth/loadCurrentUser",
  async (_, { rejectWithValue }) => {
    console.log("🔥 loadCurrentUser THUNK STARTED");
    try {
      const response = await fetchCurrentUser();
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

/**
 * 🚪 LOGOUT
 */
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

/**
 * 📧 SEND OTP
 */
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await sendOtpApi(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

/**
 * 🔢 VERIFY OTP
 */
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      await verifyOtpApi(email, otp);
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
