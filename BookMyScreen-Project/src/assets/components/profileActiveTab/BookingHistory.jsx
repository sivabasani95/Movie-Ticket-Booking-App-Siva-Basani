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

    // Stores bookings returned by the Spring Boot backend.
    const [bookings, setBookings] = useState([]);

    // Tracks whether booking data is still loading.
    const [loading, setLoading] = useState(true);

    // Stores an error message if bookings cannot be loaded.
    const [error, setError] = useState("");


    // Loads the logged-in user's bookings when the component opens.
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

                // Saves the returned bookings.
                setBookings(response.data);

            } catch (error) {

                // Displays the error in the browser console.
                console.error("Error loading bookings:", error);

                // Shows a simple error message to the user.
                setError("Unable to load your bookings.");

                // Clears old booking data if the request fails.
                setBookings([]);

            } finally {

                // Stops the loading state.
                setLoading(false);
            }
        };

        // Runs the booking API request.
        loadBookings();

    }, []);


    // Shows a loading message while bookings are being fetched.
    if (loading) {
        return (
            <div className="booking-container">
                <h3 className="booking-title">
                    Bookings
                </h3>

                <p>Loading your bookings...</p>
            </div>
        );
    }


    // Shows an error message if the booking request fails.
    if (error) {
        return (
            <div className="booking-container">
                <h3 className="booking-title">
                    Bookings
                </h3>

                <p>{error}</p>
            </div>
        );
    }


    // Displays the logged-in user's booking history.
    return (
        <div className="booking-container">

            {/* Displays the booking history heading. */}
            <h3 className="booking-title">
                Bookings
            </h3>


            {/* Displays a message when the user has no bookings. */}
            {bookings.length === 0 ? (

                <p>No bookings found.</p>

            ) : (

                // Loops through every booking returned by the backend.
                bookings.map((booking) => {

                    // Gets the movie from the booking's show.
                    const movie = booking.show?.movie;

                    // Gets the theater from the booking's show.
                    const theater = booking.show?.theater;

                    // Creates a readable list of booked seats.
                    const seatNames = booking.seats
                        ?.map(
                            (seat) =>
                                `${seat.row}${seat.number}`
                        )
                        .join(", ");

                    // Gets the number of booked seats.
                    const quantity =
                        booking.seats?.length || 0;

                    // Formats the movie show date.
                    const showDate = booking.show?.date
                        ? new Date(
                            `${booking.show.date}T00:00:00`
                        ).toLocaleDateString()
                        : "";

                    // Formats the show start time.
                    const showTime =
                        booking.show?.startTime || "";

                    // Formats the date and time when the booking was created.
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

                            {/* Displays the movie poster and booking details. */}
                            <div className="booking-top">

                                {/* Displays the movie poster when available. */}
                                {movie?.posterUrl && (
                                    <img
                                        src={movie.posterUrl}
                                        alt={movie.title}
                                        className="booking-poster"
                                    />
                                )}


                                {/* Displays movie and show information. */}
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


                                        {/* Displays how many seats were booked. */}
                                        <small className="movie-qty">
                                            Quantity: {quantity}
                                        </small>


                                        {/* Displays the booked seat numbers. */}
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


                                {/* Displays the final booking amount. */}
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


                                {/* Displays the booking database ID. */}
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