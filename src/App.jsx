import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginPopUp from "./components/auth/LoginPopUp";
import { loadCurrentUser } from "./features/auth/authThunks";

function App() {
  /**
   * authModal:
   *  - null     → closed
   *  - "login"  → login popup
   *  - "signup" → signup popup
   */
  const [authModal, setAuthModal] = useState(null);

  const dispatch = useDispatch();

  // Load user on app start (refresh-safe auth)
  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [dispatch]);

  return (
    <>
      {/* Auth Modal */}
      {authModal && <LoginPopUp mode={authModal} setShowLogin={setAuthModal} />}

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
