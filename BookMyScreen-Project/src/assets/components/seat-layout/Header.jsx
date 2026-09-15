import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Header = ({ showData }) => {
  const navigate = useNavigate();

  return (
    <div className="seat-header">

      <button
        type="button"
        onClick={() => navigate("/")}
      >
        BookMyScreen
      </button>

      <div className="seat-header-info">
        <h2>
          {showData?.movie?.title}
        </h2>

        <p>
          {dayjs(showData?.date).format("D MMMM YYYY")}
        </p>
      </div>

      <button type="button">
        Sign in
      </button>

    </div>
  );
};

export default Header;