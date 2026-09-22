// Imports React hooks used by this page.
import React, { useEffect, useState } from "react";

// Imports React Router tools for navigation and URL parameters.
import { useNavigate, useParams } from "react-router-dom";

// Imports dayjs for formatting dates and times.
import dayjs from "dayjs";

// Imports the Seat Layout header.
import Header from "../assets/components/seat-layout/Header";

// Imports the Seat Layout footer.
import Footer from "../assets/components/seat-layout/Footer";

// Imports backend API functions.
import {
  getShowById,
  getShowSeats,
} from "../apis";

// Imports SeatContext so selected seats can be shared with Checkout.
import { useSeatContext } from "../context/SeatContext";


// Displays the seat selection page.
const SeatLayout = () => {

  // Gets the show ID from the URL.
  const { showId } = useParams();

  // Allows navigation to Checkout.
  const navigate = useNavigate();

  // Gets selected seats from SeatContext.
  const {
    selectedSeats,
    setSelectedSeats,
  } = useSeatContext();

  // Stores the selected show.
  const [show, setShow] = useState(null);

  // Stores real seats returned by Spring Boot.
  const [showSeats, setShowSeats] = useState([]);

  // Tracks loading.
  const [loading, setLoading] = useState(true);

  // Stores loading errors.
  const [error, setError] = useState("");


  // Defines the visual sections and prices.
  const seatSections = [
    {
      name: "PREMIUM",
      price: 20,
      rows: ["E"],
    },
    {
      name: "EXECUTIVE",
      price: 15,
      rows: ["D", "C", "B"],
    },
    {
      name: "NORMAL",
      price: 10,
      rows: ["A"],
    },
  ];


  // Loads the show and its real database seats.
  useEffect(() => {

    const fetchSeatPageData = async () => {

      try {

        setLoading(true);
        setError("");

        // Gets show information and seats at the same time.
        const [
          showResponse,
          seatsResponse,
        ] = await Promise.all([
          getShowById(showId),
          getShowSeats(showId),
        ]);

        // Saves the show.
        setShow(showResponse.data);

        // Saves the real ShowSeat records.
        setShowSeats(
          Array.isArray(seatsResponse.data)
            ? seatsResponse.data
            : []
        );

        // Clears seats selected from another show.
        setSelectedSeats([]);

      } catch (err) {

        setError(
          "Unable to load the show seats."
        );

      } finally {

        setLoading(false);
      }
    };


    if (showId) {
      fetchSeatPageData();
    }

  }, [showId, setSelectedSeats]);


  // Creates the visible label for a seat.
  // Example:
  // row A + number 1 = A1
  const getSeatLabel = (seat) => {
    return `${seat.row}${seat.number}`;
  };


  // Returns the price based on the seat row.
  const getSeatPrice = (seat) => {

    const section = seatSections.find(
      (section) =>
        section.rows.includes(seat.row)
    );

    return section?.price || 0;
  };


  // Calculates the total ticket price.
  const totalPrice = selectedSeats.reduce(
    (total, seat) =>
      total + getSeatPrice(seat),
    0
  );


  // Checks whether a seat is currently selected.
  const isSeatSelected = (seat) => {

    return selectedSeats.some(
      (selectedSeat) =>
        selectedSeat.id === seat.id
    );
  };


  // Checks whether a seat is unavailable.
  const isSeatUnavailable = (seat) => {

    return seat.status !== "AVAILABLE";
  };


  // Selects or deselects a real ShowSeat.
  const handleSeatClick = (seat) => {

    // Prevents BOOKED or BLOCKED seats
    // from being selected.
    if (isSeatUnavailable(seat)) {
      return;
    }


    setSelectedSeats((currentSeats) => {

      // Checks whether this seat was already selected.
      const alreadySelected =
        currentSeats.some(
          (selectedSeat) =>
            selectedSeat.id === seat.id
        );


      // Deselects the seat.
      if (alreadySelected) {

        return currentSeats.filter(
          (selectedSeat) =>
            selectedSeat.id !== seat.id
        );
      }


      // Selects the complete seat object.
      return [
        ...currentSeats,
        seat,
      ];
    });
  };


  // Returns styling for each seat.
  const getSeatClass = (seat) => {

    const baseClasses =
      "w-9 h-9 rounded-md text-sm flex items-center justify-center transition-all duration-150";


    // BOOKED or BLOCKED.
    if (isSeatUnavailable(seat)) {

      return `${baseClasses} bg-gray-200 border border-gray-200 text-gray-500 cursor-not-allowed`;
    }


    // Selected.
    if (isSeatSelected(seat)) {

      return `${baseClasses} bg-violet-600 border border-violet-600 text-white cursor-pointer`;
    }


    // Available.
    return `${baseClasses} bg-white border border-gray-500 text-gray-900 cursor-pointer hover:border-violet-600 hover:-translate-y-0.5`;
  };


  // Shows loading message.
  if (loading) {

    return (
      <div className="py-20 text-center text-lg">
        Loading seats...
      </div>
    );
  }


  // Shows backend error.
  if (error) {

    return (
      <div className="py-20 text-center text-lg text-red-500">
        {error}
      </div>
    );
  }


  // Show not found.
  if (!show) {

    return (
      <div className="py-20 text-center text-lg">
        Show not found.
      </div>
    );
  }


  // Gets movie title.
  const movieTitle =
    show.movie?.title ||
    show.movieTitle ||
    "Movie";


  // Gets theater name.
  const theaterName =
    show.theater?.name ||
    show.theaterName ||
    "";


  // Formats date.
  const showDate = show.date
    ? dayjs(show.date).format(
        "DD MMMM YYYY"
      )
    : "";


  // Formats time.
  const showTime = show.startTime
    ? dayjs(
        `2000-01-01T${show.startTime}`
      ).format("hh:mm A")
    : "";


  // Gets movie format.
  const showFormat =
    show.format || "";


  return (

    <div className="min-h-screen bg-white text-gray-900">


      {/* Seat page header */}
      <Header showData={show} />


      {/* Movie/show information */}
      <div className="border-b border-gray-200 px-5 py-3 text-center">

        <h2 className="m-0 text-2xl font-bold">
          {movieTitle}
        </h2>


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


      {/* Seat sections */}
      <main className="mx-auto w-full max-w-6xl overflow-x-auto px-5 py-10">

        {seatSections.map((section) => (

          <section
            key={section.name}
            className="mb-10 min-w-[900px]"
          >

            <h3 className="mb-5 text-center text-lg font-bold">
              {section.name} : ${section.price}
            </h3>


            {section.rows.map((rowLetter) => {

              // Gets real seats belonging to this row.
              const rowSeats = showSeats
                .filter(
                  (seat) =>
                    seat.row === rowLetter
                )
                .sort(
                  (a, b) =>
                    a.number - b.number
                );


              return (

                <div
                  key={rowLetter}
                  className="my-2 flex items-center justify-center"
                >

                  {/* Row letter */}
                  <span className="w-10 text-center font-medium text-gray-500">
                    {rowLetter}
                  </span>


                  {/* Seats */}
                  <div className="flex gap-2">

                    {rowSeats.map((seat) => {

                      const unavailable =
                        isSeatUnavailable(seat);


                      return (

                        <button
                          key={seat.id}
                          type="button"

                          disabled={unavailable}

                          className={
                            getSeatClass(seat)
                          }

                          onClick={() =>
                            handleSeatClick(seat)
                          }
                        >

                          {unavailable
                            ? "X"
                            : seat.number}

                        </button>
                      );
                    })}

                  </div>

                </div>
              );
            })}

          </section>
        ))}


        {/* Cinema screen */}
        <div className="mt-12 text-center">

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

          <p className="mt-3 text-sm tracking-wide text-gray-500">
            SCREEN THIS WAY
          </p>

        </div>

      </main>


      {/* Selected seats and Proceed button */}
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

        <div>

          <p className="text-lg font-bold">

            {selectedSeats.length}{" "}

            {selectedSeats.length === 1
              ? "Seat"
              : "Seats"}{" "}

            Selected

          </p>


          {/* Displays A1, A2, etc. */}
          {selectedSeats.length > 0 && (

            <p className="mt-1 text-sm text-gray-500">

              {selectedSeats
                .map((seat) =>
                  getSeatLabel(seat)
                )
                .join(", ")}

            </p>
          )}

        </div>


        <div className="flex items-center gap-6">

          <p className="text-xl font-bold">
            Total: ${totalPrice}
          </p>


          <button
            type="button"

            disabled={
              selectedSeats.length === 0
            }

            onClick={() => {

              navigate(
                `/shows/${showId}/checkout`,
                {
                  state: {
                    selectedSeats,
                    totalPrice,
                    show,
                  },
                }
              );

            }}

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


      <Footer
        isSelected={false}
        selectedSeats={selectedSeats}
      />

    </div>
  );
};


export default SeatLayout;