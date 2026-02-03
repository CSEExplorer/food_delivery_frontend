import { useSelector } from "react-redux";

const AuthError = () => {
  const { status, error } = useSelector((state) => state.auth);
  console.log(status, error);
  if (status !== "error" || !error) return null;

  return (
    <div className="bg-red-50 border border-red-300 text-red-600 text-sm p-3 rounded-lg">
      {/* Main error message */}
      {error && <p className="font-medium mb-2 text-center">{error.message}</p>}
    </div>
  );
};

export default AuthError;
