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
        skills: skills.split(",").map((s) => s.trim()), // ✅ fix array handling
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
      <div className="flex flex-col lg:flex-row justify-center my-10 gap-8">
        {/* Edit form */}
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>

            {/* First Name */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                value={firstName}
                className="input"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>

            {/* Last Name */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                value={lastName}
                className="input"
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>

            {/* Skills */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Skills</legend>
              <input
                type="text"
                value={skills}
                className="input"
                placeholder="Comma separated e.g. React, Node.js"
                onChange={(e) => setSkills(e.target.value)}
              />
            </fieldset>

            {/* About */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <textarea
                value={about}
                className="textarea textarea-bordered w-full"
                rows={3}
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>

            {/* Photo URL */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo URL</legend>
              <input
                type="text"
                value={photoUrl}
                className="input"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </fieldset>

            {/* Error */}
            <p className="text-red-500 text-sm mt-2">{error}</p>

            {/* Save button */}
            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview */}
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

      {/* Toast */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
