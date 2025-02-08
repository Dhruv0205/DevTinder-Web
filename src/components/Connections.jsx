import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constant";
import { Link } from "react-router-dom";

const Connections = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const connectedUsers = useSelector((store) => store.connections) || [];

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (error)
    return (
      <h1 className="text-center text-red-500 text-2xl mt-10">
        Error: {error}
      </h1>
    );

  if (connectedUsers.length === 0)
    return (
      <h1 className="text-center text-gray-500 text-2xl mt-10">
        No Connections Found!
      </h1>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-100 to-gray-200 py-10">
      <h1 className="text-5xl text-center font-extrabold text-gray-800 mb-10 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600 shadow-xl">
        Your Connections
      </h1>
      <div className="max-w-4xl mx-auto space-y-8">
        {connectedUsers.map((connection, index) => {
          if (!connection) return null;

          return (
            <div
              key={connection._id || index}
              className="flex items-center bg-white rounded-2xl shadow-2xl p-6 hover:shadow-2xl transition-shadow duration-500 transform hover:scale-105 hover:translate-y-1 hover:bg-blue-50"
            >
              {/* Profile Picture with Hover Effect */}
              <div className="flex-shrink-0 relative group">
                <img
                  src={connection.photoUrl || "https://via.placeholder.com/150"} // Fallback image
                  alt="profile"
                  className="h-24 w-24 rounded-full object-cover border-4 border-gray-200 transition-transform duration-300 group-hover:scale-110"
                />
                {/* Zoom Effect on Hover */}
                <div className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
              </div>

              {/* User Details */}
              <div className="ml-6 flex-1">
                <h2 className="text-3xl font-semibold text-gray-800 mb-1">
                  {connection.firstName} {connection.lastName}
                </h2>
                <p className="text-gray-600 text-lg">
                  {connection.age}, {connection.gender}
                </p>
                <p className="text-gray-500 mt-2 text-base">{connection.about}</p>
              </div>

              {/* Chat Button */}
              <div className="flex-shrink-0 mt-4">
                <Link to={"/chat/" + connection._id}>
                  <button className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Chat
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
