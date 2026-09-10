import React, { useEffect, useState } from "react";
import "./TheaterTimings.css";
import dayjs from "dayjs";
import { getShows } from "../../../apis";
import { useLocation } from "../../../context/LocationContext";

// Receives the selected movie ID from MovieDetails.
// Uses movie ID, selected date, and state to fetch real shows from Spring Boot.
const TheaterTimings = ({ movieId }) => {
  const today = dayjs();

  // Gets the user's state from LocationContext.
  // This state is sent to the backend when searching for shows.
  const { state } = useLocation();

  // Stores the date currently selected by the user.
  // Today's date is selected when the component first loads.
  const [selectedDate, setSelectedDate] = useState(today);

  // Stores show data returned from the Spring Boot backend.
  // This replaces the old hard-coded theater and timing data.
  const [shows, setShows] = useState([]);

  // Tracks whether show data is currently loading.
  // This helps display a message while waiting for the API response.
  const [loadingShows, setLoadingShows] = useState(false);

  // Stores an error message if show data cannot be loaded.
  // Errors are displayed in the UI instead of using console.log().
  const [showError, setShowError] = useState("");

  // Creates buttons for today and the next six days.
  // Selecting another date sends a new request to the backend.
  const next7days = Array.from(
    { length: 7 },
    (_, i) => today.add(i, "day")
  );

  // Loads shows whenever movie ID, selected date, or state changes.
  // Spring Boot expects movieId, date, and location query parameters.
  useEffect(() => {
    const fetchShows = async () => {

      // Wait until both movie ID and state are available.
      // This prevents sending an incomplete request to Spring Boot.
      if (!movieId || !state) {
        return;
      }

      try {
        setLoadingShows(true);
        setShowError("");

        // Converts the selected date to Java LocalDate format.
        // Example: 2026-09-09.
        const formattedDate = selectedDate.format("YYYY-MM-DD");

        // Calls GET /api/shows with movie ID, date, and state.
        // The state is sent as the backend location parameter.
        const response = await getShows(
          movieId,
          formattedDate,
          state
        );

        // Stores the show data returned from Spring Boot.
        // This data is used to build theater cards and show timings.
        setShows(response.data);

      } catch (error) {

        // Displays an error message if the backend request fails.
        // Clears old show data so incorrect results are not displayed.
        setShowError("Unable to load show timings.");
        setShows([]);

      } finally {

        // Stops the loading state after the API request finishes.
        // This runs whether the request succeeds or fails.
        setLoadingShows(false);
      }
    };

    fetchShows();

  }, [movieId, selectedDate, state]);

  // Groups multiple shows from the same theater together.
  // This lets one theater card display all of its available show times.
  const groupedTheaters = shows.reduce((result, show) => {
    const theaterId = show.theater?.id;

    if (!theaterId) {
      return result;
    }

    const existingTheater = result.find(
      (item) => item.id === theaterId
    );

    if (existingTheater) {
      existingTheater.shows.push(show);
    } else {
      result.push({
        id: theaterId,
        theater: show.theater,
        shows: [show],
      });
    }

    return result;
  }, []);

  // Filter options displayed above the theater list.
  // These remain frontend display options for now.
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

  return (
    <div className="theater-timings">

      {/* Displays movie format and theater feature filters. */}
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

        {/* Displays seat availability status information. */}
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

      {/* Displays seven selectable dates for finding shows. */}
      <div className="date-container">
        {next7days.map((date, i) => {
          const isSelected = selectedDate.isSame(date, "day");

          return (
            <button
              key={i}
              onClick={() => setSelectedDate(date)}
              className={`date-button ${
                isSelected ? "selected" : ""
              }`}
              type="button"
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

      {/* Displays while show data is being loaded from Spring Boot. */}
      {loadingShows && (
        <p>Loading show timings...</p>
      )}

      {/* Displays when the backend request fails. */}
      {!loadingShows && showError && (
        <p>{showError}</p>
      )}

      {/* Displays when the request works but no shows match the search. */}
      {!loadingShows &&
        !showError &&
        groupedTheaters.length === 0 && (
          <p>No shows available for the selected date.</p>
        )}

      {/* Displays real theaters and show times returned from MySQL. */}
      {!loadingShows && !showError && (
        <div className="theatres-container">

          {groupedTheaters.map((item) => (
            <div
              key={item.id}
              className="theatre-card"
            >

              {/* Displays theater information returned by Spring Boot. */}
              <div className="theatre-header">

                {item.theater?.logo && (
                  <img
                    src={item.theater.logo}
                    alt={item.theater.name}
                    className="theatre-logo"
                  />
                )}

                <div className="theatre-info">
                  <h3 className="theatre-name">
                    {item.theater?.name}
                  </h3>

                  <p className="theatre-location">
                    {item.theater?.location}
                  </p>
                </div>

              </div>

              {/* Displays all backend show times for this theater. */}
              <div className="timings-row">

                {item.shows.map((show) => (
                  <button
                    key={show.id}
                    className="timing-btn"
                    type="button"
                  >
                    {show.startTime}
                  </button>
                ))}

                <button
                  className="cancel-btn"
                  type="button"
                >
                  Allow Cancellation
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default TheaterTimings;