import { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [skills, setskills] = useState(user.skills);
  const [about, setabout] = useState(user.about);
  const [photoUrl, setphotoUrl] = useState(user.photoUrl);
  const [showToast, setshowToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, skills, about, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setshowToast(true);
      setTimeout(() => {
        setshowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10 ">
        <div className="flex justify-center mx-10">
          <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div className="firstName">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input"
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                  <p className="label"></p>
                </fieldset>
              </div>
              <div className="lastName">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input"
                    onChange={(e) => setlastName(e.target.value)}
                  />
                  <p className="label"></p>
                </fieldset>
              </div>
              <div className="firstName">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Skills</legend>
                  <input
                    type="text"
                    value={skills}
                    className="input"
                    onChange={(e) => setskills(e.target.value)}
                  />
                  <p className="label"></p>
                </fieldset>
              </div>
              <div className="firstName">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  <input
                    type="text"
                    value={about}
                    className="input"
                    onChange={(e) => setabout(e.target.value)}
                  />
                  <p className="label"></p>
                </fieldset>
              </div>
              <div className="firstName">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo URL</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input"
                    onChange={(e) => setphotoUrl(e.target.value)}
                  />
                  <p className="label"></p>
                </fieldset>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={{ firstName, lastName, skills, about, photoUrl }} />
      </div>
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
