import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MovieDetails.css";
import { FiShare2 } from "react-icons/fi";
import TheaterTimings from "../assets/components/movies/TheaterTimings";
import { getMovieById } from "../apis";

// Displays details for the selected movie using data from the Spring Boot backend.
const MovieDetails = () => {

  // Gets the movie ID from the URL such as /movies/4.
  const { movieId } = useParams();

  // Stores the selected movie returned from the backend.
  const [movie, setMovie] = useState(null);

  // Tracks whether the movie data is still loading.
  const [loading, setLoading] = useState(true);

  // Stores an error message if the movie request fails.
  const [error, setError] = useState("");

  // Provides navigation to other React pages.
  const navigate = useNavigate();

  // Formats remain local because the Movie backend does not currently provide them.
  const formats = ["2D", "3D", "IMAX 3D"];

  // Loads the selected movie whenever the movie ID changes.
  useEffect(() => {
    const fetchMovie = async () => {
      try {

        // Calls GET /api/movies/{id} through the API helper.
        const response = await getMovieById(movieId);

        // Stores the movie returned from Spring Boot.
        setMovie(response.data);

      } catch (error) {

        // Displays a user-friendly message if the request fails.
        setError("Unable to load movie details.");

      } finally {

        // Stops the loading state after the request finishes.
        setLoading(false);
      }
    };

    fetchMovie();

  }, [movieId]);

  // Displays a message while waiting for the backend response.
  if (loading) {
    return <p>Loading movie details...</p>;
  }

  // Displays an error if the selected movie cannot be loaded.
  if (error) {
    return <p>{error}</p>;
  }

  // Prevents the page from rendering if no movie was returned.
  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
    <div className="movie-page">

      {/* Uses bannerUrl when available and posterUrl as a fallback. */}
      <div
        className="movie-details"
        style={{
          backgroundImage: `url(${movie.bannerUrl || movie.posterUrl})`,
        }}
      >

        {/* Adds a dark overlay so the movie information is easier to read. */}
        <div className="overlay"></div>

        {/* Main movie details container. */}
        <div className="details-container">

          {/* Displays the Cloudinary movie poster returned from the backend. */}
          <div className="poster-section">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="poster-img"
            />
          </div>

          {/* Displays the selected movie information. */}
          <div className="info-section">

            <h1 className="movie-title">
              {movie.title}
            </h1>

            {/* Displays the backend movie rating. */}
            <div className="rating-box">
              <span className="votes">
                ⭐ {movie.rating}/10
              </span>

              <button type="button" className="rate-btn">
                Rate Now
              </button>
            </div>

            {/* Displays the currently supported movie formats. */}
            <div className="format-box">
              {formats.map((format, index) => (
                <span
                  key={index}
                  className="format-pill"
                >
                  {format}
                </span>
              ))}
            </div>

            {/* Displays movie language from the backend. */}
            <div className="format-box">
              <span className="format-pill">
                {movie.language}
              </span>
            </div>

            {/* Displays duration, genre, certificate, and release date. */}
            <p className="info-text">
              {movie.duration} min •{" "}
              {Array.isArray(movie.genre)
                ? movie.genre.join(", ")
                : movie.genre}{" "}
              • {movie.certificate} • {movie.releaseDate}
            </p>

            {/* Displays the movie description returned from Spring Boot. */}
            <div className="about-section">
              <h2 className="about-title">
                About the movie
              </h2>

              <p className="about-text">
                {movie.description}
              </p>
            </div>

          </div>

          {/* Displays the share button for the movie details page. */}
          <div className="share-btn-container">
            <button type="button" className="share-btn">
              <FiShare2 className="share-icon" />
              Share
            </button>
          </div>

        </div>
      </div>

      {/* Displays theater and show timing information below the movie details. */}
      <div className="timings-section">
        <TheaterTimings />
      </div>

      {/* Navigates to the profile page. */}
      <div className="next-btn-wrapper">
        <button
          type="button"
          className="next-btn"
          onClick={() => navigate("/profile")}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default MovieDetails;