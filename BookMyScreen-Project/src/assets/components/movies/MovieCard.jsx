import React from "react";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";




// MovieCard component receives movie data and wishlist function as props//
const MovieCard = ({ movie, addToWishlist }) => {
  // Hook used for navigation between pages
  const navigate = useNavigate();
  // Handle click on movie card
  const handleClick = () => {
    if (movie.id === 4) {   // ✅ only F1
      navigate(`/movies/${movie.id}`);
    }
  };

  return (
    <div className="movie-card"

      onClick={handleClick}  // Click event for card navigation
      style={{
        cursor: movie.id === 4 ? "pointer" : "default"
      }}>

      {/* Movie poster image */}
      <img
        src={movie.img}
        alt={movie.title}
        className="movie-card-img"
      />
      {/* Movie title */}
      <p className="movie-card-title">{movie.title}</p>

      {/* Age certification */}
      <p className="movie-card-rating">
        {movie.rating} | {movie.votes}
      </p>

      <p className="movie-card-cert">{movie.age}</p>

      {/* Available languages */}
      <p className="movie-card-lang">
        {movie.languages}
      </p>

      {/* Add to wishlist button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); //Prevents card click (navigation) when button is clicked
          addToWishlist(movie);  // Adds movie to wishlist
        }}
      >
        Add to Wishlist
      </button>




    </div>

  );

}
export default MovieCard;