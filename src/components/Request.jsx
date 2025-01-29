import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import { removeRequest } from "../utils/requestSlice";

const Request = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const requestRecieved = useSelector((store) => store.request);

  const Requests = async () => {
    try {
      const res = await axios.get("/api/user/request/recieved", {
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
        `http://localhost:205/request/review/${status}/${requestId}`,
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
    <div className="container mx-auto p-5">
      <h1 className="text-center font-bold text-3xl my-5 text-gray-800">Requests Received</h1>
      {requestRecieved.map((requests) => {
        const { photoUrl, firstName, lastName, age, gender, about, skills } = requests.fromUserId;
        return (
          <div key={requests._id} className="w-full sm:w-[45%] lg:w-[30%] mx-auto bg-white rounded-lg shadow-xl mb-6 transition-transform transform hover:scale-105">
            <div className="flex items-center p-5">
              <div className="w-24 h-24 mr-5 rounded-full overflow-hidden border-4 border-gray-300">
                <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="text-start flex-1">
                <h1 className="font-semibold text-xl text-gray-800">
                  {firstName} {lastName}
                </h1>
                <h2 className="font-medium text-gray-600">{age}, {gender}</h2>
                <p className="text-gray-700 mt-2">{about}</p>
                <div className="mt-3">
                  <h3 className="font-bold text-gray-800">Skills:</h3>
                  <p className="text-gray-600">
                    {skills.map((skill, index, arr) => (
                      <span key={index}>
                        {skill.trim()}{index !== arr.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="flex justify-end mt-5">
                  <button
                    className="btn btn-reject text-lg px-6 py-2 mr-4 rounded-lg border-2 border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-all"
                    onClick={() => handleRequestAction("rejected", requests._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-accept text-lg px-6 py-2 rounded-lg border-2 border-green-500 text-green-500 font-semibold hover:bg-green-500 hover:text-white transition-all"
                    onClick={() => handleRequestAction("accepted", requests._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
