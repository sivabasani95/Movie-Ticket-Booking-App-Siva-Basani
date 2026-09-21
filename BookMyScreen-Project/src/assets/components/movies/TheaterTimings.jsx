import React, { useEffect, useState } from "react";
import "./TheaterTimings.css";
import dayjs from "dayjs";
import { getShows } from "../../../apis";
import { useLocation } from "../../../context/LocationContext";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Displays theaters and show timings for the selected movie.
const TheaterTimings = ({ movieId }) => {

  // Gets today's date.
  const today = dayjs();

  // Allows navigation to another page.
  const navigate = useNavigate();

  // Gets the user's state from LocationContext.
  const { state } = useLocation();

  // Gets login status and the Sign In modal function.
  const { auth, toggleModal } = useAuth();

  // Stores the selected movie date.
  const [selectedDate, setSelectedDate] = useState(null);

  // Stores shows returned from Spring Boot.
  const [shows, setShows] = useState([]);

  // Tracks whether shows are loading.
  const [loadingShows, setLoadingShows] = useState(false);

  // Stores an error when shows cannot be loaded.
  const [showError, setShowError] = useState("");

  // Creates date buttons for today and the next 6 days.
  const next7days = Array.from(
    { length: 7 },
    (_, i) => today.add(i, "day")
  );

  // Loads shows whenever the movie, date, or state changes.
  useEffect(() => {

    // Gets shows from the Spring Boot backend.
    const fetchShows = async () => {

      // Stop until the movie ID and state are available.
      if (!movieId || !state) {
        return;
      }

      try {

        // Start the loading state.
        setLoadingShows(true);

        // Clear an old error.
        setShowError("");

        // Format the selected date for Spring Boot.
        const formattedDate = selectedDate
          ? selectedDate.format("YYYY-MM-DD")
          : null;

        // Get shows from the backend.
        const response = await getShows(
          movieId,
          formattedDate,
          state
        );

        // Save the returned shows.
        setShows(response.data);

      } catch (error) {

        // Display the error in the browser console.
        console.error("Error loading shows:", error);

        // Save a user-friendly error message.
        setShowError("Unable to load show timings.");

        // Clear old show information.
        setShows([]);

      } finally {

        // Stop the loading state.
        setLoadingShows(false);
      }
    };

    // Run the show-loading function.
    fetchShows();

  }, [movieId, selectedDate, state]);


  // ==========================================================
  // SHOW TIME CLICK
  // ==========================================================

  // Handles what happens when the user clicks a show time.
  const handleShowClick = (showId) => {

    // Open Sign In when the user is not logged in.
    if (!auth) {
      toggleModal();
      return;
    }

    // Open Seat Layout when the user is logged in.
    navigate(`/shows/${showId}/seats`);
  };


  // ==========================================================
  // GROUP SHOWS BY THEATER
  // ==========================================================

  // Groups all shows by theater.
  const groupedTheaters = shows.reduce(
    (result, show) => {

      // Get the theater ID.
      const theaterId = show.theater?.id;

      // Skip the show if theater information is missing.
      if (!theaterId) {
        return result;
      }

      // Find whether this theater was already added.
      const existingTheater = result.find(
        (item) => item.id === theaterId
      );

      // Add the show to an existing theater.
      if (existingTheater) {
        existingTheater.shows.push(show);
      } else {

        // Add a new theater and its first show.
        result.push({
          id: theaterId,
          theater: show.theater,
          shows: [show],
        });
      }

      // Return the updated theater list.
      return result;
    },
    []
  );


  // ==========================================================
  // FILTERS
  // ==========================================================

  // Stores the filter buttons displayed above theaters.
  const filters = [
    "2D",
    "3D",
    "Wheelchair Friendly",
    "Premium Seats",
    "Recliners",
    "IMAX",
    "PVR PxL",
    "4DX",
    "Laser",
    "Dolby Atmos",
  ];


  // ==========================================================
  // PAGE UI
  // ==========================================================

  return (
    <div className="theater-timings">

      {/* Displays the theater filters. */}
      <div className="filters-wrapper">

        <div className="filters-container">

          {filters.map((item, i) => (
            <button
              key={i}
              className="filter-pill"
              type="button"
            >
              {item}
            </button>
          ))}

        </div>


        {/* Displays seat availability information. */}
        <div className="status-row">

          <span className="status-item">
            <span className="status-dot available"></span>
            Available
          </span>

          <span className="status-item">
            <span className="status-dot filling"></span>
            Filling Fast
          </span>

          <span className="status-item">
            <span className="status-dot almost"></span>
            Almost Full
          </span>

        </div>

      </div>


      {/* Displays the next seven dates. */}
      <div className="date-container">

        {next7days.map((date, i) => {

          // Check whether this date is currently selected.
          const isSelected =
            selectedDate &&
            selectedDate.isSame(date, "day");

          return (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedDate(date)}
              className={`date-button ${
                isSelected ? "selected" : ""
              }`}
            >

              <span className="date-day">
                {date.format("D")}
              </span>

              <span className="date-weekday">
                {date.format("ddd")}
              </span>

              <span className="date-month">
                {date.format("MMM").toUpperCase()}
              </span>

            </button>
          );
        })}

      </div>

      <br />


      {/* Displays a message while shows are loading. */}
      {loadingShows && (
        <p>Loading show timings...</p>
      )}


      {/* Displays an error when shows cannot be loaded. */}
      {!loadingShows && showError && (
        <p>{showError}</p>
      )}


      {/* Displays a message when no shows are available. */}
      {!loadingShows &&
        !showError &&
        groupedTheaters.length === 0 && (
          <p>
            {selectedDate
              ? "No shows available for the selected date."
              : "No shows available."}
          </p>
        )}


      {/* Displays theaters and their show times. */}
      {!loadingShows && !showError && (

        <div className="theatres-container">

          {groupedTheaters.map((item) => {

            // Remove duplicate times when no date is selected.
            const showsToDisplay = selectedDate
              ? item.shows
              : [
                  ...new Map(
                    item.shows.map((show) => [
                      show.startTime,
                      show,
                    ])
                  ).values(),
                ];

            return (
              <div
                key={item.id}
                className="theatre-card"
              >

                {/* Displays the theater information. */}
                <div className="theatre-header">

                  {/* Displays the theater logo when available. */}
                  {item.theater?.logo && (
                    <img
                      src={item.theater.logo}
                      alt={item.theater.name}
                      className="theatre-logo"
                    />
                  )}

                  {/* Displays the theater name and location. */}
                  <div className="theatre-info">

                    <h3 className="theatre-name">
                      {item.theater?.name}
                    </h3>

                    <p className="theatre-location">
                      {item.theater?.location}
                    </p>

                  </div>

                </div>


                {/* Displays the available show times. */}
                <div className="timings-row">

                  {showsToDisplay.map((show) => (

                    <button
                      key={show.id}
                      className="timing-btn"
                      type="button"

                      // Checks login before opening Seat Layout.
                      onClick={() =>
                        handleShowClick(show.id)
                      }
                    >
                      {show.startTime}
                    </button>

                  ))}


                  {/* Displays cancellation information. */}
                  <button
                    className="cancel-btn"
                    type="button"
                  >
                    Allow Cancellation
                  </button>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
};

export default TheaterTimings;