import React from "react";
import "./MovieCard.css";
import { useNavigate } from "react-router";





const MovieCard = ({movie}) => {

const navigate = useNavigate();

    return (
        <div className="movie-card"
         onClick={ () => navigate(`/movies/${movie.id}`)}>
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
    </div>

    );

}
export default MovieCard;