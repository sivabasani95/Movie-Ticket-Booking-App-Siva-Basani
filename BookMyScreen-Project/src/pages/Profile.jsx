import "./Profile.css";
import { useEffect, useState } from "react";
import BookingHistory from "../assets/components/profileActiveTab/BookingHistory";

// Imports useAuth to access the logged-in user and logout function.
import { useAuth } from "../context/AuthContext";

// Profile component displays user information, wishlist, and order history.
const Profile = ({ wishlist = [], removeFromWishlist }) => {

  // Gets the logged-in user and logout function from AuthContext.
  const { user, logoutUser } = useAuth();

  // Stores the values displayed inside the profile form.
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    firstName: "",
    lastName: "",
    birthday: "",
  });

  // Stores which profile tab is currently selected.
  const [activeTab, setActiveTab] = useState("profile");

  // Loads the logged-in user's information into the profile form.
  useEffect(() => {

    // Checks that the logged-in user information is available.
    if (user) {

      // Splits the user's full name into separate name parts.
      const nameParts = user.name
        ? user.name.trim().split(" ")
        : [];

      // Uses the first part of the full name as the first name.
      const firstName = nameParts[0] || "";

      // Uses the remaining parts of the full name as the last name.
      const lastName = nameParts.slice(1).join(" ");

      // Copies the logged-in user's backend data into the profile form.
      setFormData((previousData) => ({
        ...previousData,
        email: user.email || "",
        mobile: user.phone || "",
        firstName: firstName,
        lastName: lastName,
      }));
    }

  }, [user]);

  // Updates the correct form field whenever the user changes an input.
  const handleChange = (event) => {

    // Gets the name and value from the input that was changed.
    const { name, value } = event.target;

    // Updates only the form field that was changed.
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Logs out the current user using the logoutUser function from AuthContext.
  const handleLogout = async () => {

    try {

      // Calls AuthContext to clear the login information and return to the home page.
      await logoutUser();

    } catch (error) {

      // Displays the logout error in the browser console if logout fails.
      console.error("Logout failed:", error);
    }
  };

  return (
    <>

      {/* Displays the Profile and Your Orders navigation tabs. */}
      <div className="tabs-wrapper">

        <div className="tabs-container">

          {/* Opens the Profile tab. */}
          <button
            className={`tab-btn ${
              activeTab === "profile" ? "active" : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>

          {/* Opens the Your Orders tab. */}
          <button
            className={`tab-btn ${
              activeTab === "orders" ? "active" : ""
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Bookings
          </button>

        </div>

      </div>

      {/* Displays the profile information when the Profile tab is selected. */}
      {activeTab === "profile" && (

        <div className="profile-page">

          <div className="profile-card">

            {/* Displays the logged-in user's name and logout button. */}
            <div className="profile-header">

              {/* Displays the profile avatar placeholder. */}
              <div className="profile-avatar">
                +
              </div>

              {/* Groups the user's name and Logout button together. */}
              <div className="profile-user-info">

                {/* Displays the logged-in user's name. */}
                <h2>
                  Hi, {user?.name || "User"}
                </h2>

                {/* Logs the user out when the Logout button is clicked. */}
                <button
                  type="button"
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </div>

            </div>

            {/* Displays the user's account information. */}
            <div className="profile-section">

              <h3>
                Account Details
              </h3>

              {/* Displays the email address returned by the backend. */}
              <div className="profile-row">

                <span className="label">
                  Email Address
                </span>

                <input
                  type="email"
                  name="email"
                  className="input-field"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                />

                {/* Shows that the email address has been verified. */}
                <label className="verified-checkbox">

                  <input
                    type="checkbox"
                    checked={Boolean(user?.email)}
                    readOnly
                  />

                  Verified

                </label>

              </div>

              {/* Displays the phone number returned by the backend. */}
              <div className="profile-row">

                <span className="label">
                  Mobile Number
                </span>

                <input
                  type="text"
                  name="mobile"
                  className="input-field"
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                />

                {/* Shows that the phone number is available for the logged-in user. */}
                <label className="verified-checkbox">

                  <input
                    type="checkbox"
                    checked={Boolean(user?.phone)}
                    readOnly
                  />

                  Verified

                </label>

              </div>

            </div>

            {/* Displays the user's personal information. */}
            <div className="profile-section">

              <h3>
                Personal Details
              </h3>

              <div className="profile-grid">

                {/* Displays the first part of the user's full name. */}
                <div className="profile-field">

                  <label>
                    First Name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    className="input-field"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />

                </div>

                {/* Displays the remaining part of the user's full name. */}
                <div className="profile-field">

                  <label>
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    className="input-field"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />

                </div>

                {/* Allows the user to enter an optional birthday. */}
                <div className="profile-field">

                  <label>
                    Birthday (Optional)
                  </label>

                  <input
                    type="text"
                    name="birthday"
                    className="input-field"
                    placeholder="DD-MM-YYYY"
                    value={formData.birthday}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>

            {/* Displays the button that will later save profile changes to the backend. */}
            <div className="profile-actions">

              <button
                type="button"
                className="save-btn"
              >
                Save Details
              </button>

            </div>

            {/* Displays the movies currently stored in the user's wishlist. */}
            <div className="profile-section">

              <h3>
                My Wishlist
              </h3>

              {/* Displays a message when the wishlist does not contain any movies. */}
              {wishlist.length === 0 ? (

                <p>
                  No movies added yet
                </p>

              ) : (

                // Displays each movie currently stored in the wishlist.
                wishlist.map((movie) => (

                  <div
                    key={movie.id}
                    style={{ marginBottom: "10px" }}
                  >

                    {/* Displays the movie title. */}
                    <span>
                      {movie.title}
                    </span>

                    {/* Removes the selected movie from the wishlist. */}
                    <button
                      type="button"
                      style={{ marginLeft: "10px" }}
                      onClick={() =>
                        removeFromWishlist(movie.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      )}

      {/* Displays booking history when the Your Orders tab is selected. */}
      {activeTab === "orders" && (

        <div className="profile-page">

          <BookingHistory />

        </div>

      )}

    </>
  );
};

export default Profile;