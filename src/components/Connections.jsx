import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constant";
import { Link } from "react-router-dom";
const Connections = () => {
  const [error, setError] = useState("");  // Declare error state
  const dispatch = useDispatch();
  const connectedUsers = useSelector((store) => store.connections) || [];  // Ensure it's always an array

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      setError(err.message);  // Set error message if the API request fails
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (error) return <h1>Error: {error}</h1>;  // Display error message if there's an error

  if (connectedUsers.length === 0) return <h1>No Connection Found!!</h1>;

  return (
    <div className="justify-center">
      <h1 className="text-4xl text-center font-bold mt-5">Connections</h1>
      {connectedUsers.map((connection, index) => {
        if (!connection) {
          // Skip rendering if connection is null or undefined
          return null;
        }

        return (
          <div key={connection._id || index} className="w-1/2 flex bg-gray-900 mx-auto mt-14 rounded-lg shadow-2xl text-white">
            <div>
              <img
                src={connection.photoUrl || 'default-photo-url.jpg'}  // Fallback to default photo if photoUrl is missing
                alt="profilePicture"
                className="h-32 w-32 m-2 rounded-full"
              />
            </div>
            <div className="text-start ml-3 mt-2">
              <h2 className="font-bold text-lg">
                {connection.firstName + " " + connection.lastName}
              </h2>
              <h2 className="font-semibold text-lg">
                {connection.age + ", " + connection.gender}
              </h2>
              <p>{connection.about}</p>

            <Link to={"/chat/" + connection._id }> <button className="btn btn-outline btn-secondary">Secondary</button> </Link>
            </div>           
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
