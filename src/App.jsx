import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AuthModal from "./components/auth/AuthModal";
import { useAuthBootstrap } from "./hooks/useAuthBootstrap";

function App() {
  /**
   * authModal:
   *  - null     → closed
   *  - "login"  → login screen
   *  - "signup" → signup screen
   */
  const [authModal, setAuthModal] = useState(null);

  // 🔐 Load user on app start (refresh-safe auth)
  useAuthBootstrap();

  return (
    <>
      {/* Auth Modal */}
      {authModal && <AuthModal mode={authModal} setShowLogin={setAuthModal} />}

      {/* Navbar */}
      <Navbar setShowLogin={setAuthModal} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
