import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

import Header from "../assets/components/seat-layout/Header";
import Footer from "../assets/components/seat-layout/Footer";
import { getShowById } from "../apis";

const SeatLayout = () => {
  // Gets the show ID from the URL, for example /shows/2204/seats.
  const { showId } = useParams();

  // Allows this page to navigate to the Checkout page.
  const navigate = useNavigate();

  // Stores the show information returned by the backend.
  const [show, setShow] = useState(null);

  // Stores all seats currently selected by the user.
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Tracks whether show information is still loading.
  const [loading, setLoading] = useState(true);

  // Stores an error message if the backend request fails.
  const [error, setError] = useState("");

  // Temporary occupied seats until occupied-seat data comes from the backend.
  const occupiedSeats = useMemo(
    () => ["E6", "D10", "C12", "B16", "A6"],
    []
  );

  // Defines the seat sections, prices, row letters, and number of seats.
  const seatSections = [
    {
      name: "PREMIUM",
      price: 20,
      rows: [{ row: "E", seats: 10 }],
    },
    {
      name: "EXECUTIVE",
      price: 15,
      rows: [
        { row: "D", seats: 20 },
        { row: "C", seats: 20 },
        { row: "B", seats: 20 },
      ],
    },
    {
      name: "NORMAL",
      price: 10,
      rows: [{ row: "A", seats: 20 }],
    },
  ];

  // Loads the selected show's movie, theater, date, and time from the backend.
  useEffect(() => {
    const fetchShow = async () => {
      try {
        // Show the loading state while waiting for the backend response.
        setLoading(true);

        // Clear any previous error message.
        setError("");

        // Calls GET show-by-ID using the show ID from the URL.
        const response = await getShowById(showId);

        // Helps us inspect the exact backend show object in the browser console.
        console.log("Show data:", response.data);

        // Saves the complete backend show object in state.
        setShow(response.data);
      } catch (err) {
        // Prints the actual backend/API error for debugging.
        console.error("Error loading show:", err);

        // Displays a user-friendly error message on the page.
        setError("Unable to load show information.");
      } finally {
        // Stops the loading state whether the request succeeds or fails.
        setLoading(false);
      }
    };

    // Only call the backend when a show ID exists.
    if (showId) {
      fetchShow();
    }
  }, [showId]);

  // Returns the correct ticket price by checking the seat's row letter.
  const getSeatPrice = (seatId) => {
    // Gets the first character, such as A from A2 or E from E5.
    const rowLetter = seatId.charAt(0);

    // Finds which seat section contains that row.
    const section = seatSections.find((section) =>
      section.rows.some((row) => row.row === rowLetter)
    );

    // Returns the section price, or 0 if no matching section exists.
    return section?.price || 0;
  };

  // Calculates the total cost whenever selectedSeats changes.
  const totalPrice = selectedSeats.reduce(
    (total, seatId) => total + getSeatPrice(seatId),
    0
  );

  // Selects an available seat or removes it when clicked again.
  const handleSeatClick = (seatId) => {
    // Prevent occupied seats from being selected.
    if (occupiedSeats.includes(seatId)) {
      return;
    }

    // Update the selected seats using the previous state.
    setSelectedSeats((currentSeats) => {
      // If the seat is already selected, clicking it again deselects it.
      if (currentSeats.includes(seatId)) {
        return currentSeats.filter((seat) => seat !== seatId);
      }

      // Otherwise add the new seat to the selected seats.
      return [...currentSeats, seatId];
    });
  };

  // Returns different Tailwind classes based on each seat's current status.
  const getSeatClass = (seatId) => {
    // Shared size, shape, text, alignment, and animation for every seat.
    const baseClasses =
      "w-9 h-9 rounded-md text-sm flex items-center justify-center transition-all duration-150";

    // Gray styling represents an occupied seat.
    if (occupiedSeats.includes(seatId)) {
      return `${baseClasses} bg-gray-200 border border-gray-200 text-gray-500 cursor-not-allowed`;
    }

    // Violet styling represents a seat selected by the user.
    if (selectedSeats.includes(seatId)) {
      return `${baseClasses} bg-violet-600 border border-violet-600 text-white cursor-pointer`;
    }

    // White styling represents an available seat.
    return `${baseClasses} bg-white border border-gray-500 text-gray-900 cursor-pointer hover:border-violet-600 hover:-translate-y-0.5`;
  };

  // Display a loading message while show information is being retrieved.
  if (loading) {
    return (
      <div className="py-20 text-center text-lg">
        Loading seats...
      </div>
    );
  }

  // Display an error message if the backend request failed.
  if (error) {
    return (
      <div className="py-20 text-center text-lg text-red-500">
        {error}
      </div>
    );
  }

  // Prevent the seat layout from rendering when no show was returned.
  if (!show) {
    return (
      <div className="py-20 text-center text-lg">
        Show not found.
      </div>
    );
  }

  // Gets the movie title from the backend show object.
  const movieTitle =
    show.movie?.title ||
    show.movieTitle ||
    "Movie";

  // Gets the theater name from the backend show object.
  const theaterName =
    show.theater?.name ||
    show.theaterName ||
    "";

  // Formats the backend show date into a readable format.
  const showDate = show.date
    ? dayjs(show.date).format("DD MMMM YYYY")
    : "";

  // Formats the backend start time into a readable 12-hour time.
  const showTime = show.startTime
    ? dayjs(`2000-01-01T${show.startTime}`).format("hh:mm A")
    : "";

  // Gets the show format, such as 2D, 3D, or IMAX, when available.
  const showFormat = show.format || "";

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Uses the special SeatLayout header instead of the normal application header. */}
      <Header />

      {/* Displays the selected movie and show information above the seats. */}
      <div className="border-b border-gray-200 px-5 py-3 text-center">

        {/* Displays the movie title dynamically from the backend. */}
        <h2 className="m-0 text-2xl font-bold">
          {movieTitle}
        </h2>

        {/* Displays date, theater, time, and format when those values exist. */}
        <p className="mt-1 text-sm text-gray-500">

          {showDate}

          {theaterName && (
            <>
              {" | "}
              {theaterName}
            </>
          )}

          {showTime && (
            <>
              {" | "}
              {showTime}
            </>
          )}

          {showFormat && (
            <>
              {" | "}
              {showFormat}
            </>
          )}

        </p>

      </div>

      {/* Contains all Premium, Executive, and Normal seat sections. */}
      <main className="mx-auto w-full max-w-6xl overflow-x-auto px-5 py-10">

        {/* Creates each seat section from the seatSections array. */}
        {seatSections.map((section) => (

          <section
            key={section.name}
            className="mb-10 min-w-[900px]"
          >

            {/* Displays the section name and price. */}
            <h3 className="mb-5 text-center text-lg font-bold">
              {section.name} : ${section.price}
            </h3>

            {/* Creates every row belonging to this section. */}
            {section.rows.map((rowData) => (

              <div
                key={rowData.row}
                className="my-2 flex items-center justify-center"
              >

                {/* Displays the row letter beside the seats. */}
                <span className="w-10 text-center font-medium text-gray-500">
                  {rowData.row}
                </span>

                {/* Keeps all seats in the current row aligned horizontally. */}
                <div className="flex gap-2">

                  {/* Generates the correct number of seat buttons for this row. */}
                  {Array.from(
                    { length: rowData.seats },
                    (_, index) => {
                      // Converts the zero-based array index into seat numbers starting at 1.
                      const seatNumber = index + 1;

                      // Creates a unique seat ID such as A2, C10, or E5.
                      const seatId = `${rowData.row}${seatNumber}`;

                      // Checks whether this seat is already occupied.
                      const occupied = occupiedSeats.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          type="button"

                          // Prevents clicking an occupied seat.
                          disabled={occupied}

                          // Applies available, occupied, or selected Tailwind styling.
                          className={getSeatClass(seatId)}

                          // Selects or deselects this seat when clicked.
                          onClick={() => handleSeatClick(seatId)}
                        >
                          {/* Occupied seats display X; available seats display their number. */}
                          {occupied ? "X" : seatNumber}
                        </button>
                      );
                    }
                  )}

                </div>

              </div>

            ))}

          </section>

        ))}

        {/* Displays the curved cinema screen below the seats. */}
        <div className="mt-12 text-center">

          {/* Creates the curved purple screen using only Tailwind CSS. */}
          <div
            className="
              mx-auto
              h-10
              w-[380px]
              max-w-[70%]
              rounded-[50%_50%_8px_8px]
              border-2
              border-violet-500
              bg-gradient-to-b
              from-violet-100
              to-violet-300
            "
          />

          {/* Shows the direction of the cinema screen. */}
          <p className="mt-3 text-sm tracking-wide text-gray-500">
            SCREEN THIS WAY
          </p>

        </div>

      </main>

      {/* Displays the selected-seat count, total price, and Proceed button. */}
      <div
        className="
          flex
          w-full
          items-center
          justify-between
          border-t
          border-gray-200
          bg-white
          px-9
          py-5
        "
      >

        {/* Displays how many seats the user has selected. */}
        <div>

          <p className="text-lg font-bold">
            {selectedSeats.length}{" "}
            {selectedSeats.length === 1
              ? "Seat"
              : "Seats"}{" "}
            Selected
          </p>

          {/* Displays the actual seat IDs only when at least one seat is selected. */}
          {selectedSeats.length > 0 && (
            <p className="mt-1 text-sm text-gray-500">
              {selectedSeats.join(", ")}
            </p>
          )}

        </div>

        {/* Keeps the total price and Proceed button together on the right side. */}
        <div className="flex items-center gap-6">

          {/* Displays the dynamically calculated price for all selected seats. */}
          <p className="text-xl font-bold">
            Total: ${totalPrice}
          </p>

          {/* Navigates to Checkout and passes all booking information. */}
          <button
            type="button"

            // The user cannot proceed without selecting at least one seat.
            disabled={selectedSeats.length === 0}

            // Pass selected seats, calculated total, and complete show data to Checkout.jsx.
            onClick={() => {
              navigate(`/shows/${showId}/checkout`, {
                state: {
                  selectedSeats,
                  totalPrice,
                  show,
                },
              });
            }}

            // Tailwind styles the active, hover, and disabled button states.
            className="
              min-w-[140px]
              rounded-lg
              bg-violet-600
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-violet-700
              disabled:cursor-not-allowed
              disabled:bg-gray-300
            "
          >
            Proceed
          </button>

        </div>

      </div>

      {/* Uses the SeatLayout-specific footer at the bottom of this page. */}
      <Footer />

    </div>
  );
};

export default SeatLayout;