

import React, { useEffect, useState } from "react";
import "./Movies.css";
import MovieFilters from "../assets/components/movies/MovieFilters";
import MovieList from "../assets/components/movies/MovieList";
import BannerSlider from "../assets/components/shared/BannerSlider";
import { getAllMovies } from "../apis";

// Movies component displays the movies page layout
// It loads movie data from the Spring Boot backend.
const Movies = ({ addToWishlist, wishlist }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getAllMovies();
        setMovies(response.data);
      } catch (error) {
        console.error("Error loading movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movies-page">
      {/* Banner section at the top of the page */}
      <BannerSlider />

      {/* Main container holding filters and movie list */}
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
