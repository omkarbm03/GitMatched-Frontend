import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleAction = () => {
    // move to next profile
    setIndex((prev) => prev + 1);
  };

  if (!feed) return null;

  if (feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-20">
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-base-300 shadow-md mb-6">
          <span className="text-4xl">🙅‍♂️</span>
        </div>
        <h1 className="text-2xl font-semibold mb-2">No new users found</h1>
        <p className="text-gray-500 text-center max-w-sm">
          Check back later to discover more connections and expand your network!
        </p>
      </div>
    );
  }
  

  return (
    feed && feed[index] && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[index]} onAction={handleAction} />
      </div>
    )
  );
};

export default Feed;
