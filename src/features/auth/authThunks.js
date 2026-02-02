import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  fetchCurrentUser,
  logout as logoutApi,
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
