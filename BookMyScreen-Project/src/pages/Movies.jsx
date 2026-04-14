

import React from "react";
import "./Movies.css";
import MovieFilters from "../assets/components/movies/MovieFilters";
import MovieList from "../assets/components/movies/MovieList";
import BannerSlider from "../assets/components/shared/BannerSlider";


// Movies component displays the movies page layout
// It includes banner, filters sidebar, and movie listing section
const Movies = ( { addToWishlist, wishlist  } ) => {
 
  return (
    <div className="movies-page">
        {/* Banner section at the top of the page */}
      <BannerSlider />
 {/* Main container holding filters and movie list */}
      <div className="movies-container">
         {/* Movie list displaying all movies and handling wishlist actions */}
        <MovieFilters />
        
         <MovieList addToWishlist={addToWishlist} wishlist={wishlist}/>
         
       
     </div>
    </div>
  );
};

export default Movies;
