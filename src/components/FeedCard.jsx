import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const FeedCard = ({ user }) => {
  const { firstName, lastName, photoUrl, skills, about, age, gender, _id } = user;
  const dispatch = useDispatch();

  const onClickHandler = async (status, userid) => {
    try {
      const res = await axios.post(
        `http://localhost:205/request/send/${status}/${userid}`,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeFeed(userid));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" min-h-screen ">
      <div className="card bg-white shadow-xl rounded-xl overflow-hidden max-w-sm w-full transform hover:scale-105 transition-all duration-300">
        <figure className="relative">
          <img
            src={photoUrl}
            className="h-72 w-full object-cover rounded-t-xl"
            alt="UserProfile"
          />
          <div className="absolute bottom-4 left-4 text-white font-bold text-xl bg-black bg-opacity-50 px-4 py-2 rounded-lg">
            {firstName} {lastName}
          </div>
        </figure>
        <div className="card-body text-black p-6">
          <p className="text-sm text-gray-600 font-semibold">
            {age}, {gender}
          </p>
          <p className="text-lg font-semibold text-gray-800 mt-2">{about}</p>
          <p className="font-medium text-gray-700 mt-3">Skills:</p>
          <p className="text-gray-600 font-light">{skills.join(", ")}</p>

          <div className="card-actions justify-center mt-6 space-x-4">
            <button
              className="btn btn-outline btn-error font-semibold text-lg py-2 px-6 rounded-full hover:bg-red-500 hover:text-white transition-all duration-200"
              onClick={() => onClickHandler("rejected", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-outline btn-success font-semibold text-lg py-2 px-6 rounded-full hover:bg-green-500 hover:text-white transition-all duration-200"
              onClick={() => onClickHandler("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
