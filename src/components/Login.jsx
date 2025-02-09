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
      return navigate("/Feed");
    } catch (err) {
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
      return navigate("/Profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-teal-100 to-pink-100 items-center justify-center">
      {/* Left Side - Image Section (Hidden on mobile) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-start bg-teal-500 text-white p-8 lg:block hidden">
        <div className="flex items-center flex-col lg:flex-row">
          {/* Larger Image */}
          <img
            src="https://img.freepik.com/premium-vector/welcome-word-concept-illustration_958800-102731.jpg?w=996"
            alt="Boy giving directions"
            className="w-32 h-32 lg:w-48 lg:h-48 mr-0 lg:mr-6 rounded-full shadow-lg mb-6 lg:mb-0"
          />
          <div>
            <h2 className="text-3xl lg:text-4xl font-extrabold mt-4 text-white drop-shadow-lg">
              Join Us Today
            </h2>
            <p className="mt-2 text-lg text-white drop-shadow-lg">
              Sign up and be part of our community
            </p>
            <p className="mt-4 text-md text-white opacity-80">
              Get access to exclusive content, connect with like-minded people, and enjoy great benefits by joining our community!
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-4">
        <div className="card w-full lg:w-96 p-6 shadow-xl rounded-2xl bg-gradient-to-r from-pink-100 to-teal-100">
          <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-700">
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
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                />
              </label>

              <label className="block">
                <input
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                />
              </label>
            </div>
          )}

          {/* Email Input */}
          <label className="block my-4">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          {/* Password Input */}
          <label className="block mb-6">
            <input
              type="password"
              className="w-full px-4 py-2 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none"
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
              className="btn bg-teal-500 text-white font-bold w-full py-3 rounded-lg hover:bg-teal-600 transition duration-300"
              onClick={isLogin ? loginHandler : signupHandler}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>

          {/* Toggle Between Login/Signup */}
          <p
            className="text-center text-gray-700 mt-6 font-semibold cursor-pointer hover:text-teal-600"
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
