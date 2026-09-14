import React, { useEffect, useState } from "react";
import "./Movies.css";
import MovieFilters from "../assets/components/movies/MovieFilters";
import MovieList from "../assets/components/movies/MovieList";
import BannerSlider from "../assets/components/shared/BannerSlider";
import { getAllMovies } from "../apis";

// Movies component displays the movies page layout.
// It loads movie data from the Spring Boot backend.
const Movies = ({ addToWishlist, wishlist }) => {
  // Stores movies returned from the backend.
  // The list starts empty until the API request finishes.
  const [movies, setMovies] = useState([]);

  // Stores an error message if movies cannot be loaded.
  const [error, setError] = useState("");

  // Loads all movies when the page first opens.
  // Data comes from GET /api/movies.
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getAllMovies();

        // Stores movie data returned from Spring Boot.
        setMovies(response.data);
        setError("");

      } catch (error) {
        // Displays an error in the UI instead of using console.log.
        setError("Unable to load movies.");
        setMovies([]);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movies-page">

      {/* Banner section at the top of the page. */}
      <BannerSlider />

      {/* Displays an error if movie data cannot be loaded. */}
      {error && (
        <p>{error}</p>
      )}

      {/* Main container holding filters and movie list. */}
      <div className="movies-container">

        <MovieFilters />

        <MovieList
          movies={movies}
          addToWishlist={addToWishlist}
          wishlist={wishlist}
        />

      </div>
    </div>
  );
};

export default Movies;