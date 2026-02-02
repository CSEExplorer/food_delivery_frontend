import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendOtp,
  verifyOtp,
  loadCurrentUser,
} from "../../features/auth/authThunks";
import { resetAuthError } from "../../features/auth/authSlice";
import PropTypes from "prop-types";

const OtpLogin = ({ onSuccess, onBack }) => {
  const dispatch = useDispatch();

  const { otpLoading, otpError, status, error } = useSelector(
    (state) => state.auth,
  );

  const [step, setStep] = useState("REQUEST"); // REQUEST | VERIFY
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    if (!email) return;
    dispatch(resetAuthError());

    const result = await dispatch(sendOtp(email));
    if (sendOtp.fulfilled.match(result)) {
      setStep("VERIFY");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) return;

    const result = await dispatch(verifyOtp({ email, otp }));
    if (verifyOtp.fulfilled.match(result)) {
      await dispatch(loadCurrentUser());
      onSuccess?.();
    }
  };

  return (
    <div className="space-y-4">
      {step === "REQUEST" && (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border rounded-lg px-4 py-3"
          />

          <button
            onClick={handleSendOtp}
            disabled={otpLoading}
            className="w-full bg-red-500 text-white py-3 rounded-lg"
          >
            {otpLoading ? "Sending..." : "Send OTP"}
          </button>
        </>
      )}

      {step === "VERIFY" && (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full border rounded-lg px-4 py-3"
          />

          <button
            onClick={handleVerifyOtp}
            disabled={status === "loading"}
            className="w-full bg-green-500 text-white py-3 rounded-lg"
          >
            {status === "loading" ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            onClick={() => setStep("REQUEST")}
            className="text-sm text-gray-500"
          >
            Change email
          </button>
        </>
      )}

      {(otpError || error) && (
        <p className="text-red-500 text-sm">{otpError || error}</p>
      )}

      <button onClick={onBack} className="text-sm text-gray-400 underline">
        Back to login
      </button>
    </div>
  );
};

OtpLogin.propTypes = {
  onSuccess: PropTypes.func,
  onBack: PropTypes.func.isRequired,
};

export default OtpLogin;
