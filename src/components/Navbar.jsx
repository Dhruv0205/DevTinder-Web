import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for the mobile menu

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

  // Don't show the Navbar on the Login page
  if (location.pathname === "/Login") {
    return null;
  }

  const clickHandler = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/Login");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="navbar bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 shadow-lg p-4 sticky top-0 z-50">
      <div className="flex-1">
        {/* Link to the feed page */}
        <Link to="/Feed" className="btn btn-ghost text-white text-3xl font-extrabold tracking-wide transition-transform transform hover:scale-110 hover:text-pink-200">
          👨‍💻DevMate
        </Link>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="flex-none lg:hidden">
        <button
          onClick={toggleMobileMenu}
          className="btn btn-ghost text-white hover:bg-pink-200"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Desktop Menu */}
      {user && (
        <div className="hidden lg:flex lg:flex-none lg:gap-6">
          <div className="form-control">
            <h1 className="text-white font-semibold text-xl tracking-wide transition-transform transform hover:scale-105">
              Welcome back, {user.firstName} 👋
            </h1>
          </div>

          <div className="dropdown dropdown-end relative">
            <div
              tabIndex={0}
              role="button"
              onClick={toggleDropdown}
              className="btn btn-ghost btn-circle avatar transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl hover:bg-pink-200"
            >
              <div className="w-14 h-14 rounded-full border-4 border-white shadow-lg overflow-hidden">
                <img alt="Profile" src={user.photoUrl} />
              </div>
            </div>

            {isDropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-lg shadow-xl mt-3 w-52 p-4 transition-all duration-300 transform scale-95 hover:scale-100"
              >
                <li>
                  <Link
                    to="/Profile"
                    onClick={closeDropdown}
                    className="text-teal-500 hover:text-teal-700 font-semibold py-2 px-3 rounded-md transition duration-200 ease-in-out"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Connection"
                    onClick={closeDropdown}
                    className="text-teal-500 hover:text-teal-700 font-semibold py-2 px-3 rounded-md transition duration-200 ease-in-out"
                  >
                    Connections
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Request"
                    onClick={closeDropdown}
                    className="text-teal-500 hover:text-teal-700 font-semibold py-2 px-3 rounded-md transition duration-200 ease-in-out"
                  >
                    Requests
                  </Link>
                </li>
                <li>
                  <a
                    onClick={() => {
                      clickHandler();
                      closeDropdown();
                    }}
                    className="text-red-500 hover:text-red-700 font-semibold py-2 px-3 rounded-md transition duration-200 ease-in-out"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {user && isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 right-0 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 w-full shadow-lg p-4 max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-white font-semibold text-xl tracking-wide">
              Welcome back, {user.firstName} 👋
            </h1>

            <div className="w-14 h-14 rounded-full border-4 border-white shadow-lg overflow-hidden">
              <img alt="Profile" src={user.photoUrl} />
            </div>

            <ul className="flex flex-col gap-4 w-full">
              <li>
                <Link
                  to="/Profile"
                  onClick={() => {
                    closeDropdown();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-white hover:text-pink-200 font-semibold py-2 px-3 rounded-md transition duration-200 ease-in-out"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/Connection"
                  onClick={() => {
                    closeDropdown();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-white hover:text-pink-200 font-semibold py-2 px-3 rounded-md transition duration-200 ease-in-out"
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/Request"
                  onClick={() => {
                    closeDropdown();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-white hover:text-pink-200 font-semibold py-2 px-3 rounded-md transition duration-200 ease-in-out"
                >
                  Requests
                </Link>
              </li>
              <li>
                <a
                  onClick={() => {
                    clickHandler();
                    closeDropdown();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-red-500 hover:text-red-700 font-semibold py-2 px-3 rounded-md transition duration-200 ease-in-out"
                >
                  Logout
                </a>
              </li>
              {/* Add a gap below the last item for spacing */}
              <li className="h-8"></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
