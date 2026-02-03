import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  register,
  loadCurrentUser,
  logout,
  sendOtp,
  verifyOtp,
} from "./authThunks";

const initialState = {
  user: null,
  isAuthenticated: false,

  status: "idle",
  error: null,

  // 🔐 OTP FLOW
  otpLoading: false,
  otpSent: false,
  otpError: null,
};

const normalizeError = (payload) => {
  if (!payload) {
    return { message: "Something went wrong" };
  }

  // backend format
  if (payload.error) {
    return payload.error;
  }

  // fallback
  return { message: payload };
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthError(state) {
      state.error = null;
    },
    resetOtpState(state) {
      state.otpLoading = false;
      state.otpSent = false;
      state.otpError = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // =====================
      // LOAD CURRENT USER
      // =====================
      .addCase(loadCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = "idle";
      })
      .addCase(loadCurrentUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "idle";
      })

      // =====================
      // LOGIN
      // =====================
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = "idle";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "error";
        state.error = normalizeError(action.payload);
      })

      // =====================
      // REGISTER
      // =====================
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "error";
        state.error = normalizeError(action.payload);
      })

      // =====================
      // LOGOUT
      // =====================
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "idle";
      })

      // =====================
      // SEND OTP
      // =====================
      .addCase(sendOtp.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.otpLoading = false;
        state.otpSent = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = normalizeError(action.payload);
      })

      .addCase(verifyOtp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.status = "idle";
        state.isAuthenticated = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = "error";
        state.error = normalizeError(action.payload);
      });
  },
});
export const { resetAuthError, resetOtpState } = authSlice.actions;

export default authSlice.reducer;
