import React from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import { allMovies, languages } from "../../../utils/constants";

const MovieList = () => {
  return (
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
      <div className="coming-soon-header">
        <h3 className="coming-title">Coming Soon</h3>
        <a href="#" className="explore-link">
          Explore upcoming Movies <span className="arrow">›</span>
        </a>
      </div>

      {/* Movie card component */}
      <div className="movies-grid">
        {allMovies.map((movie, i) => (
          <MovieCard key={i} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;