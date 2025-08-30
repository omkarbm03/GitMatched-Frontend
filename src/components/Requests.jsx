import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data));
    } catch (err) {
      console.error("Error fetching requests", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle Accept/Reject using outer request _id
  const handleReview = async (requestId, action) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${action}/${requestId}`,
        {},
        { withCredentials: true }
      );
      // Refresh requests after action
      fetchRequests();
    } catch (err) {
      console.error(`Error while ${action} request for ${requestId}`, err);
    }
  };

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <h1 className="text-center mt-10 text-lg font-medium">
        No Requests Found
      </h1>
    );

  return (
    <div className="my-10">
      <h1 className="text-center font-bold text-3xl mb-8">Requests</h1>

      <div className="flex flex-col items-center gap-6">
        {requests.map((req, idx) => {
          const { _id: requestId, fromUserId } = req;
          const { firstName, lastName, photoUrl, age, gender, about } =
            fromUserId || {};

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
                {firstName || ""} {lastName || ""}
              </h2>
              <p className="text-sm">
                {age ? `${age} yrs · ` : ""}
                {gender || ""}
              </p>
              <p className="mt-2 text-sm">{about || "No bio available"}</p>

              {/* Action buttons */}
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => handleReview(requestId, "accepted")}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReview(requestId, "rejected")}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
