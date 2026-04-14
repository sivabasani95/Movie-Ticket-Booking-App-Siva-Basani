import { FaSearch } from "react-icons/fa";
import { useLocation } from "../../../context/LocationContext";
import mainLogo from "/src/images/main-icon.png";
import map from "/src/images/pin.gif";
import { Link } from "react-router-dom";



// Header component
const Header = () => {
 // Get location data from custom context
  const { location, loading, error } = useLocation();

  return (
    <>
    <header className="header">
      {/* Top section of header */}
      <div className="header-top">
        {/* Left side (logo + search) */}
        <div className="header-left">
            {/* App logo */}
          <img src={mainLogo} alt="BookMyScreen Logo" className="logo" />
 {/* Search input box */}
          <div className="search-box">
            <input
              type="search"
              placeholder="Search for Movies, Events, Plays, Sports and Activities..."
              className="search-input"
            />
            <FaSearch className="search-icon" />
          </div>
        </div>
 {/* Right side (location + sign in) */}
        <div className="header-right">
           {/* Location display */}
          <div className="location">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
             {/* Show location icon and name */}
            {location && <img src={map} alt="location" className="location-icon" />}
            {location && <p>{location} ▼</p>}
          </div>
{/* Sign-in button */}
          <button className="sign-in-btn">Sign in</button>
        </div>
{/* About page link */}
        <div className="about-container">
         <Link to="/about" className="about-btn">About</Link>
                                   
        </div>
        



      </div>

      
      {/* Bottom navigation section */}
      <div className="header-bottom">
{/* Left navigation links */}
        <div className="bottom-left-nav">
          <Link to="/movies">Movies</Link>
          <span>Stream</span>
          <span>Events</span>
          <span>Plays</span>
          <span>Sports</span>
          <span>Activities</span>
        </div>
 {/* Right navigation links */}
        <div className="bottom-right-nav">
          <span>ListYourShow</span>
          <span>Corporates</span>
          <span>Offers</span>
          <span>Gift Cards</span>
        </div>

      </div>
    </header>
    
    </>
  );
};

export default Header;
