import React, { useEffect, useState } from "react";
import "./TheaterTimings.css";
import dayjs from "dayjs";
import { getShows } from "../../../apis";
import { useLocation } from "../../../context/LocationContext";
import { useNavigate } from "react-router-dom";

// Displays theaters and show timings for the selected movie.
const TheaterTimings = ({ movieId }) => {
  const today = dayjs();

  // Allows navigation to the seat selection page.
  const navigate = useNavigate();

  // Gets the user's state from LocationContext.
  // Example: Missouri
  // The backend uses state for searching shows.
  const { state } = useLocation();

  // No date is selected when the page first opens.
  // This allows shows to appear before clicking a date.
  const [selectedDate, setSelectedDate] = useState(null);

  // Stores shows returned from Spring Boot.
  const [shows, setShows] = useState([]);

  // Tracks loading state.
  const [loadingShows, setLoadingShows] = useState(false);

  // Stores API error message.
  const [showError, setShowError] = useState("");

  // Creates date buttons for today and the next 6 days.
  const next7days = Array.from(
    { length: 7 },
    (_, i) => today.add(i, "day")
  );

  // Loads shows whenever movie, date, or state changes.
  useEffect(() => {
    const fetchShows = async () => {

      // Wait until movie ID and state are available.
      if (!movieId || !state) {
        return;
      }

      try {
        setLoadingShows(true);
        setShowError("");

        // If a date is selected, send the date.
        // Otherwise send null.
        const formattedDate = selectedDate
          ? selectedDate.format("YYYY-MM-DD")
          : null;

        // Calls the Spring Boot shows API.
        const response = await getShows(
          movieId,
          formattedDate,
          state
        );

        // Store shows returned by backend.
        setShows(response.data);

      } catch (error) {
        console.error("Error loading shows:", error);

        setShowError("Unable to load show timings.");
        setShows([]);

      } finally {
        setLoadingShows(false);
      }
    };

    fetchShows();

  }, [movieId, selectedDate, state]);

  // Groups all shows by theater.
  const groupedTheaters = shows.reduce(
    (result, show) => {

      // Get theater ID.
      const theaterId = show.theater?.id;

      // Skip if theater information is missing.
      if (!theaterId) {
        return result;
      }

      // Check if this theater is already added.
      const existingTheater = result.find(
        (item) => item.id === theaterId
      );

      if (existingTheater) {
        // Add show to existing theater.
        existingTheater.shows.push(show);
      } else {
        // Add new theater.
        result.push({
          id: theaterId,
          theater: show.theater,
          shows: [show],
        });
      }

      return result;
    },
    []
  );

  // Filter buttons displayed above theaters.
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

      {/* ================================
          FILTERS
          ================================ */}

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

        {/* ================================
            SEAT AVAILABILITY STATUS
            ================================ */}

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

      {/* ================================
          DATE SELECTION
          ================================ */}

      <div className="date-container">

        {next7days.map((date, i) => {

          // Check whether this date is selected.
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

      {/* ================================
          LOADING
          ================================ */}

      {loadingShows && (
        <p>Loading show timings...</p>
      )}

      {/* ================================
          ERROR
          ================================ */}

      {!loadingShows && showError && (
        <p>{showError}</p>
      )}

      {/* ================================
          NO SHOWS
          ================================ */}

      {!loadingShows &&
        !showError &&
        groupedTheaters.length === 0 && (
          <p>
            {selectedDate
              ? "No shows available for the selected date."
              : "No shows available."}
          </p>
        )}

      {/* ================================
          THEATERS AND SHOW TIMES
          ================================ */}

      {!loadingShows && !showError && (

        <div className="theatres-container">

          {groupedTheaters.map((item) => {

            // When no date is selected, the backend returns
            // shows from multiple dates.
            //
            // Example:
            // Sep 17 -> 09:00
            // Sep 18 -> 09:00
            // Sep 19 -> 09:00
            //
            // We only want to display 09:00 once.
            //
            // Map uses startTime as the key,
            // so duplicate times are removed.
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

                {/* ================================
                    THEATER INFORMATION
                    ================================ */}

                <div className="theatre-header">

                  {/* Theater logo */}
                  {item.theater?.logo && (
                    <img
                      src={item.theater.logo}
                      alt={item.theater.name}
                      className="theatre-logo"
                    />
                  )}

                  {/* Theater name and location */}
                  <div className="theatre-info">

                    <h3 className="theatre-name">
                      {item.theater?.name}
                    </h3>

                    <p className="theatre-location">
                      {item.theater?.location}
                    </p>

                  </div>

                </div>

                {/* ================================
                    SHOW TIMES
                    ================================ */}

                <div className="timings-row">

                  {showsToDisplay.map((show) => (

                    <button
                      key={show.id}
                      className="timing-btn"
                      type="button"

                      // Opens seat selection page
                      // for this show.
                      onClick={() =>
                        navigate(`/shows/${show.id}/seats`)
                      }
                    >
                      {show.startTime}
                    </button>

                  ))}

                  {/* Cancellation information */}
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