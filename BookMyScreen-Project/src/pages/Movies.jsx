import React from "react";
import "./Movies.css";


import MovieFilters from "../assets/components/movies/MovieFilters";
import MovieList from "../assets/components/movies/MovieList";
import BannerSlider from "../assets/components/shared/BannerSlider";

const Movies = () => {
 
  return (
    <div className="movies-page">
      <BannerSlider />

      <div className="movies-container">
        <MovieFilters />
        
      
        <MovieList />
     </div>
    </div>
  );
};

export default Movies;
