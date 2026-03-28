// MoviesFilters.jsx
// Sidebar filter component for the Movies page

import React from "react";
import "./MovieFilters.css";

const MovieFilters = () => {
  return (
    <div className="movie-filters">
      {/* Title */}
      <h2 className="filter-title">Filters</h2>

      {/* Languages Section */}
      <div className="filter-section">
        <div className="filter-header">
          <span className="filter-label">Languages</span>
          <button className="filter-clear-btn">Clear</button>
        </div>

        <div className="filter-options">
          <label className="filter-option">
            <input type="checkbox" />
            <span>Telugu</span>
          </label>

          <label className="filter-option">
            <input type="checkbox" />
            <span>Hindi</span>
          </label>

          <label className="filter-option">
            <input type="checkbox" />
            <span>English</span>
          </label>

          <label className="filter-option">
            <input type="checkbox" />
            <span>Tamil</span>
          </label>
        </div>
      </div>

      {/* Format Section */}
      <div className="filter-section">
        <div className="filter-header">
          <span className="filter-label">Format</span>
          <button className="filter-clear-btn">Clear</button>
        </div>

        <div className="filter-options">
          <label className="filter-option">
            <input type="checkbox" />
            <span>2D</span>
          </label>

          <label className="filter-option">
            <input type="checkbox" />
            <span>3D</span>
          </label>

          <label className="filter-option">
            <input type="checkbox" />
            <span>IMAX</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default MovieFilters;
