export const selectAuth = (state) => state.auth;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthUserId = (state) => state.auth.user?.id;
export const selectAuthEmail = (state) => state.auth.user?.email;

export const selectOtpStatus = (state) => state.auth.otpLoading;
export const selectOtpError = (state) => state.auth.otpError;
export const selectShowAuthModal = (state) => state.auth.showAuthModal;

export const selectAuthMode = (state) => state.auth.authMode;
