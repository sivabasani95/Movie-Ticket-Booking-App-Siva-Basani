import { FaSearch } from "react-icons/fa";
import mainLogo from "../../images/main-icon.png";


const Header = () => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="header-left">
          <img
            src={mainLogo}
            alt="BookMyScreen Logo"
            className="logo"
          />

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
          <div className="location">St Louis ▼</div>
          <button className="sign-in-btn">Sign in</button>
        </div>
      </div>

      <div className="header-bottom">
        <div className="bottom-left-nav">
          <span>Movies</span>
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
  );
};

export default Header;
