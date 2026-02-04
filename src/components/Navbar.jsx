import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { assets } from "../assets/assets";
import { useNavbar } from "../hooks/useNavbar";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const {
    menu,
    isOpen,
    showDropdown,
    setMenu,
    setIsOpen,
    setShowDropdown,
    handleScroll,
  } = useNavbar();

  const { auth, logout, openAuthModal } = useAuth();
  const { isAuthenticated } = auth;

  console.log("authen", isAuthenticated);

  const handleLogout = async () => {
    await logout();
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
          <div className="flex items-center gap-3">
            <button
              onClick={() => openAuthModal("login")}
              className="px-4 py-2 rounded-lg font-medium
               text-blue-600 border border-blue-300
               hover:bg-blue-50 hover:border-blue-400
               transition-all duration-200"
            >
              Login
            </button>

            <button
              onClick={() => openAuthModal("signup")}
              className="px-5 py-2 rounded-lg font-semibold
               bg-blue-600 text-white
               hover:bg-blue-700
               shadow-sm hover:shadow-md
               transition-all duration-200"
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
