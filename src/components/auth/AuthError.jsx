import { useSelector } from "react-redux";

const AuthError = () => {
  const { status, error } = useSelector((state) => state.auth);

  if (status !== "error" || !error?.message) return null;

  return (
    <div className="bg-red-50 border border-red-300 text-red-600 text-sm p-2 rounded-lg text-center">
      {error.message}
    </div>
  );
};

export default AuthError;
