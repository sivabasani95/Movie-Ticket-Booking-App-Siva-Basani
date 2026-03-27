import React from "react";
import BannerSlider from "../assets/components/shared/BannerSlider";
import MovieFilters from "../assets/components/movies/MoviesFilters";
import MovieList from "../assets/components/movies/MovieList";
import "./Movies.css";

const Movies = () => {
    return (
        <div className="movies-page">
            <BannerSlider />
            <div className="movies-layout">
                <MovieFilters />
                <div className="movie-content">
                    {/* Movie grid will go here later */}
                    {/*<h2 className="movies-paceholder">Movies Content Area</h2>*/}
                    <MovieList />

                </div>
                

            </div>




        </div>
    )

}
export default Movies;