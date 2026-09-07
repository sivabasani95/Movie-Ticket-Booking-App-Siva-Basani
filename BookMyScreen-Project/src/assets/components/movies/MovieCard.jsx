import React from "react";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";

// MovieCard displays the information for one movie received from the backend.
// The movie object contains fields such as posterUrl, title, rating, certificate, and language.
const MovieCard = ({ movie, addToWishlist }) => {

  // useNavigate allows the user to move to the movie details page
  // without refreshing the entire React application.
  const navigate = useNavigate();

  // When the movie card is clicked, navigate to the details page
  // using the movie ID received from the Spring Boot backend.
  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div
      className="movie-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >

      {/* Display the movie poster using the posterUrl provided by the backend */}
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="movie-card-img"
      />

      {/* Display the movie title */}
      <p className="movie-card-title">
        {movie.title}
      </p>

      {/* Display the movie rating returned from the backend */}
      <p className="movie-card-rating">
        {movie.rating}
      </p>

      {/* Display the movie age/certificate classification */}
      <p className="movie-card-cert">
        {movie.certificate}
      </p>

      {/* Display the primary language of the movie */}
      <p className="movie-card-lang">
        {movie.language}
      </p>

      {/* Add the selected movie to the user's wishlist */}
      <button
        type="button"
        onClick={(e) => {

          // Prevent the movie card click event from running when
          // the user only wants to click the wishlist button.
          e.stopPropagation();

          // Pass the selected movie to the wishlist function.
          addToWishlist(movie);
        }}
      >
        Add to Wishlist
      </button>

    </div>
  );
};

export default MovieCard;