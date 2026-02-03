import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import OtpLogin from "./otpLogin";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types";

const AUTH_METHOD = {
  PASSWORD: "PASSWORD",
  OTP: "OTP",
};

const SCREEN = {
  LOGIN: "Login",
  SIGNUP: "Sign Up",
};

const AuthModal = ({ mode, setShowLogin }) => {
  const [authMethod, setAuthMethod] = useState(AUTH_METHOD.PASSWORD);
  const [screen, setScreen] = useState(mode === "signup" ? "Sign Up" : "Login");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[9999]">
      <div className="bg-white/95 w-[90%] max-w-md p-6 rounded-2xl shadow-2xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">
            {authMethod === AUTH_METHOD.OTP ? "Continue with OTP" : screen}
          </h2>
          <img
            src={assets.cross_icon}
            className="w-4 cursor-pointer"
            onClick={() => setShowLogin(null)}
          />
        </div>

        {authMethod === AUTH_METHOD.PASSWORD && screen === "Login" && (
          <LoginForm onSuccess={() => setShowLogin(null)} />
        )}

        {authMethod === AUTH_METHOD.PASSWORD && screen === "Sign Up" && (
          <SignupForm onSwitchToLogin={() => setScreen("Login")} />
        )}

        {authMethod === AUTH_METHOD.OTP && (
          <OtpLogin
            onSuccess={() => setShowLogin(null)}
            onBack={() => setAuthMethod(AUTH_METHOD.PASSWORD)}
          />
        )}

        {authMethod === AUTH_METHOD.PASSWORD && (
          <div className="mt-4 space-y-3">
            <button
              onClick={() => setAuthMethod(AUTH_METHOD.OTP)}
              className="w-full border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50"
            >
              Continue with OTP
            </button>
            {/* Login ↔ Register Switch */}
            <p className="text-center text-sm">
              {screen === SCREEN.LOGIN ? (
                <>
                  New user?{" "}
                  <span
                    className="text-[#FF6347] cursor-pointer font-semibold"
                    onClick={() => setScreen(SCREEN.SIGNUP)}
                  >
                    Register
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    className="text-[#FF6347] cursor-pointer font-semibold"
                    onClick={() => setScreen(SCREEN.LOGIN)}
                  >
                    Login
                  </span>
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

AuthModal.propTypes = {
  mode: PropTypes.oneOf(["login", "signup"]).isRequired,
  setShowLogin: PropTypes.func.isRequired,
};

export default AuthModal;
