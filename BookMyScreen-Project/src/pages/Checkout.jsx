

// Imports React and useState for managing component state.
import React, { useState } from "react";

// Imports React Router hooks.
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

// Imports the checkout and seat-layout header.
import Header from "../assets/components/seat-layout/Header";

// Imports AuthContext to access the logged-in user.
import { useAuth } from "../context/AuthContext";

// Imports booking API.
import { createBooking } from "../apis";
import dayjs from "dayjs";

// ==========================================================
// CHECKOUT COMPONENT
// ==========================================================

const Checkout = () => {

  // Gets the show ID from the URL.
  const { showId } = useParams();

  // Used to navigate after successful booking.
  const navigate = useNavigate();

  // Gets booking information passed from SeatLayout.jsx.
  const location = useLocation();

  // Gets the currently logged-in user.
  const { user } = useAuth();

  // Controls popup visibility.
  const [showTerms, setShowTerms] = useState(false);
  const [showOffers, setShowOffers] = useState(false);

  // Controls booking/payment state.
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");


  // ==========================================================
  // BOOKING INFORMATION
  // ==========================================================

  // Gets selected seat objects passed from SeatLayout.jsx.
  const selectedSeats = location.state?.selectedSeats || [];

  // Gets total ticket price before fees.
  const totalPrice = Number(location.state?.totalPrice) || 0;

  // Gets selected show.
  const show = location.state?.show || null;


  // ==========================================================
  // MOVIE INFORMATION
  // ==========================================================

  const movieTitle =
    show?.movie?.title ||
    show?.movieTitle ||
    "Movie";

  const posterUrl =
    show?.movie?.posterUrl ||
    show?.posterUrl ||
    "";

  const theaterName =
    show?.theater?.name ||
    show?.theaterName ||
    "";

  const showDate = show?.date || "";
  const showTime = show?.startTime || "";
  const showFormat = show?.format || "";


  // ==========================================================
  // PAYMENT CALCULATION
  // ==========================================================

  // Calculates 5% taxes and fees.
  const fees = totalPrice * 0.05;

  // Calculates final amount.
  const finalTotal = totalPrice + fees;


  // ==========================================================
  // PROCEED TO PAY
  // ==========================================================

  const handleProceedToPay = async () => {

    // Clear old error.
    setPaymentError("");

    // User must be signed in.
    if (!user) {
      setPaymentError(
        "Please sign in before booking."
      );
      return;
    }

    // User must select at least one seat.
    if (selectedSeats.length === 0) {
      setPaymentError(
        "Please select at least one seat."
      );
      return;
    }

    try {

      setIsProcessing(true);

      // Get real MySQL seat IDs.
      const seatIds = selectedSeats.map(
        (seat) => seat.id
      );

      // Make sure every seat has a database ID.
      if (seatIds.some((id) => !id)) {
        throw new Error(
          "One or more selected seats do not have a valid seat ID."
        );
      }

      // Data expected by BookingRequest.java.
      const bookingData = {
        showId: Number(showId),
        seatIds: seatIds,
        paymentMethod: "TEST",
        paymentId: `PAY-${Date.now()}`,
      };

      // Creates booking in Spring Boot.
      await createBooking(bookingData);

      // After successful booking, open Bookings.
      navigate("/profile", {
        state: {
          activeTab: "bookings",
        },
      });

    } catch (error) {

      // Display backend error if available.
      const backendError = error.response?.data;

      if (typeof backendError === "string") {
        setPaymentError(backendError);
      } else if (backendError?.message) {
        setPaymentError(backendError.message);
      } else {
        setPaymentError(
          error.message ||
          "Booking failed. Please try again."
        );
      }

    } finally {

      setIsProcessing(false);
    }
  };


  // ==========================================================
  // CHECKOUT PAGE
  // ==========================================================

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Checkout header */}
      <Header
        type="checkout"
        showData={show}
      />

      <main className="mx-auto w-full max-w-5xl px-6 py-8">

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">


          {/* ==================================================
              LEFT SIDE
              ================================================== */}

          <section>

            {/* Movie information */}
            <div className="mb-6 flex items-start gap-4">

              {posterUrl ? (

                <img
                  src={posterUrl}
                  alt={movieTitle}
                  className="h-28 w-20 shrink-0 rounded-md object-cover shadow-sm"
                />

              ) : (

                <div className="flex h-28 w-20 shrink-0 items-center justify-center rounded-md bg-gray-200 text-center text-xs text-gray-500">
                  No Poster
                </div>

              )}

              <div>

                <h2 className="text-xl font-bold">
                  {movieTitle}
                </h2>

                {showFormat && (
                  <p className="mt-1 text-sm text-gray-500">
                    {showFormat}
                  </p>
                )}

                {theaterName && (
                  <p className="mt-1 text-sm text-gray-500">
                    {theaterName}
                  </p>
                )}

              </div>

            </div>


            {/* ==================================================
                SHOW AND TICKET DETAILS
                ================================================== */}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="border-b border-gray-200 pb-5">

                 <p className="font-semibold">

                  {showDate
                    ? dayjs(showDate).format("D MMMM YYYY")
                    : "Show Date"}

                  {showTime &&
                    ` • ${dayjs(
                      `${showDate}T${showTime}`
                    ).format("hh:mm A")}`}

                </p>

                

              </div>


              <div className="flex items-start justify-between pt-5">

                <div>

                  <p className="font-bold">

                    {selectedSeats.length}{" "}

                    {selectedSeats.length === 1
                      ? "ticket"
                      : "tickets"}

                  </p>


                  {/* FIXED: Display row + seat number */}
                  <p className="mt-2 text-sm text-gray-500">

                    {selectedSeats.length > 0
                      ? selectedSeats
                          .map(
                            (seat) =>
                              `${seat.row}${seat.number}`
                          )
                          .join(", ")
                      : "No seats selected"}

                  </p>

                </div>


                <p className="font-bold">
                  ${totalPrice.toFixed(2)}
                </p>

              </div>

            </div>


            {/* ==================================================
                CANCELLATION INFORMATION
                ================================================== */}

            <div className="mt-5 flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-5 py-4">

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
                !
              </span>

              <p className="text-sm font-medium text-amber-800">
                No cancellation or refund available after payment.
              </p>

            </div>


            {/* ==================================================
                AVAILABLE OFFERS
                ================================================== */}

            <div className="mt-5 flex items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-4">

              <div className="flex items-center gap-3">

                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                  %
                </span>

                <p className="text-sm font-semibold">
                  Available Offers
                </p>

              </div>


              <button
                type="button"
                onClick={() => setShowOffers(true)}
                className="cursor-pointer text-sm font-semibold text-blue-600 hover:underline"
              >
                View all offers
              </button>

            </div>

          </section>


          {/* ==================================================
              RIGHT SIDE
              ================================================== */}

          <aside>


            {/* ==================================================
                PAYMENT SUMMARY
                ================================================== */}

            <h2 className="mb-4 text-lg font-bold">
              Payment Summary
            </h2>


            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex justify-between text-sm">

                <span className="text-gray-500">
                  Order amount
                </span>

                <span className="font-medium">
                  ${totalPrice.toFixed(2)}
                </span>

              </div>


              <div className="mt-4 flex justify-between text-sm">

                <span className="font-medium">
                  Taxes & fees (5%)
                </span>

                <span className="font-medium">
                  ${fees.toFixed(2)}
                </span>

              </div>


              <div className="my-5 border-t border-gray-200" />


              <div className="flex justify-between text-base font-bold">

                <span>
                  To be paid
                </span>

                <span>
                  ${finalTotal.toFixed(2)}
                </span>

              </div>

            </div>


            {/* ==================================================
                USER DETAILS
                ================================================== */}

            <h2 className="mb-4 mt-7 text-lg font-bold">
              Your details
            </h2>


            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex items-start gap-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-400">
                  ♙
                </div>


                <div>

                  <p className="font-semibold">

                    {user?.name
                      ? user.name
                      : "Guest User"}

                  </p>


                  <p className="mt-1 text-sm text-gray-500">

                    {user?.email
                      ? user.email
                      : "Sign in to save your booking details."}

                  </p>

                </div>

              </div>

            </div>


            {/* ==================================================
                TERMS AND CONDITIONS
                ================================================== */}

            <button
              type="button"
              onClick={() => setShowTerms(true)}
              className="mt-5 flex w-full cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:bg-gray-50"
            >

              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-500 text-xs">
                ?
              </span>

              <span className="text-sm font-semibold">
                Terms and conditions
              </span>

            </button>


            {/* ==================================================
                PROCEED TO PAY
                ================================================== */}

            <button
              type="button"
              onClick={handleProceedToPay}
              disabled={
                isProcessing ||
                selectedSeats.length === 0
              }
              className="mt-5 flex w-full items-center justify-between rounded-full bg-black px-6 py-4 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >

              <span className="text-sm font-bold">

                ${finalTotal.toFixed(2)}{" "}

                <span className="text-xs font-medium">
                  TOTAL
                </span>

              </span>


              <span className="text-sm font-semibold">

                {isProcessing
                  ? "Processing..."
                  : "Proceed To Pay"}

              </span>

            </button>


            {/* Displays booking/payment errors */}
            {paymentError && (

              <p className="mt-3 text-sm font-medium text-red-600">
                {paymentError}
              </p>

            )}

          </aside>

        </div>

      </main>


      {/* ========================================================
          AVAILABLE OFFERS POPUP
          ======================================================== */}

      {showOffers && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">


            <div className="flex items-center justify-between border-b border-gray-200 pb-4">

              <div>

                <h2 className="text-xl font-bold">
                  Available Offers
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Choose an offer for your booking.
                </p>

              </div>


              <button
                type="button"
                onClick={() => setShowOffers(false)}
                className="cursor-pointer text-2xl text-gray-500 transition hover:text-black"
                aria-label="Close available offers"
              >
                ×
              </button>

            </div>


            <div className="mt-5 space-y-4">


              {/* OFFER 1 */}

              <div className="rounded-lg border border-gray-200 p-4">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h3 className="font-bold">
                      SAVE10
                    </h3>

                    <p className="mt-1 text-sm text-gray-600">
                      Get 10% off on your movie ticket booking.
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      Maximum discount $10.
                    </p>

                  </div>


                  <button
                    type="button"
                    className="rounded-md border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                  >
                    Apply
                  </button>

                </div>

              </div>


              {/* OFFER 2 */}

              <div className="rounded-lg border border-gray-200 p-4">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h3 className="font-bold">
                      MOVIE5
                    </h3>

                    <p className="mt-1 text-sm text-gray-600">
                      Get $5 off when your ticket total is $30 or more.
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      Valid once per booking.
                    </p>

                  </div>


                  <button
                    type="button"
                    className="rounded-md border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                  >
                    Apply
                  </button>

                </div>

              </div>


              {/* OFFER 3 */}

              <div className="rounded-lg border border-gray-200 p-4">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h3 className="font-bold">
                      WEEKEND15
                    </h3>

                    <p className="mt-1 text-sm text-gray-600">
                      Get 15% off on eligible weekend movie bookings.
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      Maximum discount $15.
                    </p>

                  </div>


                  <button
                    type="button"
                    className="rounded-md border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                  >
                    Apply
                  </button>

                </div>

              </div>

            </div>


            <button
              type="button"
              onClick={() => setShowOffers(false)}
              className="mt-6 w-full cursor-pointer rounded-lg bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              Close
            </button>

          </div>

        </div>

      )}


      {/* ========================================================
          TERMS AND CONDITIONS POPUP
          ======================================================== */}

      {showTerms && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">


            <div className="flex items-center justify-between border-b border-gray-200 pb-4">

              <h2 className="text-xl font-bold">
                Terms and Conditions
              </h2>


              <button
                type="button"
                onClick={() => setShowTerms(false)}
                className="cursor-pointer text-2xl text-gray-500 transition hover:text-black"
                aria-label="Close terms and conditions"
              >
                ×
              </button>

            </div>


            <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">

              <p>
                <strong className="text-gray-900">
                  1. Ticket Confirmation:
                </strong>{" "}
                Your booking is confirmed only after successful payment.
              </p>


              <p>
                <strong className="text-gray-900">
                  2. Cancellation and Refund:
                </strong>{" "}
                Tickets cannot be cancelled or refunded after payment.
              </p>


              <p>
                <strong className="text-gray-900">
                  3. Seat Selection:
                </strong>{" "}
                Selected seats are subject to availability until the booking
                is completed.
              </p>


              <p>
                <strong className="text-gray-900">
                  4. Show Time:
                </strong>{" "}
                Please arrive at the theater before the scheduled show time.
              </p>


              <p>
                <strong className="text-gray-900">
                  5. Booking Information:
                </strong>{" "}
                Please verify the movie, theater, date, time, and selected
                seats before making payment.
              </p>

            </div>


            <button
              type="button"
              onClick={() => setShowTerms(false)}
              className="mt-6 w-full cursor-pointer rounded-lg bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
};


// Exports Checkout so it can be used by App.jsx.
export default Checkout;