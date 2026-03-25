import React from "react";
import "./Recommended.css";
import { movies } from "../../utils/constants";

const Recommended = () => {
    return (
        <div className="recommended-container">
            <div className="recommended-wrapper">
                <div className="recommended-header">
                    <h2 className="recommended-title">Recommended</h2>

                    <span className="recommended-seeall">See All</span>
                        
                    
                </div>

                <div className="movies-grid">
                    {movies.map((movie, i) => (
                        <div key={i} className="movie-card">
                            <div className="movie-image-wrapper">
                            <img
                                src={movie.img}
                                alt={movie.title}
                            />
                            </div>


                            <div className="movie-info">
                                <h3 className="movie-title">{movie.title}</h3>
                                <p className="movie-genre">{movie.genre}
                                {movie.genre.replaceAll("/","|")}
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
