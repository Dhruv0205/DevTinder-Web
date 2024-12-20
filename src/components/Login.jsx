import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

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
        "http://localhost:205/login",
        { email, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      console.log("User added successfully");
      return navigate("/Feed");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data || "something went wrong");
    }
  };


  const signupHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:205/signup",
        { email, password, firstName, lastName },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      console.log("User added successfully");
      return navigate("/Profile");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data || "something went wrong");
    }
  };

  return (
    <div className="card bg-neutral-content w-96 shadow-xl  mx-auto my-[10%]">
      <div className="card-body">
        <h1 className="mx-auto text-3xl font-extrabold text-black my-6">
          {isLogin ? "Login" : "SignUp"}
        </h1>
{ !isLogin && 
   (
   <div>
      <label className="input input-bordered flex items-center gap-2 mb-5">
      <input type="text" value={firstName}  placeholder="FirstName" onChange={(e)=>setFirstName(e.target.value)} className="grow" />
     </label>

    <label className="input input-bordered flex items-center gap-2 mb-5">
      
      <input type="text" value={lastName}  placeholder="LastName" onChange={(e)=>setLastName(e.target.value)} className="grow" />
    </label>
    </div>
    )
}
        <label className="input input-bordered flex items-center gap-2 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            value={password}
            placeholder="******"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>

        <p className="text-red-600 font-bold text-xl mb-5">{error}</p>

        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={isLogin ? loginHandler : signupHandler}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </div>
        
        <p className="text-black text-center font-bold hover:cursor-pointer" onClick={()=>setIsLogin(!isLogin)}>
          {isLogin ? "New User? Sign Up": "Already a user? Login"}
        </p>
      </div>
    </div>
  );
};

export default Login;
