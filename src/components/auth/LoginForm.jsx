import { useState } from "react";
import PropTypes from "prop-types";
import AuthError from "./AuthError";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = ({ onSuccess }) => {
  const { loginWithPassword, status, resetError } = useAuth();

  const [data, setData] = useState({ email: "", password: "" });

  const onChangeHandler = (e) => {
    resetError();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await loginWithPassword({
      usernameOrEmail: data.email,
      password: data.password,
    });

    if (res.meta.requestStatus === "fulfilled") {
      onSuccess();
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4"
      onClick={resetError}
      onFocus={resetError}
    >
      <input
        type="email"
        name="email"
        value={data.email}
        onChange={onChangeHandler}
        placeholder="Email"
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      />

      <input
        type="password"
        name="password"
        value={data.password}
        onChange={onChangeHandler}
        placeholder="Password"
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-3"
      />

      <AuthError />

      <button
        type="submit"
        disabled={status === "loading"}
        className={`w-full py-3 rounded-lg text-white font-medium ${
          status === "loading"
            ? "bg-red-300 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {status === "loading" ? "Please wait..." : "Login"}
      </button>

      <div className="flex items-center gap-3 my-2">
        <hr className="flex-grow border-gray-300" />
        <span className="text-gray-400 text-sm">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <button
        type="button"
        onClick={() =>
          (window.location.href = import.meta.env.VITE_GOOGLE_OAUTH_URL)
        }
        className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-5 h-5"
        />
        <span className="text-gray-700 font-medium">Sign in with Google</span>
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default LoginForm;
