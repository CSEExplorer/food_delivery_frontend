import { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";

const OtpLogin = ({ onSuccess, onBack }) => {
  const {
    sendOtp,
    verifyOtp,
    otpLoading,
    status,
    otpError,
    error,
    resetError,
  } = useAuth();

  const [step, setStep] = useState("REQUEST");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    resetError();
    const res = await sendOtp(email);
    if (res.meta.requestStatus === "fulfilled") {
      setStep("VERIFY");
    }
  };

  const handleVerifyOtp = async () => {
    const res = await verifyOtp({ email, otp });
    if (res.meta.requestStatus === "fulfilled") {
      onSuccess();
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
