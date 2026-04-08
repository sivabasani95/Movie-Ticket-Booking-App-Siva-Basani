import React from "react";
import "./MovieFilters.css";
import { languages } from "../../../utils/constants";

const MovieFilters = () => {
  return (

    <div>
      <h2 className="filters-title">Filters</h2>
    <div className="filters-container">
    

      <div className="filter-box">
        <div className="filter-header">
          <span className="filter-name">Languages</span>
          <button className="clear-btn">Clear</button>
        </div>

        <div className="filter-options">
          {languages.map((lang, i) => (
            <span key={i} className="filter-tag">
              {lang}
            </span>
          ))}
        </div>

        <div className="filter-box">
        <div className="filter-header">
          <span className="filter-name">Genres</span>
          <button className="clear-btn">Clear</button>
        </div>

        <div className="filter-options"></div>
      </div>

      <div className="filter-box">
        <div className="filter-header">
          <span className="filter-name">Format</span>
          <button className="clear-btn">Clear</button>
        </div>
        <div className="filter-options"></div>
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