import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
// import Footer from "./Footer";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchApi = async () => {
    try {
      const res = await axios.get( BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401 || err.status === 400) {
        navigate("/Login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Body;
