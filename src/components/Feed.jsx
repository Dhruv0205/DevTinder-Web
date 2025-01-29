import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";

const Feed = () => {
  const readFeed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const getFeed = async () => {
    try {
      if (readFeed) return;
      const res = await axios.get("/api/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!readFeed) return;

  if (readFeed.length <= 0)
    return (
      <h1 className="text-center flex justify-center font-bold">
        No new user found!
      </h1>
    );

  return (
    readFeed && (
      <div className="mt-20 ml-[40%]">
        <FeedCard user={readFeed[0]} />
        <p>{error}</p>
      </div>
    )
  );
};

export default Feed;
