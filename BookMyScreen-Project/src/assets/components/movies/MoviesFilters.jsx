import React from "react";
import "./MoviesFilter.css";

// List of available languages for the filter
const languages = ["English", "Hindi", "Tamil", "Telugu"];

const MoviesFilter = () => {
  return (
    // Wrapper that holds the title + filter card
    <div className="filters-wrapper">

      {/* Title shown OUTSIDE the white filter box */}
      <h2 className="filter-title">Filters</h2>

      {/* Main white filter card */}
      <div className="movie-filters">

        {/* -------------------------------
            LANGUAGES SECTION
        -------------------------------- */}
        <div className="filter-section">

          {/* Header row: label + clear button */}
          <div className="filter-header">
            <span className="filter-label">Languages</span>
            <button className="filter-clear-btn">Clear</button>
          </div>

          {/* Language pills */}
          {languages.map((lang, i) => (
            <span key={i} className="language-pill">
              {lang}
            </span>
          ))}
        </div>

        {/* -------------------------------
            GENRES SECTION
        -------------------------------- */}
        <div className="filter-block">
          <div className="filter-block-header">
            <span>Genres</span>
            <button>Clear</button>
          </div>
          {/* Add genre pills here later */}
        </div>

        {/* -------------------------------
            FORMAT SECTION
        -------------------------------- */}
        <div className="filter-block">
          <div className="filter-block-header">
            <span>Format</span>
            <button>Clear</button>
          </div>

          {/* Browse by Cinemas button */}
          <button className="browse-btn">Browse by Cinemas</button>
        </div>

      </div>
    </div>
  );
};

export default MoviesFilter;
