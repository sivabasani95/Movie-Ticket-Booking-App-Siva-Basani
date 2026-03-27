import React from "react";
import MoviesFilters from "../assets/components/movies/MoviesFilters";
import MovieList from "../assets/components/movies/MovieList";
import "./Movies.css";

const Movies = () => {
  return (
    <div className="movies-page">

      {/* LEFT SIDEBAR */}
      <div className="movies-left">
        <MoviesFilters />
      </div>

      {/* RIGHT CONTENT */}
      <div className="movies-right">
         {/* COMING SOON TITLE */}
        <h2 className="coming-title">Coming Soon</h2>

        {/* BANNERS */}
        <div className="movies-banners">
  
</div>

        
        {/* MOVIE GRID */}
        <MovieList />
      </div>
    </div>
  );
};

export default Movies;
