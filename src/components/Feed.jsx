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
    if (readFeed) return;
    try {
      const res = await axios.get("http://localhost:205/feed", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addFeed(res.data));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    readFeed && (
      <div className="mt-20 ml-[40%]">
        <FeedCard user={readFeed[4]} />
        <p>{error}</p>
      </div>
    )
  );
};

export default Feed;
