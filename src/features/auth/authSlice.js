import { createSlice } from "@reduxjs/toolkit";
import { login, register, loadCurrentUser, logout } from "./authThunks";

const initialState = {
  user: null,
  isAuthenticated: false,
  status: "idle", // idle | loading | error
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthError(state) {
      state.error = null;
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
        state.error = action.payload;
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
        state.error = action.payload;
      })

      // =====================
      // LOGOUT
      // =====================
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "idle";
      });
  },
});

export const { resetAuthError } = authSlice.actions;
export default authSlice.reducer;
