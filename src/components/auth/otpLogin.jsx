import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetAuthError } from "../../features/auth/authSlice";
import PropTypes from "prop-types";

const OtpLogin = ({ onSuccess, onBack }) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState("REQUEST"); // REQUEST | VERIFY
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    setError("");
    dispatch(resetAuthError());
    setLoading(true);

    try {
      // 🔥 API call placeholder
      // await dispatch(sendOtp(email));
      setStep("VERIFY");
    } catch (e) {
      setError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      setError("Invalid OTP");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // 🔥 API call placeholder
      // await dispatch(verifyOtp({ email, otp }));
      onSuccess?.();
    } catch (e) {
      setError("Invalid or expired OTP");
    } finally {
      setLoading(false);
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
            disabled={loading}
            className="w-full bg-red-500 text-white py-3 rounded-lg"
          >
            {loading ? "Sending..." : "Send OTP"}
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
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 rounded-lg"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            onClick={() => setStep("REQUEST")}
            className="text-sm text-gray-500"
          >
            Change email
          </button>
        </>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

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
