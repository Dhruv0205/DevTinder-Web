import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import { removeRequest } from "../utils/requestSlice";
import { BASE_URL } from "../utils/constant";
import { Link } from "react-router-dom";

const Request = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const requestRecieved = useSelector((store) => store.request);

  const Requests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.connectionRequests));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Requests();
  }, []);

  const handleRequestAction = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex w-52 flex-col gap-4 mx-auto mt-40">
        <div className="skeleton h-32 w-full rounded-lg"></div>
        <div className="skeleton h-4 w-28 rounded-full"></div>
        <div className="skeleton h-4 w-full rounded-full"></div>
        <div className="skeleton h-4 w-full rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return <h1 className="flex justify-center mt-10 text-red-600 font-bold text-2xl">{`Error: ${error}`}</h1>;
  }

  if (requestRecieved.length === 0) {
    return <h1 className="flex justify-center mt-10 font-bold text-2xl">No Requests Found!</h1>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-100 to-gray-200 py-10">
      <h1 className="text-5xl text-center font-extrabold text-gray-800 mb-10 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600 shadow-xl">
        Requests Received
      </h1>
      <div className="max-w-4xl mx-auto space-y-8">
        {requestRecieved.map((requests) => {
          const { photoUrl, firstName, lastName, age, gender, about, skills } = requests.fromUserId;
          return (
            <div
              key={requests._id}
              className="flex items-center bg-white rounded-2xl shadow-2xl p-6 hover:shadow-2xl transition-shadow duration-500 transform hover:scale-105 hover:translate-y-1 hover:bg-blue-50"
            >
              {/* Profile Picture with Hover Effect */}
              <div className="flex-shrink-0 relative group">
                <img
                  src={photoUrl || "https://via.placeholder.com/150"} // Fallback image
                  alt="profile"
                  className="h-24 w-24 rounded-full object-cover border-4 border-gray-200 transition-transform duration-300 group-hover:scale-110"
                />
                {/* Zoom Effect on Hover */}
                <div className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
              </div>

              {/* User Details */}
              <div className="ml-6 flex-1">
                <h2 className="text-4xl font-semibold text-gray-800 mb-1 text-shadow-lg">
                  {firstName} {lastName}
                </h2>
                <p className="text-gray-600 text-lg mb-2">
                  <span className="font-semibold text-indigo-600">{age}</span>,{" "}
                  <span className="font-semibold text-indigo-600">{gender}</span>
                </p>
                <p className="text-gray-500 mt-2 text-base font-medium">{about}</p>

                <div className="mt-3">
                  <h3 className="font-bold text-gray-800 text-lg">Skills:</h3>
                  <p className="text-gray-600 text-sm italic">
                    {skills.join(", ")}
                  </p>
                </div>
              </div>

              {/* Accept/Reject Buttons */}
              <div className="flex-shrink-0 mt-4">
                <div className="flex gap-4">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                    onClick={() => handleRequestAction("rejected", requests._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    onClick={() => handleRequestAction("accepted", requests._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
