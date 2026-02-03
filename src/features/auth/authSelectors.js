export const selectAuth = (state) => state.auth;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export const selectOtpStatus = (state) => state.auth.otpLoading;
export const selectOtpError = (state) => state.auth.otpError;
