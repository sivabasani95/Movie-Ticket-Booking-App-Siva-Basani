import React from "react";
import m4 from "../images/m4.avif";
import "./MovieDetails.css";
import { FiShare2 } from "react-icons/fi";
import TheaterTimings from "../assets/components/movies/TheaterTimings";

const movie = {
  id: 4,
  title: "F1: The Movie",
  genre: ["Action", "Drama", "Sports"],
  rating: 9.5,
  votes: "6.8K",
  img: m4,
  languages: ["English", "Hindi", "Tamil", "Telugu"],
  age: "UA16+",
  format: ["2D", "3D", "IMAX 3D"],
  duration: "2h 24m",
  releaseDate: "2023-09-15",
  description: `F1: The Movie is a high-octane sports drama that dives into the intense world of Formula 1 racing.`,
};

const MovieDetails = () => {
  return (
    <div className="movie-page">
    <div
      className="movie-details"
      style={{ backgroundImage: `url(${movie.img})` }}
    >
      {/* Overlay */}
      <div className="overlay"></div>

      {/* Main content */}
      <div className="details-container">
        
        {/* Poster */}
        <div className="poster-section">
          <img src={movie.img} alt={movie.title} className="poster-img" />
        </div>

        {/* Info */}
        <div className="info-section">
          <h1 className="movie-title">{movie.title}</h1>

          <div className="rating-box">
            <span className="votes">{movie.votes} votes</span>
            <button className="rate-btn">Rate Now</button>
          </div>

          <div className="format-box">
            {movie.format.map((f, index) => (
              <span key={index} className="format-pill">
                {f}
              </span>
            ))}
          </div>

          <p className="info-text">
            {movie.duration} • {movie.genre.join(", ")} • {movie.age} •{" "}
            {movie.releaseDate}
          </p>

          <div className="about-section">
            <h2 className="about-title">About the movie</h2>
            <p className="about-text">{movie.description}</p>
          </div>
        </div>

        {/* ✅ Share Button (FIXED) */}
        <div className="share-btn-container">
          <button className="share-btn">
            <FiShare2 className="share-icon" />
            Share
          </button>
        </div>

      </div>

      </div>
     <div className="timings-section">
  <TheaterTimings />
</div>
    </div>
  );
};

export default MovieDetails;