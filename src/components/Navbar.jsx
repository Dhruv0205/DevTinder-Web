import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
   
  const user = useSelector((store)=>store.user);

  return (
      <div className="navbar bg-base-content">
        <div className="flex-1">
          <a className="btn btn-ghost text-white text-2xl">👨‍💻DevMate</a>
        </div>

        { user && <div className="flex-none gap-2">
          <div className="form-control">
            <h1 className="text-black">Welcome Back, {user.firstName}</h1>
          </div>
          <div className="dropdown dropdown-end mx-11">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Photu hai bhai"
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
}
      </div>
  );
};

export default Navbar;
