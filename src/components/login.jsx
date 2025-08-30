import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setEmailId("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setError("");
  }, [isLogin]);

  const handleSubmit = async () => {
    try {
      const url = isLogin ? "/login" : "/signup";
      const payload = isLogin
        ? { emailId, password }
        : { emailId, password, firstName, lastName };

      const res = await axios.post(BASE_URL + url, payload, {
        withCredentials: true,
      });

      dispatch(addUser(res.data));

      
      if (isLogin) {
        navigate("/");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          {/* First & Last name only for Sign Up */}
          {!isLogin && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  className="input"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </>
          )}

          {/* Email */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="text"
              value={emailId}
              className="input"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>

          {/* Password */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              value={password}
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          {/* Error */}
          <p className="text-red-500">{error}</p>

          {/* Submit button */}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>

          {/* Switch link */}
          <p className="text-center mt-4">
            {isLogin ? (
              <>
                New user?{" "}
                <button
                  className="link text-blue-600"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  className="link text-blue-600"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
