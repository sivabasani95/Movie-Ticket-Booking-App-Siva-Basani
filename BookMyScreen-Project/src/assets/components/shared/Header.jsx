// Imports the search icon used inside the movie and event search box.
import { FaSearch, FaUser } from "react-icons/fa";

// Imports the location context hook to access the user's selected/current location.
import { useLocation } from "../../../context/LocationContext";

// Imports the authentication context hook.
import { useAuth } from "../../../context/AuthContext";

// Imports the main BookMyScreen logo displayed in the header.
import mainLogo from "/src/images/main-icon.png";

// Imports the animated location pin displayed next to the user's location.
import map from "/src/images/pin.gif";

// Imports Link to navigate between pages without refreshing the application.
import { Link } from "react-router-dom";

// Creates the main navigation header displayed across the BookMyScreen application.
const Header = () => {

  // Gets location information from LocationContext.
  const {
    location,
    loading,
    error,
  } = useLocation();

  // Gets the logged-in user and modal function from AuthContext.
  const {
    user,
    toggleModal,
  } = useAuth();

  // Get the first name from the user's full name.
  // Example: "Siva Basani" becomes "Siva".
  const firstName = user?.name
    ? user.name.trim().split(" ")[0]
    : "";

  return (
    <>
      <header className="header">

        {/* ================= TOP HEADER ================= */}
        <div className="header-top">

          {/* Logo and search section */}
          <div className="header-left">

            {/* Clicking the logo returns to the home page. */}
            <Link to="/">
              <img
                src={mainLogo}
                alt="BookMyScreen Logo"
                className="logo"
              />
            </Link>

            {/* Search box */}
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

            {/* Location */}
            <div className="location">

              {loading && <p>Loading...</p>}

              {error && <p>{error}</p>}

              {location && (
                <img
                  src={map}
                  alt="location"
                  className="location-icon"
                />
              )}

              {location && (
                <p>
                  {location} ▼
                </p>
              )}

            </div>


            {/* ================= AUTH SECTION ================= */}

            {user ? (

              // If the user is logged in, display their name.
              <Link
                to="/profile"
                className="user-profile-link"
              >

                <FaUser className="user-profile-icon" />

                <span>
                  Hi, {firstName}
                </span>

                <span>
                  ▼
                </span>

              </Link>

            ) : (

              // If there is no logged-in user, display Sign in.
              <button
                className="sign-in-btn"
                onClick={toggleModal}
              >
                Sign in
              </button>

            )}

          </div>


          {/* ================= ABOUT ================= */}
          <div className="about-container">

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

// Exports Header so it can be displayed throughout the application.
export default Header;