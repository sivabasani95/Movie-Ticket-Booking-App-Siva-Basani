

import React from "react";
import "./About.css";

// About component to display app information
const About = () => {
  return (
    <div className="about-page">
         {/* Main content box */}
    <div className="about-box">
         {/* Page title */}
      <h2>About BookMyScreen</h2>
 {/* Description about the app */}
      <p>
        BookMyScreen is a movie ticket booking application built using React.
        It allows users to browse movies, check showtimes, and view theater details.
      </p>
 {/* Features of the application */}
      <p>
        Features include movie listings, filters (languages, formats),
        theater timings, and responsive UI design.
      </p>
{/* Project purpose */}
      <p>
        This project is developed as part of learning modern frontend development
        using React, CSS, and component-based architecture.
      </p>
    </div>
    </div>
  );

};

export default About;