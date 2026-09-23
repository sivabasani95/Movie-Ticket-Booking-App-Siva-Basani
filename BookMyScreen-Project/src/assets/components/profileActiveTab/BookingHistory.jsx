// Imports React hooks for loading and storing booking data.
import { useEffect, useState } from "react";

// Imports the CSS styles for the booking history page.
import "./BookingHistory.css";

// Imports the seat icon displayed beside the booked seats.
import { MdEventSeat } from "react-icons/md";

// Imports the API function that gets the logged-in user's bookings.
import { getMyBookings } from "../../../apis";


// Displays all bookings belonging to the logged-in user.
const BookingHistory = () => {

    // Stores bookings that should be displayed on the page.
    const [bookings, setBookings] = useState([]);

    // Tracks whether booking data is still loading.
    const [loading, setLoading] = useState(true);

    // Stores an error message if bookings cannot be loaded.
    const [error, setError] = useState("");


    // Loads the logged-in user's bookings when the page opens.
    useEffect(() => {

        // Gets booking history from the backend.
        const loadBookings = async () => {

            try {

                // Starts the loading state.
                setLoading(true);

                // Clears any previous error message.
                setError("");

                // Calls GET /api/bookings/me.
                const response = await getMyBookings();


                // Gets previously hidden booking IDs from localStorage.
                const hiddenBookingIds = JSON.parse(
                    localStorage.getItem("hiddenBookingIds") || "[]"
                );


                // Keeps only bookings that were not hidden by the user.
                const visibleBookings = response.data.filter(
                    (booking) =>
                        !hiddenBookingIds.includes(booking.id)
                );


                // Saves only visible bookings in React state.
                setBookings(visibleBookings);

            } catch (error) {

                // Displays the error in the browser console.
                console.error(
                    "Error loading bookings:",
                    error
                );

                // Shows a simple error message.
                setError(
                    "Unable to load your bookings."
                );

                // Clears booking data if loading fails.
                setBookings([]);

            } finally {

                // Stops the loading state.
                setLoading(false);
            }
        };


        // Loads bookings when this component opens.
        loadBookings();

    }, []);


    // Permanently hides one booking from this browser.
    const handleCloseBooking = (bookingId) => {

        // Gets already hidden booking IDs.
        const hiddenBookingIds = JSON.parse(
            localStorage.getItem("hiddenBookingIds") || "[]"
        );


        // Checks whether this booking was already hidden.
        const alreadyHidden =
            hiddenBookingIds.includes(bookingId);


        // Saves the booking ID only when it is not already saved.
        if (!alreadyHidden) {

            // Adds the selected booking ID.
            const updatedHiddenBookingIds = [
                ...hiddenBookingIds,
                bookingId,
            ];


            // Saves hidden booking IDs in localStorage.
            localStorage.setItem(
                "hiddenBookingIds",
                JSON.stringify(updatedHiddenBookingIds)
            );
        }


        // Immediately removes the selected booking from the page.
        setBookings((currentBookings) =>
            currentBookings.filter(
                (booking) =>
                    booking.id !== bookingId
            )
        );
    };


    // Shows a loading message while bookings are loading.
    if (loading) {

        return (
            <div className="booking-container">

                <h3 className="booking-title">
                    Bookings
                </h3>

                <p>
                    Loading your bookings...
                </p>

            </div>
        );
    }


    // Shows an error message if bookings cannot be loaded.
    if (error) {

        return (
            <div className="booking-container">

                <h3 className="booking-title">
                    Bookings
                </h3>

                <p>
                    {error}
                </p>

            </div>
        );
    }


    // Displays the booking history.
    return (

        <div className="booking-container">

            {/* Displays the page heading. */}
            <h3 className="booking-title">
                Bookings
            </h3>


            {/* Shows a message when there are no visible bookings. */}
            {bookings.length === 0 ? (

                <p>
                    No bookings found.
                </p>

            ) : (

                // Displays every visible booking.
                bookings.map((booking) => {

                    // Gets the movie belonging to this booking.
                    const movie =
                        booking.show?.movie;

                    // Gets the theater belonging to this booking.
                    const theater =
                        booking.show?.theater;


                    // Creates seat names such as A1, A2, and B3.
                    const seatNames =
                        booking.seats
                            ?.map(
                                (seat) =>
                                    `${seat.row}${seat.number}`
                            )
                            .join(", ");


                    // Gets the total number of booked seats.
                    const quantity =
                        booking.seats?.length || 0;


                    // Formats the movie show date.
                    const showDate =
                        booking.show?.date
                            ? new Date(
                                `${booking.show.date}T00:00:00`
                            ).toLocaleDateString()
                            : "";


                    // Gets the movie show time.
                    const showTime =
                        booking.show?.startTime || "";


                    // Formats the booking creation date and time.
                    const bookingDateTime =
                        booking.bookingDateTime
                            ? new Date(
                                booking.bookingDateTime
                            ).toLocaleString()
                            : "";


                    return (

                        // Displays one booking card.
                        <div
                            key={booking.id}
                            className="booking-card"
                        >

                            {/* Hides only this specific booking. */}
                            <button
                                type="button"
                                className="booking-close-button"
                                onClick={() =>
                                    handleCloseBooking(
                                        booking.id
                                    )
                                }
                                aria-label="Remove booking"
                                title="Remove booking"
                            >
                                ×
                            </button>


                            {/* Displays movie poster and information. */}
                            <div className="booking-top">


                                {/* Displays the movie poster when available. */}
                                {movie?.posterUrl && (

                                    <img
                                        src={movie.posterUrl}
                                        alt={movie.title}
                                        className="booking-poster"
                                    />

                                )}


                                {/* Displays booking information. */}
                                <div className="booking-details">


                                    <div className="booking-info">


                                        {/* Displays the movie title. */}
                                        <p className="movie-title">
                                            {movie?.title}
                                        </p>


                                        {/* Displays the movie format. */}
                                        <p className="movie-format">
                                            {booking.show?.format}
                                        </p>


                                        {/* Displays show date, time, and theater. */}
                                        <p className="movie-time">

                                            {showDate}

                                            {" "}

                                            {showTime}

                                            {" - "}

                                            {theater?.name}

                                        </p>


                                        {/* Displays ticket quantity. */}
                                        <small className="movie-qty">

                                            Quantity: {quantity}

                                        </small>


                                        {/* Displays booked seats. */}
                                        <p className="movie-seats">

                                            <MdEventSeat
                                                className="seat-icon"
                                                size={18}
                                            />

                                            {seatNames}

                                        </p>


                                    </div>


                                    {/* Displays the ticket type. */}
                                    <p className="ticket-type">
                                        M-Ticket
                                    </p>


                                </div>


                            </div>


                            {/* Displays ticket price information. */}
                            <div className="booking-price">


                                {/* Displays ticket price and convenience fee. */}
                                <p className="price-breakdown">

                                    Ticket: $

                                    {Number(
                                        booking.ticketAmount || 0
                                    ).toFixed(2)}

                                    {" + "}

                                    Convenience Fees: $

                                    {Number(
                                        booking.convenienceFee || 0
                                    ).toFixed(2)}

                                </p>


                                {/* Displays the total booking amount. */}
                                <p className="total-price">

                                    $

                                    {Number(
                                        booking.totalAmount || 0
                                    ).toFixed(2)}

                                </p>


                            </div>


                            {/* Displays additional booking information. */}
                            <div className="booking-meta">


                                {/* Displays when the booking was created. */}
                                <div>

                                    <p className="meta-title">
                                        Booking Date & Time
                                    </p>

                                    <p>
                                        {bookingDateTime}
                                    </p>

                                </div>


                                {/* Displays the payment method. */}
                                <div>

                                    <p className="meta-title">
                                        Payment Method
                                    </p>

                                    <p>
                                        {booking.paymentMethod}
                                    </p>

                                </div>


                                {/* Displays the booking ID. */}
                                <div>

                                    <p className="meta-title">
                                        Booking ID
                                    </p>

                                    <p>
                                        {booking.id}
                                    </p>

                                </div>


                            </div>


                        </div>

                    );
                })

            )}


        </div>

    );
};


// Exports BookingHistory for use inside Profile.jsx.
export default BookingHistory;