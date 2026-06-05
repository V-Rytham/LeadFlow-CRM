import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../AuthContext";
import { toast } from "react-toastify";
function SignOutButton() {
    const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await axios.get(
        "http://localhost:8080/api/auth/signout",
        {
          withCredentials: true,
        }
      );
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/signin");

    } catch (error) {
      console.error(
        "Error while logging out:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="
        bg-red-500
        hover:bg-red-600
        text-white
        font-medium
        px-4
        py-2
        rounded-lg
        transition
        duration-200
        shadow-sm
        hover:shadow-md
        cursor-pointer
      "
    >
      Sign Out
    </button>
  );
}

export default SignOutButton;