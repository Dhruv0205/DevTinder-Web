import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const location = useLocation(); // Get the current route

  // Don't show the Navbar on the Login page
  if (location.pathname === "/Login") {
    return null; // Don't render anything if on the login page
  }

  const clickHandler = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/Login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 shadow-lg p-4 sticky top-0 z-50">
      <div className="flex-1">
        <a className="btn btn-ghost text-white text-3xl font-extrabold tracking-wide transition-transform transform hover:scale-110 hover:text-pink-200">
          👨‍💻DevMate
        </a>
      </div>

      {user && (
        <div className="flex-none gap-6">
          {/* Welcome Text */}
          <div className="form-control">
            <h1 className="text-white font-semibold text-xl tracking-wide transition-transform transform hover:scale-105">
              Welcome back, {user.firstName} 👋
            </h1>
          </div>

          {/* User Avatar and Dropdown */}
          <div className="dropdown dropdown-end relative">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl hover:bg-pink-200"
            >
              <div className="w-14 h-14 rounded-full border-4 border-white shadow-lg overflow-hidden">
                <img alt="Profile" src={user.photoUrl} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-lg shadow-xl mt-3 w-52 p-4 transition-all duration-300 transform scale-95 hover:scale-100"
            >
              <li>
                <Link
                  to="/Profile"
                  className="text-teal-500 hover:text-teal-700 font-semibold py-2 px-3 rounded-md transition duration-200 ease-in-out"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/Connection"
                  className="text-teal-500 hover:text-teal-700 font-semibold py-2 px-3 rounded-md transition duration-200 ease-in-out"
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/Request"
                  className="text-teal-500 hover:text-teal-700 font-semibold py-2 px-3 rounded-md transition duration-200 ease-in-out"
                >
                  Requests
                </Link>
              </li>
              <li>
                <a
                  onClick={clickHandler}
                  className="text-red-500 hover:text-red-700 font-semibold py-2 px-3 rounded-md transition duration-200 ease-in-out"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
