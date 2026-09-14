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
  const { state } = useLocation();

  // Stores the currently selected date.
  const [selectedDate, setSelectedDate] = useState(today);

  // Stores shows returned from the backend.
  const [shows, setShows] = useState([]);

  // Tracks whether show data is loading.
  const [loadingShows, setLoadingShows] = useState(false);

  // Stores an error message if shows cannot be loaded.
  const [showError, setShowError] = useState("");

  // Creates buttons for today and the next six days.
  const next7days = Array.from(
    { length: 7 },
    (_, i) => today.add(i, "day")
  );

  // Loads shows whenever the movie, date, or state changes.
  useEffect(() => {
    const fetchShows = async () => {
      if (!movieId || !state) {
        return;
      }

      try {
        setLoadingShows(true);
        setShowError("");

        // Formats the selected date for Spring Boot.
        const formattedDate = selectedDate.format("YYYY-MM-DD");

        // Fetches shows using movie ID, date, and state.
        const response = await getShows(
          movieId,
          formattedDate,
          state
        );

        setShows(response.data);

      } catch (error) {
        setShowError("Unable to load show timings.");
        setShows([]);

      } finally {
        setLoadingShows(false);
      }
    };

    fetchShows();

  }, [movieId, selectedDate, state]);

  // Groups multiple shows from the same theater together.
  const groupedTheaters = shows.reduce(
    (result, show) => {
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
    },
    []
  );

  // Stores the filter options shown above the theater list.
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

      {/* Displays seven selectable dates. */}
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

      {/* Displays a loading message while shows are being fetched. */}
      {loadingShows && (
        <p>Loading show timings...</p>
      )}

      {/* Displays an error message if the request fails. */}
      {!loadingShows && showError && (
        <p>{showError}</p>
      )}

      {/* Displays a message when no shows are available. */}
      {!loadingShows &&
        !showError &&
        groupedTheaters.length === 0 && (
          <p>No shows available for the selected date.</p>
        )}

      {/* Displays real theaters and show timings from the backend. */}
      {!loadingShows && !showError && (

        <div className="theatres-container">

          {groupedTheaters.map((item) => (

            <div
              key={item.id}
              className="theatre-card"
            >

              {/* Displays the theater information. */}
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

              {/* Displays all available show times for the theater. */}
              <div className="timings-row">

                {item.shows.map((show) => (
                  <button
                    key={show.id}
                    className="timing-btn"
                    type="button"
                    onClick={() =>
                      navigate(`/shows/${show.id}/seats`)
                    }
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