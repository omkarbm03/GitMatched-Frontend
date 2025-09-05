import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const payload = {
        firstName,
        lastName,
        skills: skills.split(",").map((s) => s.trim()),
        about,
        photoUrl,
      };

      const res = await axios.patch(BASE_URL + "/profile/edit", payload, {
        withCredentials: true,
      });

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-stretch my-10 gap-10 px-4">
        {/* Edit form */}
        <div className="card bg-base-300 w-96 shadow-xl rounded-xl flex flex-col flex-1">
          <div className="card-body space-y-4 w-96">
            <h2 className="text-2xl font-bold text-center mb-2">
              Edit Profile
            </h2>

            {/* First Name */}
            <div className="form-control">
              <label className="label font-medium">First Name</label>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div className="form-control">
              <label className="label font-medium">Last Name</label>
              <input
                type="text"
                value={lastName}
                className="input input-bordered w-full"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Skills */}
            <div className="form-control">
              <label className="label font-medium">Skills</label>
              <input
                type="text"
                value={skills}
                placeholder="React, Node.js, Python"
                className="input input-bordered w-full"
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            {/* About */}
            <div className="form-control">
              <label className="label font-medium">About</label>
              <textarea
                value={about}
                className="textarea textarea-bordered w-full"
                rows={3}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="label font-medium">Photo URL</label>
              <input
                type="text"
                value={photoUrl}
                className="input input-bordered w-full"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Save button */}
            <div className="mt-4">
              <button className="btn btn-primary w-full" onClick={saveProfile}>
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="w-96 flex flex-col flex-1">
          <div className="card bg-base-300 shadow-xl rounded-xl flex-1">
            <UserCard
              user={{
                firstName,
                lastName,
                skills: skills.split(",").map((s) => s.trim()),
                about,
                photoUrl,
              }}
            />
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success shadow-md">
            <span>✅ Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
