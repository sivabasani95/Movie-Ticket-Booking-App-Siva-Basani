import { FaSearch } from "react-icons/fa";
import { useLocation } from "../../../context/LocationContext";
import mainLogo from "/src/images/main-icon.png";
import map from "/src/images/pin.gif";
import { Link } from "react-router-dom";
import { useState } from "react";
import About from "./About";



const Header = () => {
  const [showAbout, setShowAbout] = useState(false);


  const { location, loading, error } = useLocation();

  return (
    <>
    <header className="header">
      <div className="header-top">
        <div className="header-left">
          <img src={mainLogo} alt="BookMyScreen Logo" className="logo" />

          <div className="search-box">
            <input
              type="search"
              placeholder="Search for Movies, Events, Plays, Sports and Activities..."
              className="search-input"
            />
            <FaSearch className="search-icon" />
          </div>
        </div>

        <div className="header-right">
          <div className="location">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {location && <img src={map} alt="location" className="location-icon" />}
            {location && <p>{location} ▼</p>}
          </div>

          <button className="sign-in-btn">Sign in</button>
        </div>

        <div className="about-container">
         <button 
         className="about-btn"
          onClick={() => setShowAbout(!showAbout)}>
            About
            </button>
        </div>
        



      </div>

      {/* FIXED: header-bottom is now active again */}
      <div className="header-bottom">

        <div className="bottom-left-nav">
          <Link to="/movies">Movies</Link>
          <span>Stream</span>
          <span>Events</span>
          <span>Plays</span>
          <span>Sports</span>
          <span>Activities</span>
        </div>

        <div className="bottom-right-nav">
          <span>ListYourShow</span>
          <span>Corporates</span>
          <span>Offers</span>
          <span>Gift Cards</span>
        </div>

      </div>
    </header>
    {showAbout && <About/>}
    </>
  );
};

export default Header;
