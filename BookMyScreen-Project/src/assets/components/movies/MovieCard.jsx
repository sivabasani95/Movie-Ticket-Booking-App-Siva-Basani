import React from "react";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";





const MovieCard = ({movie, addToWishlist }) => {

const navigate = useNavigate();

 const handleClick = () => {
    if (movie.id === 4) {   // ✅ only F1
      navigate(`/movies/${movie.id}`);
    }
  };

    return (
        <div className="movie-card"
       
      onClick={handleClick}
      style={{
        cursor: movie.id === 4 ? "pointer" : "default"
      }}>
        
        
      <img
        src={movie.img}
        alt={movie.title}
        className="movie-card-img"
      />

      <p className="movie-card-title">{movie.title}</p>

      <p className="movie-card-rating">
        {movie.rating} | {movie.votes}
      </p>

      <p className="movie-card-cert">{movie.age}</p>

      <p className="movie-card-lang">
        {movie.languages}
      </p>

    <button
      onClick={(e) => {
        e.stopPropagation(); // 
        addToWishlist(movie);
      }}
    >
      Add to Wishlist
    </button>




    </div>

    );

}
export default MovieCard;