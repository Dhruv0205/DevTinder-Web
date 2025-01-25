import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const [error, setError] = useState("");  // Declare error state
  const dispatch = useDispatch();
  const connectedUsers = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get("http://localhost:205/user/connections", {
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

  if (!connectedUsers)  return (<div className="flex w-52 flex-col gap-4 mx-auto  mt-40">
    <div className="skeleton h-32 w-full"></div>
    <div className="skeleton h-4 w-28"></div>
    <div className="skeleton h-4 w-full"></div>
    <div className="skeleton h-4 w-full"></div>
  </div>);

  if (connectedUsers.length === 0) return <h1>No Connection Found!!</h1>;

  return (
    <div className="justify-center">
      <h1 className="text-4xl text-center font-bold mt-5">Connections</h1>
      {connectedUsers.map((connection) => (
        <div key={connection.id} className="w-1/2 flex bg-gray-900 mx-auto mt-14 rounded-lg shadow-2xl text-white">
          <div>
            <img
              src={connection.photoUrl}
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
