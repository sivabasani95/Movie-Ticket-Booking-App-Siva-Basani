// Imports the search and user icons.
import { FaSearch, FaUser } from "react-icons/fa";

// Imports the location context hook.
import { useLocation } from "../../../context/LocationContext";

// Imports the authentication context hook.
import { useAuth } from "../../../context/AuthContext";

// Imports the BookMyScreen logo.
import mainLogo from "/src/images/main-icon.png";

// Imports the animated location pin.
import map from "/src/images/pin.gif";

// Imports Link for navigation without refreshing the page.
import { Link } from "react-router-dom";

// Creates the main navigation header.
const Header = () => {

  // Gets location information from LocationContext.
  const {
    location,
    loading,
    error,
  } = useLocation();

  // Gets login status, user information, and modal function.
  const {
    auth,
    user,
    toggleModal,
  } = useAuth();

  // Gets the first name from the user's full name.
  const firstName = user?.name
    ? user.name.trim().split(" ")[0]
    : "";

  return (
    <>
      <header className="header">

        {/* ================= TOP HEADER ================= */}
        <div className="header-top">

          {/* Displays the logo and search box. */}
          <div className="header-left">

            {/* Returns to the Home page when the logo is clicked. */}
            <Link to="/">
              <img
                src={mainLogo}
                alt="BookMyScreen Logo"
                className="logo"
              />
            </Link>

            {/* Displays the search box. */}
            <div className="search-box">

              <input
                type="search"
                placeholder="Search for Movies, Events, Plays, Sports and Activities..."
                className="search-input"
              />

              <FaSearch className="search-icon" />

            </div>

          </div>


          {/* ================= RIGHT HEADER ================= */}
          <div className="header-right">

            {/* Displays the user's current location. */}
            <div className="location">

              {/* Displays while location is loading. */}
              {loading && <p>Loading...</p>}

              {/* Displays a location error if one occurs. */}
              {error && <p>{error}</p>}

              {/* Displays the location icon when location is available. */}
              {location && (
                <img
                  src={map}
                  alt="location"
                  className="location-icon"
                />
              )}

              {/* Displays the current location. */}
              {location && (
                <p>
                  {location} ▼
                </p>
              )}

            </div>


            {/* ================= AUTH SECTION ================= */}

            {/* Displays the user's name when they are logged in. */}
            {auth && user ? (

              // Opens the Profile page when the user's name is clicked.
              <Link
                to="/profile"
                className="user-profile-link"
              >

                {/* Displays the user icon. */}
                <FaUser className="user-profile-icon" />

                {/* Displays the logged-in user's first name. */}
                <span>
                  Hi, {firstName}
                </span>

                {/* Displays the small dropdown arrow. */}
                <span>
                  ▼
                </span>

              </Link>

            ) : (

              // Opens the Sign In modal when the user is logged out.
              <button
                type="button"
                className="sign-in-btn"
                onClick={toggleModal}
              >
                Sign in
              </button>

            )}

          </div>


          {/* ================= ABOUT ================= */}
          <div className="about-container">

            {/* Opens the About page. */}
            <Link
              to="/about"
              className="about-btn"
            >
              About
            </Link>

          </div>

        </div>


        {/* ================= BOTTOM NAVIGATION ================= */}
        <div className="header-bottom">

          {/* Displays the main navigation links. */}
          <div className="bottom-left-nav">

            <Link to="/movies">
              Movies
            </Link>

            <span>Stream</span>
            <span>Events</span>
            <span>Plays</span>
            <span>Sports</span>
            <span>Activities</span>

          </div>


          {/* Displays the secondary navigation links. */}
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

// Exports Header for use throughout the application.
export default Header;