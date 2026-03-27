
import React from "react";
import "./MovieList.css";
import { languages } from "../../../utils/constants";

const MovieList = () => {
  return (
    <>
    <div className="movie-list-container">

      {/* Language Pills */}
      <div className="language-list">
        {languages.map((lang, i) => (
          <span key={i} className="language-pill">
            {lang}
          </span>
        ))}
      </div>

      {/* Coming Soon Header Block */}
      <div className="coming-soon-card">
        <h3 className="coming-title">Coming Soon</h3>
        <a href="#" className="coming-link">
          Explore Upcoming Movies <span className="arrow">...</span>
        </a>
      </div>

    </div>
    </>
  );
};

export default MovieList;