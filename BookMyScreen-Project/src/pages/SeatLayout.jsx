import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { getShowById } from "../apis";
import Header from "../assets/components/seat-layout/Header";
import Footer from "../assets/components/seat-layout/Footer";

// Main component for displaying the seat selection page.
const SeatLayout = () => {

  // Gets the showId from the URL.
  // Example: /shows/1112/seats
  const { showId } = useParams();

  // Stores the show information received from the backend.
  const [show, setShow] = useState(null);

  // Stores the IDs of seats selected by the user.
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Tracks whether the show information is loading.
  const [loading, setLoading] = useState(true);

  // Stores an error message if the API request fails.
  const [error, setError] = useState("");

  // ==========================================
  // LOAD SHOW DATA FROM SPRING BOOT BACKEND
  // ==========================================

  useEffect(() => {

    // Function to get one show from the backend.
    const fetchShow = async () => {
      try {

        // Start loading.
        setLoading(true);

        // Clear old error messages.
        setError("");

        // Calls the API using the showId from the URL.
        const response = await getShowById(showId);

        // Stores the returned show information.
        setShow(response.data);

      } catch (error) {

        // Shows an error message if the request fails.
        setError("Unable to load seat information.");

        // Clears old show information.
        setShow(null);

      } finally {

        // Stops loading after the API request finishes.
        setLoading(false);
      }
    };

    // Calls the function.
    fetchShow();

  }, [showId]);

  // ==========================================
  // SELECT OR UNSELECT A SEAT
  // ==========================================

  const handleSeatClick = (seat) => {

    // Do not allow the user to select an occupied seat.
    if (seat.status !== "AVAILABLE") {
      return;
    }

    // Updates the selected seat list.
    setSelectedSeats((previousSeats) =>

      // If the seat is already selected,
      // clicking it again removes it.
      previousSeats.includes(seat.id)
        ? previousSeats.filter((id) => id !== seat.id)

        // Otherwise add the seat to the selected list.
        : [...previousSeats, seat.id]
    );
  };

  // ==========================================
  // GROUP SEATS BY ROW
  // ==========================================

  /*
    The backend gives us one seatLayout array.

    This code groups the seats by row.

    Example:

    A -> 1, 2, 3, 4...
    B -> 1, 2, 3, 4...
    C -> 1, 2, 3, 4...
  */

  const groupedSeats =
    show?.seatLayout?.reduce((result, seat) => {

      // If this row does not exist yet,
      // create an empty array for it.
      if (!result[seat.row]) {
        result[seat.row] = [];
      }

      // Add the current seat to its row.
      result[seat.row].push(seat);

      // Return the updated result.
      return result;

    }, {}) || {};

  // ==========================================
  // LOADING MESSAGE
  // ==========================================

  // Displays this while waiting for backend data.
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading seats...</p>
      </div>
    );
  }

  // ==========================================
  // ERROR MESSAGE
  // ==========================================

  // Displays this if the API request fails.
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  // ==========================================
  // SHOW NOT FOUND
  // ==========================================

  // Displays this if there is no show information.
  if (!show) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Show not found.</p>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ======================================
          HEADER
          ====================================== */}

      {/* Passes show information to Header.jsx. */}
      <Header showData={show} />

      {/* ======================================
          MAIN PAGE CONTENT
          ====================================== */}

      {/* flex-1 allows the main section to use
          the available space between header and footer. */}
      <main className="flex-1">

        {/* ======================================
            SHOW DATE AND TIME SECTION
            ====================================== */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">

          {/* Page title */}
          <h2 className="text-lg font-semibold mb-4">
            Select Your Seats
          </h2>

          {/* Places date and show time next to each other. */}
          <div className="flex items-center gap-4 border-b border-gray-300 pb-4">

            {/* ======================================
                SHOW DATE
                ====================================== */}

            <div className="text-center min-w-[90px]">

              {/* Displays short day name.
                  Example: Tue */}
              <p className="text-xs text-gray-500">
                {dayjs(show.date).format("ddd")}
              </p>

              {/* Displays date and month.
                  Example: 15 September */}
              <p className="text-sm font-semibold">
                {dayjs(show.date).format("D MMMM")}
              </p>

            </div>

            {/* ======================================
                SHOW TIME
                ====================================== */}

            <button
              type="button"
              className="border border-gray-400 rounded-xl px-6 py-2 text-sm font-medium bg-gray-100"
            >

              {/* Displays the movie start time.
                  Example: 09:00:00 */}
              <span className="block">
                {show.startTime}
              </span>

              {/* Displays the movie format.
                  Example: 2D */}
              <span className="block text-xs text-gray-500 mt-1">
                {show.format}
              </span>

            </button>

          </div>

        </div>

        {/* ======================================
            SEAT AREA
            ====================================== */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-32">

          {/* Allows horizontal scrolling when
              the screen is small, such as a phone. */}
          <div className="overflow-x-auto">

            {/* Keeps all seat rows centered. */}
            <div className="min-w-max flex flex-col items-center">

              {/* ======================================
                  SEAT ROWS
                  ====================================== */}

              {/* Loops through grouped seat rows.
                  Example: A, B, C, D, E */}
              {Object.entries(groupedSeats).map(([row, seats]) => (

                <div
                  key={row}
                  className="flex items-center mb-3"
                >

                  {/* Displays row letter.
                      Example: A */}
                  <span className="w-8 text-sm text-gray-500 font-medium">
                    {row}
                  </span>

                  {/* Holds all seats for this row. */}
                  <div className="flex gap-2">

                    {/* Loops through each seat. */}
                    {seats.map((seat) => {

                      // Checks if this seat is selected.
                      const isSelected =
                        selectedSeats.includes(seat.id);

                      // If the seat is not AVAILABLE,
                      // treat it as occupied.
                      const isBooked =
                        seat.status !== "AVAILABLE";

                      return (

                        <button
                          key={seat.id}
                          type="button"

                          // Occupied seats cannot be clicked.
                          disabled={isBooked}

                          // Selects or unselects the seat.
                          onClick={() => handleSeatClick(seat)}

                          // Changes seat style depending
                          // on available, occupied, or selected.
                          className={`
                            w-8
                            h-8
                            rounded-md
                            text-xs
                            font-medium
                            border
                            transition
                            duration-200

                            ${
                              isBooked
                                ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                                : isSelected
                                ? "bg-purple-600 border-purple-600 text-white"
                                : "bg-white border-gray-400 text-gray-700 hover:border-purple-500 cursor-pointer"
                            }
                          `}
                        >

                          {/* Displays seat number.
                              Example: 1, 2, 3... */}
                          {seat.number}

                        </button>
                      );
                    })}

                  </div>

                </div>
              ))}

              {/* ======================================
                  MOVIE SCREEN
                  ====================================== */}

              <div className="flex flex-col items-center mt-12">

                {/* Curved movie screen shape */}
                <div className="w-64 sm:w-80 h-3 bg-purple-200 rounded-[50%] shadow-sm" />

                {/* Shows which direction the screen is. */}
                <p className="text-xs font-semibold text-purple-600 mt-3">
                  SCREEN THIS WAY
                </p>

              
                     {/* ======================================
                    SEAT STATUS LEGEND
                    ======================================  */}
 
                <div className="flex items-center justify-center gap-5 mt-3 text-xs">

              

                

                 

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

      {/* ======================================
          BOTTOM BOOKING BAR
          ====================================== */}

      {/* This bar appears only when the user
          selects at least one seat. */}
      {selectedSeats.length > 0 && (

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg px-6 py-4 flex items-center justify-between z-50">

          {/* ======================================
              SELECTED SEAT COUNT
              ====================================== */}

          <div>

            {/* Shows how many seats are selected. */}
            <p className="text-sm font-semibold">

              ★ {selectedSeats.length}{" "}

              {/* Uses Seat for one and Seats for multiple. */}
              {selectedSeats.length === 1
                ? "Seat"
                : "Seats"}{" "}

              Selected

            </p>

          </div>

          {/* ======================================
              PROCEED BUTTON
              ====================================== */}

          {/* Later this button can navigate
              to the booking/payment page. */}
          <button
            type="button"
            className="bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
          >
            Proceed
          </button>

        </div>
      )}

      {/* ======================================
          FOOTER
          ====================================== */}

      {/* Displays the seat status/footer section. */}
      <Footer />

    </div>
  );
};

// Makes SeatLayout available to App.jsx.
export default SeatLayout;