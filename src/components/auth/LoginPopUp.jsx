import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import OtpLogin from "./otpLogin";
import PropTypes from "prop-types";

const LoginPopUp = ({ mode, setShowLogin }) => {
  // 🔹 AUTH METHOD
  // PASSWORD → Email + Password
  // OTP → Email + OTP (login OR auto-signup)
  const [loginMethod, setLoginMethod] = useState("PASSWORD");

  // 🔹 SCREEN MODE
  // Login | Sign Up (only affects PASSWORD method)
  const [currState, setCurrState] = useState(
    mode === "signup" ? "Sign Up" : "Login",
  );

  // Sync when Navbar changes mode
  useEffect(() => {
    setCurrState(mode === "signup" ? "Sign Up" : "Login");
    setLoginMethod("PASSWORD");
  }, [mode]);

  // Disable body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[9999]">
      <div className="bg-white/95 w-[90%] max-w-md p-6 rounded-2xl shadow-2xl">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">
            {loginMethod === "OTP" ? "Continue with OTP" : currState}
          </h2>

          <img
            src={assets.cross_icon}
            alt="close"
            className="w-4 cursor-pointer"
            onClick={() => setShowLogin(null)}
          />
        </div>

        {/* BODY */}

        {/* PASSWORD LOGIN */}
        {loginMethod === "PASSWORD" && currState === "Login" && (
          <LoginForm onSuccess={() => setShowLogin(null)} />
        )}

        {/* PASSWORD SIGNUP */}
        {loginMethod === "PASSWORD" && currState === "Sign Up" && (
          <SignupForm onSwitchToLogin={() => setCurrState("Login")} />
        )}

        {/* OTP LOGIN / SIGNUP */}
        {loginMethod === "OTP" && (
          <OtpLogin
            onSuccess={() => setShowLogin(null)}
            onBack={() => setLoginMethod("PASSWORD")}
          />
        )}

        {/* OR DIVIDER */}
        {loginMethod === "PASSWORD" && (
          <div className="flex items-center my-1"></div>
        )}

        {/* CONTINUE WITH OTP – ALWAYS AVAILABLE */}
        {loginMethod === "PASSWORD" && (
          <button
            type="button"
            onClick={() => setLoginMethod("OTP")}
            className="w-full border border-gray-300 py-3 rounded-lg 
                       font-medium hover:bg-gray-50 transition"
          >
            Continue with OTP
          </button>
        )}

        {/* FOOTER SWITCH (PASSWORD ONLY) */}
        {loginMethod === "PASSWORD" && (
          <p className="text-center mt-4 text-sm">
            {currState === "Login" ? (
              <>
                Don’t have an account?{" "}
                <span
                  className="text-[#FF6347] cursor-pointer font-semibold"
                  onClick={() => setCurrState("Sign Up")}
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="text-[#FF6347] cursor-pointer font-semibold"
                  onClick={() => setCurrState("Login")}
                >
                  Login
                </span>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

LoginPopUp.propTypes = {
  mode: PropTypes.oneOf(["login", "signup"]).isRequired,
  setShowLogin: PropTypes.func.isRequired,
};

export default LoginPopUp;
