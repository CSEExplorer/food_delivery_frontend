import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AuthModal from "./components/auth/AuthModal";
import ProfilePage from "./components/profile/ProfilePage";
import ProtectedRoute from "./utils/ProtectedRoute";

import { useAuthBootstrap } from "./hooks/useAuthBootstrap";
import { useAuth } from "./hooks/useAuth";

function App() {
  console.log("App mounted");

  // 🔐 Load user on app start (refresh-safe auth)
  useAuthBootstrap();

  // 🔁 Global auth state (Redux)
  const { showAuthModal, authMode, closeAuthModal } = useAuth();

  return (
    <>
      {/* 🌍 Global Auth Modal */}
      {showAuthModal && (
        <AuthModal mode={authMode} setShowLogin={closeAuthModal} />
      )}

      {/* Navbar (no local auth state anymore) */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
