import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      console.log("User added successfully");
      return navigate("/Feed");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const signupHandler = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { email, password, firstName, lastName },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      console.log("User added successfully");
      return navigate("/Profile");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-500 to-pink-500">
      {/* Left Side - Image Section */}
      <div className="w-1/2 flex justify-center items-center bg-indigo-600 text-white">
        <div className="text-center p-8">
          <img
            src="https://via.placeholder.com/400x400.png?text=Welcome"
            alt="Boy giving directions"
            className="rounded-lg shadow-lg"
          />
          <h2 className="text-3xl font-bold mt-4">Join Us Today</h2>
          <p className="mt-2 text-xl">Sign up and be part of our community</p>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-1/2 flex justify-center items-center bg-white">
        <div className="card w-96 p-6 shadow-xl rounded-2xl">
          <h1 className="text-3xl font-extrabold text-center mb-6 text-indigo-600">
            {isLogin ? "Login" : "Sign Up"}
          </h1>

          {/* First Name & Last Name (Only for Sign Up) */}
          {!isLogin && (
            <div className="space-y-4">
              <label className="block">
                <input
                  type="text"
                  value={firstName}
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </label>

              <label className="block">
                <input
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </label>
            </div>
          )}

          {/* Email Input */}
          <label className="block mb-4">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          {/* Password Input */}
          <label className="block mb-6">
            <input
              type="password"
              className="w-full px-4 py-2 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={password}
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {/* Error Message */}
          {error && (
            <p className="text-red-600 font-bold text-xl mb-5 text-center">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <div className="card-actions justify-center mt-4">
            <button
              className="btn bg-indigo-600 text-white font-bold w-full py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
              onClick={isLogin ? loginHandler : signupHandler}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>

          {/* Toggle Between Login/Signup */}
          <p
            className="text-center text-gray-700 mt-6 font-semibold cursor-pointer hover:text-indigo-600"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "New User? Sign Up" : "Already a user? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
