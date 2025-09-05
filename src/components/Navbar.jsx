import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm px-6">
      {/* Left section: show only if logged in */}
      {user && (
        <div className="flex gap-4 ml-2">
          <Link
            to="/connections"
            className="btn btn-ghost btn-circle tooltip tooltip-bottom"
            data-tip="Chat"
          >
            <span className="text-xl">📩</span>
          </Link>
          <Link
            to="/requests"
            className="btn btn-ghost btn-circle tooltip tooltip-bottom"
            data-tip="Requests"
          >
            <span className="text-xl">👥</span>
          </Link>
        </div>
      )}

      {/* Center: Logo */}
      <div className="flex-1 flex justify-center">
        <Link to="/" className="btn btn-ghost text-2xl font-bold">
          👩‍💻 GitMatched
        </Link>
      </div>

      {/* Right: User avatar dropdown */}
      <div className="flex items-center">
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Photo"
                  src={user.photoUrl || "https://via.placeholder.com/150"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
