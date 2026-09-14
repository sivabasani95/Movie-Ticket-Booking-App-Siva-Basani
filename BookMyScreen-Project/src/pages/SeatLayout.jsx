import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShowById } from "../apis";
import Header from "../assets/components/seat-layout/Header";
import Footer from "../assets/components/seat-layout/Footer";

// Displays the seat layout for the selected show.
const SeatLayout = () => {
  const { showId } = useParams();

  // Stores the selected show from Spring Boot.
  const [show, setShow] = useState(null);

  // Stores selected seat IDs.
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Tracks whether show data is loading.
  const [loading, setLoading] = useState(true);

  // Stores an error message if the show cannot be loaded.
  const [error, setError] = useState("");

  // Loads the selected show using the show ID from the URL.
  useEffect(() => {
    const fetchShow = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getShowById(showId);

        setShow(response.data);
      } catch (error) {
        setError("Unable to load seat information.");
        setShow(null);
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [showId]);

  // Selects or removes an available seat.
  const handleSeatClick = (seat) => {
    if (seat.status !== "AVAILABLE") {
      return;
    }

    setSelectedSeats((prev) =>
      prev.includes(seat.id)
        ? prev.filter((id) => id !== seat.id)
        : [...prev, seat.id]
    );
  };

  // Groups seats by row name.
  const groupedSeats =
    show?.seatLayout?.reduce((result, seat) => {
      if (!result[seat.row]) {
        result[seat.row] = [];
      }

      result[seat.row].push(seat);

      return result;
    }, {}) || {};

  if (loading) {
    return <p>Loading seats...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!show) {
    return <p>Show not found.</p>;
  }

  return (
    <div className="seat-layout-page">

      <Header showData={show} />

      <div className="seat-layout-content">

        <h2>Select Your Seats</h2>

        <h3>{show.movie?.title}</h3>

        <p>{show.theater?.name}</p>

        <p>
          {show.date} | {show.startTime} | {show.format}
        </p>

        <div className="screen">
          SCREEN
        </div>

        <div className="seat-layout">

          {Object.entries(groupedSeats).map(
            ([row, seats]) => (
              <div
                key={row}
                className="seat-row"
              >

                <span className="row-label">
                  {row}
                </span>

                {seats.map((seat) => {
                  const isSelected =
                    selectedSeats.includes(seat.id);

                  return (
                    <button
                      key={seat.id}
                      type="button"
                      disabled={seat.status !== "AVAILABLE"}
                      onClick={() => handleSeatClick(seat)}
                      className={`seat-button ${
                        seat.status === "BOOKED"
                          ? "booked"
                          : isSelected
                          ? "selected"
                          : "available"
                      }`}
                    >
                      {seat.number}
                    </button>
                  );
                })}

              </div>
            )
          )}

        </div>

        <p>
          Selected Seats: {selectedSeats.length}
        </p>

      </div>

      <Footer />

    </div>
  );
};

export default SeatLayout;