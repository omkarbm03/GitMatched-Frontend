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
    <div className="flex justify-center items-start min-h-screen px-4 pt-12 sm:pt-16">
      <div className="card bg-base-300 w-full max-w-sm sm:max-w-md shadow-lg rounded-xl">
        <div className="card-body space-y-4">
          <h2 className="card-title text-center text-xl sm:text-2xl font-semibold">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          {/* First & Last name only for Sign Up */}
          {!isLogin && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">
                    First Name
                  </span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full text-sm sm:text-base"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base">
                    Last Name
                  </span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full text-sm sm:text-base"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm sm:text-base">Email ID</span>
            </label>
            <input
              type="email"
              value={emailId}
              className="input input-bordered w-full text-sm sm:text-base"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm sm:text-base">Password</span>
            </label>
            <input
              type="password"
              value={password}
              className="input input-bordered w-full text-sm sm:text-base"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-xs sm:text-sm">{error}</p>
          )}

          {/* Submit button */}
          <div className="card-actions">
            <button
              className="btn btn-primary w-full text-sm sm:text-base"
              onClick={handleSubmit}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>

          {/* Switch link */}
          <p className="text-center text-xs sm:text-sm mt-2">
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
