

import React from "react";
import "./Recommended.css";
import { movies } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

// Recommended component to show movie list on home page
const Recommended = () => {

    // Hook for navigation
    const navigate = useNavigate();


    return (
        <div className="recommended-container">
            {/* Wrapper for centered layout */}
            <div className="recommended-wrapper">
                <div className="recommended-header">
                    <h2 className="recommended-title">Recommended Movies</h2>
                    {/* Navigate to movies page */}
                    <span className="recommended-seeall" onClick={() => navigate("/movies")}>See All</span>


                </div>

                {/* Movies grid */}
                <div className="movies-grid">
                    {movies.map((movie, i) => (


                        <div key={i} className="movie-card"

                            onClick={() => navigate(`/movies/${movie.id}`)}> //{/* Navigate to movie details page */}
                            {/* Movie image */}
                            <div className="movie-image-wrapper">
                                <img
                                    src={movie.img}
                                    alt={movie.title}
                                />
                            </div>

                            {/* Movie info */}
                            <div className="movie-info">
                                <h3 className="movie-title">{movie.title}</h3>
                                {/* Movie genre (replace / with | for display) */}
                                <p className="movie-genre">{movie.genre}
                                    {movie.genre.replaceAll("/", "|")}
                                </p>
                            </div>
                        </div>



                    ))}
                </div>

            </div>

        </div>
    );
};

export default Recommended;
