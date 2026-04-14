import React from "react";
import "./MovieFilters.css";
import { languages } from "../../../utils/constants";


// MovieFilters component for displaying filter sections
const MovieFilters = () => {
  return (

    <div>
      {/* Filters main title */}
      <h2 className="filters-title">Filters</h2>
      {/* Main container for all filters */}
      <div className="filters-container">

        {/* Genres filter section */}
        <div className="filter-box">
          <div className="filter-header">
            <span className="filter-name">Languages</span>
            <button className="clear-btn">Clear</button>
          </div>


          {/* Placeholder for genre options */}
          <div className="filter-options">
            {languages.map((lang, i) => (
              <span key={i} className="filter-tag">
                {lang}
              </span>
            ))}
          </div>

          {/* Format filter section */}
          <div className="filter-box">
            <div className="filter-header">
              <span className="filter-name">Genres</span>
              <button className="clear-btn">Clear</button>
            </div>

            {/* Placeholder for format options */}
            <div className="filter-options"></div>
          </div>

          <div className="filter-box">
            <div className="filter-header">
              <span className="filter-name">Format</span>
              <button className="clear-btn">Clear</button>
            </div>
            <div className="filter-options"></div>
            {/* Button to browse cinemas */}
            <button className="browse-btn">
              Browse by Cinemas
            </button>
          </div>

        </div>



      </div>

    </div>
  );
};

export default MovieFilters;