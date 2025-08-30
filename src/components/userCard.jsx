import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user, onAction }) => {
  if (!user) return null;

  const { _id, firstName, lastName, skills, photoUrl, about, gender } = user;

  const handleRequest = async (status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      console.log(`User ${_id} marked as ${status}`);
      if (onAction) onAction(); // notify parent to move to next profile
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt={firstName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>{about}</p>
        {gender && <p>{gender}</p>}
        {skills && <p>{skills.join(", ")}</p>}

        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleRequest("ignored")}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleRequest("interested")}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
