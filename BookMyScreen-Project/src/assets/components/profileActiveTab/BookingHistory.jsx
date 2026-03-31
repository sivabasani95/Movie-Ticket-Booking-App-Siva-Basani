

import React from "react";
import "./BookingHistory.css";
import { ordersData } from "../../../utils/constants";
import { MdEventSeat } from "react-icons/md";




const BookingHistory = () => {
    return (
        <>
        <div className="booking-container">
            <h3 className="booking-title">Your Orders</h3>

            {ordersData.map((order) => (
                <div key={order.id} className="booking-card">

                    <div className="booking-top">
                        <img
                            src={order.poster}
                            alt="poster"
                            className="booking-poster"
                        />

                        <div className="divider"></div>

                        <div className="booking-details">

                            <div className="booking-info">
                                <p className="movie-title">{order.title}</p>
                                <p className="movie-format">{order.format}</p>

                                <p className="movie-time">
                                    {order.datetime} - {order.cinema}
                                </p>

                                <small className="movie-qty">
                                    Quantity: {order.quantity}
                                </small>

                                 <p className="movie-seats">
                                    <MdEventSeat className="seat-icon" size={18} />
                                     {order.seats}
                                     </p>
                            </div>

                            <p className="ticket-type">M-Ticket</p>
                        </div>
                    </div>

                    <div className="booking-price">
                        <p className="price-breakdown">
                            Ticket: ${order.ticket.toFixed(2)} + Convenience Fees: ${order.fee.toFixed(2)}
                        </p>
                        <p className="total-price">${order.total.toFixed(2)}</p>
                    </div>

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