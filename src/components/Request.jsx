import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Request = () => {
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const requestRecieved = useSelector((store) => store.request);

  const Requests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:205/user/request/recieved",
        { withCredentials: true }
      );

      dispatch(addRequest(res?.data?.connectionRequests));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    Requests();
  }, []);

  if (!requestRecieved) return;

  if (requestRecieved.length === 0) {
    return (
      <h1 className="flex justify-center text-center font-bold text-2xl">NO REQUEST FOUND!!</h1>
    );
  }

  return (
    <div>
      <h1 className="text-center font-bold text-2xl my-5">Request Recieved</h1>
      {requestRecieved.map((requests) => {
        const { photoUrl, firstName, lastName, age, gender, about, skills } =
          requests.fromUserId;
        return (
          <div className="w-1/2 mx-auto bg-gray-900 flex rounded-lg shadow-2xl">
            <div className="m-3">
              <img src={photoUrl} className="h-32 w-32 rounded-full" alt="" />
            </div>
            <div className="mx-5 text-start my-auto">
              <h1 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h1>
              <h2 className="font-semibold">{age + ", " + gender}</h2>
              <p>{about}</p>
              <h2 className="font-bold">Skills: {skills}</h2>
              <div className="flex justify-end mb-3">
                {/* <button className="bg-primary w-24 text-xl mx-4 rounded-lg font-bold text-black">
                  Accept
                </button>
                <button className="bg-secondary w-24 text-xl font-bold rounded-lg text-black">
                  Reject
                </button> */}

                <button className="btn btn-primary text-lg mx-4">Reject</button>
                <button className="btn btn-secondary text-lg">Accept</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
