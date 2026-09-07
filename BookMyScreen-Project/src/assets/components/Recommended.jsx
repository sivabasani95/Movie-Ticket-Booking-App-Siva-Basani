import React, { useEffect, useState } from "react";
import "./Recommended.css";
import { useNavigate } from "react-router-dom";
import { getAllMovies } from "../../apis";

// Displays recommended movies on the Home page using backend data.
const Recommended = () => {

  // Stores movies received from the backend.
  const [movies, setMovies] = useState([]);

  // Tracks whether movie data is still loading.
  const [loading, setLoading] = useState(true);

  // Stores an error message if the API request fails.
  const [error, setError] = useState("");

  // Used to navigate between movie pages.
  const navigate = useNavigate();

  // Fetches movie data when the component first loads.
  useEffect(() => {

    const fetchRecommendedMovies = async () => {
      try {

        // Gets all movies from the Spring Boot backend.
        const response = await getAllMovies();

        // Displays the first five movies in the Recommended section.
        setMovies(response.data.slice(0, 4));

      } catch (error) {

        // Displays an error message when movie data cannot be loaded.
        setError("Unable to load recommended movies.");

      } finally {

        // Stops the loading state after the API request finishes.
        setLoading(false);
      }
    };

    fetchRecommendedMovies();

  }, []);

  return (
    <div className="recommended-container">

      {/* Main container for the Recommended Movies section. */}
      <div className="recommended-wrapper">

        {/* Displays the section title and See All option. */}
        <div className="recommended-header">

          <h2 className="recommended-title">
            Recommended Movies
          </h2>

          {/* Navigates to the complete Movies page. */}
          <span
            className="recommended-seeall"
            onClick={() => navigate("/movies")}
          >
            See All
          </span>

        </div>

        {/* Displays a message while movies are loading. */}
        {loading && (
          <p>Loading movies...</p>
        )}

        {/* Displays an error message if the backend request fails. */}
        {error && (
          <p>{error}</p>
        )}

        {/* Displays movies after the backend data is loaded. */}
        {!loading && !error && (
          <div className="movies-grid">

            {movies.map((movie) => (

              <div
                key={movie.id}
                className="movie-card"
                onClick={() => navigate(`/movies/${movie.id}`)}
              >

                {/* Displays the movie poster from the backend. */}
                <div className="movie-image-wrapper">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                  />
                </div>

                {/* Displays movie title and genre information. */}
                <div className="movie-info">

                  <h3 className="movie-title">
                    {movie.title}
                  </h3>

                  {/* Converts the backend genre array into readable text. */}
                  <p className="movie-genre">
                    {Array.isArray(movie.genre)
                      ? movie.genre.join(" | ")
                      : movie.genre}
                  </p>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default Recommended;