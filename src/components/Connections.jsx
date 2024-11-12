import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  //  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const connectedUsers = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get("http://localhost:205/user/connections", {
        withCredentials: true,
      });

      // console.log(res.data.data);
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connectedUsers) return;

  if (connectedUsers.length === 0) return <h1>No Connection Found!!</h1>;

  return (
    <div className="justify-center">
      <h1 className="text-4xl text-center font-bold mt-5"> Connections </h1>

      {connectedUsers.map((connection) => {
        return (
          <div className="w-1/2 flex bg-gray-900 mx-auto mt-14 rounded-lg shadow-2xl">
            <div>
              <img src={connection.photoUrl} alt="profilePicture" className="h-32 w-32 m-2 rounded-full" />
            </div>
            <div className="text-start ml-3 mt-2">
              <h2 className="font-bold text-lg">{connection.firstName + " " + connection.lastName}</h2>
              <h2 className="font-semibold text-lg">{connection.age + ", "+ connection.gender}</h2>
              <p>{connection.about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
