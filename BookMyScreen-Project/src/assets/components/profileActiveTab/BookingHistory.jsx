

import React from "react";
import "./BookingHistory.css";
import { ordersData } from "../../../utils/constants";
import { MdEventSeat } from "react-icons/md";


// BookingHistory component to display all user bookings

const BookingHistory = () => {
    return (
        <>
            <div className="booking-container">
                <h3 className="booking-title">Your Orders</h3>

                {/* Loop through all orders */}
                {ordersData.map((order) => (
                    <div key={order.id} className="booking-card">
                        {/* Top section (poster + details) */}
                        <div className="booking-top">
                            {/* Movie poster */}
                            <img
                                src={order.poster}
                                alt="poster"
                                className="booking-poster"
                            />

                            {/* Vertical divider */}
                            <div className="divider"></div>
                            {/* Booking details section */}
                            <div className="booking-details">

                                <div className="booking-info">
                                    {/* Movie title */}
                                    <p className="movie-title">{order.title}</p>
                                    {/* Movie format (2D/3D/etc) */}
                                    <p className="movie-format">{order.format}</p>
                                    {/* Date, time and cinema */}
                                    <p className="movie-time">
                                        {order.datetime} - {order.cinema}
                                    </p>

                                    <small className="movie-qty">
                                        Quantity: {order.quantity}
                                    </small>
                                    {/* Seat details with icon */}
                                    <p className="movie-seats">
                                        <MdEventSeat className="seat-icon" size={18} />
                                        {order.seats}
                                    </p>
                                </div>
                                {/* Ticket type */}
                                <p className="ticket-type">M-Ticket</p>
                            </div>
                        </div>
                        {/* Price section */}
                        <div className="booking-price">
                            <p className="price-breakdown">
                                Ticket: ${order.ticket.toFixed(2)} + Convenience Fees: ${order.fee.toFixed(2)}
                            </p>
                            {/* Total amount */}
                            <p className="total-price">${order.total.toFixed(2)}</p>
                        </div>
                        {/* Additional booking details */}
                        <div className="booking-meta">
                            <div>
                                <p className="meta-title">Booking Date & Time</p>
                                <p>{order.bookingTime}</p>
                            </div>

                            <div>
                                <p className="meta-title">Payment Method</p>
                                <p>{order.paymentMethod}</p>
                            </div>

                            <div>
                                <p className="meta-title">Booking ID</p>
                                <p>{order.id}</p>
                            </div>
                        </div>

                    </div>



                ))}





            </div>




        </>
    );
};

export default BookingHistory;