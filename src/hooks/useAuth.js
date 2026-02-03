import { useDispatch, useSelector } from "react-redux";
import {
  login,
  register,
  sendOtp,
  verifyOtp,
  loadCurrentUser,
} from "../features/auth/authThunks";
import { resetAuthError } from "../features/auth/authSlice";
import {
  selectAuth,
  selectAuthStatus,
  selectAuthError,
  selectOtpStatus,
  selectOtpError,
} from "../features/auth/authSelectors";

export const useAuth = () => {
  const dispatch = useDispatch();

  return {
    auth: useSelector(selectAuth),
    status: useSelector(selectAuthStatus),
    error: useSelector(selectAuthError),
    otpLoading: useSelector(selectOtpStatus),
    otpError: useSelector(selectOtpError),

    resetError: () => dispatch(resetAuthError()),

    loginWithPassword: (payload) => dispatch(login(payload)),

    signup: (payload) => dispatch(register(payload)),

    sendOtp: (email) => dispatch(sendOtp(email)),

    verifyOtp: async (payload) => {
      const res = await dispatch(verifyOtp(payload));
      if (verifyOtp.fulfilled.match(res)) {
        await dispatch(loadCurrentUser());
      }
      return res;
    },
  };
};
