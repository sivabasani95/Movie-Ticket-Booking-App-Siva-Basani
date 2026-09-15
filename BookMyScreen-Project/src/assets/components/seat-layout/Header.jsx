import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import bookMyScreenLogo from "../../../images/bookMyScreen.png";

// Displays the header on the seat selection page.
const Header = ({ showData }) => {
  // Used to navigate back to the home page.
  const navigate = useNavigate();

  return (
    // Main header container.
    <div className="w-full bg-white border-b border-gray-200 shadow-sm">

      {/* Places logo, movie information, and sign-in button in one row. */}
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

        {/* Sign-in button. */}
        <button
          type="button"
          className="bg-[#f84464] text-white px-4 py-2 rounded text-sm cursor-pointer"
        >
          Sign in
        </button>

      </div>
    </div>
  );
};

export default Header;