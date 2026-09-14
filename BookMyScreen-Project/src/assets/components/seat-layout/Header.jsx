import React from "react";
import { useNavigate } from "react-router-dom";

// Displays the header for the seat layout page.
const Header = ({ showData }) => {
  const navigate = useNavigate();

  return (
    <div className="seat-header">

      {/* Navigates back to the home page. */}
      <button
        type="button"
        onClick={() => navigate("/")}
      >
        BookMyScreen
      </button>

      {/* Displays the selected movie title. */}
      <h2>
        {showData?.movie?.title || "Select Your Seats"}
      </h2>

      {/* Displays the sign in button. */}
      <button type="button">
        Sign in
      </button>

    </div>
  );
};

export default Header;