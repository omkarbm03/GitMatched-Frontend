import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error fetching connections", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <h1 className="text-center mt-10 text-lg font-medium">
        No Connections Found
      </h1>
    );

  const handleChat = (id) => {
    // Navigate to chat page with that user
    navigate(`/chat/${id}`);
  };

  return (
    <div className="my-10">
      <h1 className="text-center font-bold text-3xl mb-8">Connections</h1>

      <div className="flex flex-col items-center gap-6">
        {connections.map((connection, idx) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={idx}
              className="w-full max-w-md p-6 rounded-xl bg-base-300 shadow-md text-center"
            >
              <img
                alt="profile"
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                src={photoUrl || "/default-avatar.png"}
              />
              <h2 className="font-semibold text-lg">
                {firstName} {lastName}
              </h2>
              <p className="text-sm">
                {age ? `${age} yrs · ` : ""}
                {gender || ""}
              </p>
              <p className="mt-2 text-sm">{about || "No bio available"}</p>

              {/* Chat Button */}
              <div className="mt-4">
                <button
                  onClick={() => handleChat(_id)}
                  className="btn btn-primary btn-sm w-full"
                >
                  💬 Chat
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
