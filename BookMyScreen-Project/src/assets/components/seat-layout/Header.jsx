

import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import bookMyScreenLogo from "../../../images/bookMyScreen.png";
import { useAuth } from "../../../context/AuthContext";

// Displays the header on the seat selection page.
const Header = ({ showData }) => {

  // Used for page navigation.
  const navigate = useNavigate();

  // Gets the currently logged-in user from AuthContext.
  const { user } = useAuth();

  // Gets the user's first name for the header.
  const firstName = user?.name
    ? user.name.trim().split(" ")[0]
    : "";

  return (
    // Main header container.
    <div className="w-full bg-white border-b border-gray-200 shadow-sm">

      {/* Places logo, movie information, and user information in one row. */}
      <div className="w-full flex items-center justify-between py-0 px-0">

        {/* BookMyScreen logo - clicking it returns to the home page. */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="cursor-pointer bg-transparent border-0"
        >
          <img
            src={bookMyScreenLogo}
            alt="BookMyScreen"
            className="w-36 h-auto object-contain"
          />
        </button>

        {/* Displays the selected movie title and show date. */}
        <div className="text-center">
          <h2 className="font-bold text-xl">
            {showData?.movie?.title}
          </h2>

          <p className="text-xs text-gray-500">
            {dayjs(showData?.date).format("D MMMM YYYY")}
          </p>
        </div>

        {/* Shows the user's name when logged in, otherwise shows Sign in. */}
        {user ? (
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="bg-transparent border-0 text-sm font-medium cursor-pointer px-4"
          >
            Hi, {firstName} ▼
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-[#f84464] text-white px-4 py-2 rounded text-sm cursor-pointer"
          >
            Sign in
          </button>
        )}

      </div>
    </div>
  );
};

export default Header;