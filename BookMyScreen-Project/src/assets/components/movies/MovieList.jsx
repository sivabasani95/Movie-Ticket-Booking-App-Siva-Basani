import React from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import { languages } from "../../../utils/constants";

// Receives movie data from Movies.jsx.
// Displays backend movies using the existing MovieCard component.
const MovieList = ({ movies, addToWishlist, wishlist }) => {
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

      {/* Movie cards from Spring Boot backend */}
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;