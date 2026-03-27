import React from "react";
import "./MovieList.css";// Styles for the MovieList layout and language pills



/* Renders a list of language pills using the `languages` array */
const MovieList = () => {
    return (
        <div className="movie-list-container">
            
            {/* Wrapper for all language pills */}
            <div className="language-list">

                {/* Loop through languages and display each as a pill */}
                {languages.map((lang, i) => (
                    <span key={i} className="language-pill">
                        {lang}
                    </span>
                ))}

            </div>

            



        </div>
    );
};

export default MovieList;
