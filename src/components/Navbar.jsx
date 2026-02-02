import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authThunks";
import PropTypes from "prop-types";
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    setMenu(
      location.pathname === "/" ? "home" : location.pathname.replace("/", ""),
    );
  }, [location]);

  const handleScroll = (sectionId) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = async () => {
    await dispatch(logout());
    setShowDropdown(false);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <Link to="/" onClick={() => setMenu("home")}>
        <img src={assets.logo} alt="Logo" className="w-24 cursor-pointer" />
      </Link>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        <img src={assets.menu_icon} alt="Menu" className="w-6" />
      </button>

      {/* Navigation */}
      <ul
        className={`fixed md:relative bg-white md:bg-transparent w-full md:w-auto 
        left-0 top-16 md:top-auto flex flex-col md:flex-row items-center 
        md:space-x-6 text-gray-700 font-semibold transition-all duration-300 
        shadow-lg md:shadow-none ${isOpen ? "flex" : "hidden md:flex"}`}
      >
        <li
          className={`px-4 py-2 ${
            menu === "home" ? "text-blue-500" : "hover:text-blue-400"
          }`}
        >
          <Link to="/" onClick={() => setMenu("home")}>
            Home
          </Link>
        </li>

        <li
          className={`px-4 py-2 cursor-pointer ${
            menu === "menu" ? "text-blue-500" : "hover:text-blue-400"
          }`}
          onClick={() => handleScroll("menu")}
        >
          Menu
        </li>

        <li
          className={`px-4 py-2 cursor-pointer ${
            menu === "mobile-app" ? "text-blue-500" : "hover:text-blue-400"
          }`}
          onClick={() => handleScroll("mobile-app")}
        >
          Mobile App
        </li>

        <li
          className={`px-4 py-2 cursor-pointer ${
            menu === "contact-us" ? "text-blue-500" : "hover:text-blue-400"
          }`}
          onClick={() => handleScroll("contact-us")}
        >
          Contact Us
        </li>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <img
          src={assets.search_icon}
          alt="Search"
          className="w-6 cursor-pointer"
        />

        <Link to="/cart">
          <img
            src={assets.bag_icon}
            alt="Cart"
            className="w-6 cursor-pointer"
          />
        </Link>

        {/* AUTH AREA */}
        {!isAuthenticated ? (
          <div className="flex gap-3">
            <button
              onClick={() => setShowLogin("login")}
              className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg
                         hover:bg-blue-50 transition"
            >
              Login
            </button>

            <button
              onClick={() => setShowLogin("signup")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg
                         hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="relative">
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2
                         border-gray-300 hover:border-blue-500"
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border">
                <ul className="text-sm text-gray-700">
                  <li className="p-2 flex gap-2 hover:bg-gray-100 cursor-pointer">
                    <img src={assets.bag_icon} alt="Orders" className="w-5" />
                    <span>Orders</span>
                  </li>

                  <hr />

                  <li
                    onClick={handleLogout}
                    className="p-2 flex gap-2 text-red-500
                               hover:bg-red-100 cursor-pointer"
                  >
                    <img
                      src={assets.logout_icon}
                      alt="Logout"
                      className="w-5"
                    />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default Navbar;
