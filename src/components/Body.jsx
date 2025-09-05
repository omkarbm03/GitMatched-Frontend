import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 400 || err.response?.status === 401) {
        navigate("/login", { replace: true });
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userData]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar at top */}
      <Navbar />

      {/* Main content area - centered, responsive */}
      <main className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl">
          <Outlet />
        </div>
      </main>

      {/* Footer always at bottom */}
      {/* <Footer /> */}
    </div>
  );
};

export default Body;
