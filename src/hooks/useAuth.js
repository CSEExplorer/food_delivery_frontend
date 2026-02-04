import { useDispatch, useSelector } from "react-redux";
import {
  login,
  register,
  sendOtp,
  verifyOtp,
  logout,
  loadCurrentUser,
} from "../features/auth/authThunks";
import { resetAuthError } from "../features/auth/authSlice";
import {
  selectAuth,
  selectAuthStatus,
  selectAuthError,
  selectOtpStatus,
  selectOtpError,
  selectAuthUserId,
  selectShowAuthModal,
  selectAuthMode,
} from "../features/auth/authSelectors";

import { openAuthModal, closeAuthModal } from "../features/auth/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();

  return {
    auth: useSelector(selectAuth),
    status: useSelector(selectAuthStatus),
    error: useSelector(selectAuthError),
    otpLoading: useSelector(selectOtpStatus),
    otpError: useSelector(selectOtpError),
    id: useSelector(selectAuthUserId),
    resetError: () => dispatch(resetAuthError()),

    logout: () => dispatch(logout()),

    loginWithPassword: (payload) => dispatch(login(payload)),

    signup: (payload) => dispatch(register(payload)),

    sendOtp: (email) => dispatch(sendOtp(email)),

    showAuthModal: useSelector(selectShowAuthModal),
    authMode: useSelector(selectAuthMode),

    verifyOtp: async (payload) => {
      const res = await dispatch(verifyOtp(payload));
      if (verifyOtp.fulfilled.match(res)) {
        await dispatch(loadCurrentUser());
      }
      return res;
    },

    openAuthModal: (mode = "login") => dispatch(openAuthModal(mode)),
    closeAuthModal: () => dispatch(closeAuthModal()),
  };
};
