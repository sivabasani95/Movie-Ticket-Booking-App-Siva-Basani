import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Header from "../assets/components/seat-layout/Header";

const Checkout = () => {
  const { showId } = useParams();
  const location = useLocation();

  // Controls whether the Terms and Conditions popup is open or closed.
  const [showTerms, setShowTerms] = useState(false);

  // Controls whether the Available Offers popup is open or closed.
  const [showOffers, setShowOffers] = useState(false);

  // Gets the booking information passed from SeatLayout.jsx.
  const selectedSeats = location.state?.selectedSeats || [];
  const totalPrice = Number(location.state?.totalPrice) || 0;
  const show = location.state?.show || null;

  // Gets the movie title from the show information.
  const movieTitle =
    show?.movie?.title ||
    show?.movieTitle ||
    "Movie";

  // Gets the movie poster URL from the show information.
  const posterUrl =
    show?.movie?.posterUrl ||
    show?.posterUrl ||
    "";

  // Gets the theater name from the show information.
  const theaterName =
    show?.theater?.name ||
    show?.theaterName ||
    "";

  // Gets the date, time, and format for the selected show.
  const showDate = show?.date || "";
  const showTime = show?.startTime || "";
  const showFormat = show?.format || "";

  // Calculates a 5% tax and fee amount based on the ticket total.
  const fees = totalPrice * 0.05;

  // Calculates the final amount the user needs to pay.
  const finalTotal = totalPrice + fees;

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Displays the checkout-specific header. */}
      <Header type="checkout" showData={show} />

      {/* Contains the main checkout page content. */}
      <main className="mx-auto w-full max-w-5xl px-6 py-8">

        {/* Creates the left booking column and right payment column. */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">

          {/* LEFT SIDE */}
          <section>

            {/* Displays the selected movie information. */}
            <div className="mb-6 flex items-start gap-4">

              {/* Displays the movie poster when available. */}
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

              {/* Displays the movie details. */}
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

            {/* Displays the selected show and ticket details. */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

              {/* Displays the selected show date and time. */}
              <div className="border-b border-gray-200 pb-5">
                <p className="font-semibold">
                  {showDate || "Show Date"}
                  {showTime && ` • ${showTime}`}
                </p>
              </div>

              {/* Displays selected seats and ticket price. */}
              <div className="flex items-start justify-between pt-5">

                <div>

                  {/* Displays the number of selected tickets. */}
                  <p className="font-bold">
                    {selectedSeats.length}{" "}
                    {selectedSeats.length === 1
                      ? "ticket"
                      : "tickets"}
                  </p>

                  {/* Displays all selected seat numbers. */}
                  <p className="mt-2 text-sm text-gray-500">
                    {selectedSeats.length > 0
                      ? selectedSeats.join(", ")
                      : "No seats selected"}
                  </p>

                </div>

                {/* Displays the ticket price before taxes. */}
                <p className="font-bold">
                  ${totalPrice.toFixed(2)}
                </p>

              </div>

            </div>

            {/* Displays cancellation information. */}
            <div className="mt-5 flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-5 py-4">

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
                !
              </span>

              <p className="text-sm font-medium text-amber-800">
                No cancellation or refund available after payment.
              </p>

            </div>

            {/* Displays the available offers section. */}
            <div className="mt-5 flex items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-4">

              <div className="flex items-center gap-3">

                {/* Displays the offer percentage icon. */}
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                  %
                </span>

                <p className="text-sm font-semibold">
                  Available Offers
                </p>

              </div>

              {/* Opens the Available Offers popup. */}
              <button
                type="button"
                onClick={() => setShowOffers(true)}
                className="cursor-pointer text-sm font-semibold text-blue-600 hover:underline"
              >
                View all offers
              </button>

            </div>

          </section>

          {/* RIGHT SIDE */}
          <aside>

            {/* Displays the payment summary heading. */}
            <h2 className="mb-4 text-lg font-bold">
              Payment Summary
            </h2>

            {/* Displays the payment calculations. */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

              {/* Displays the order amount. */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Order amount
                </span>

                <span className="font-medium">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Displays the 5% taxes and fees. */}
              <div className="mt-4 flex justify-between text-sm">
                <span className="font-medium">
                  Taxes & fees (5%)
                </span>

                <span className="font-medium">
                  ${fees.toFixed(2)}
                </span>
              </div>

              {/* Separates the final total from the other amounts. */}
              <div className="my-5 border-t border-gray-200" />

              {/* Displays the final amount. */}
              <div className="flex justify-between text-base font-bold">
                <span>
                  To be paid
                </span>

                <span>
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

            </div>

            {/* Displays the user details heading. */}
            <h2 className="mb-4 mt-7 text-lg font-bold">
              Your details
            </h2>

            {/* Displays guest user information. */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex items-start gap-4">

                {/* Displays a simple user icon. */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-400">
                  ♙
                </div>

                <div>
                  <p className="font-semibold">
                    Guest User
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Sign in to save your booking details.
                  </p>
                </div>

              </div>

            </div>

            {/* Opens the Terms and Conditions popup. */}
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

            {/* Displays the final total and payment button. */}
            <button
              type="button"
              className="mt-5 flex w-full items-center justify-between rounded-full bg-black px-6 py-4 text-white transition hover:bg-gray-800"
            >

              <span className="text-sm font-bold">
                ${finalTotal.toFixed(2)}{" "}
                <span className="text-xs font-medium">
                  TOTAL
                </span>
              </span>

              <span className="text-sm font-semibold">
                Proceed To Pay
              </span>

            </button>

          </aside>

        </div>

      </main>

      {/* ================= AVAILABLE OFFERS POPUP ================= */}

      {/* Displays the Available Offers popup when showOffers is true. */}
      {showOffers && (

        /* Creates a dark transparent background behind the popup. */
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          {/* Contains all available offers. */}
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

            {/* Displays the popup heading and close button. */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">

              <div>
                <h2 className="text-xl font-bold">
                  Available Offers
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Choose an offer for your booking.
                </p>
              </div>

              {/* Closes the Available Offers popup. */}
              <button
                type="button"
                onClick={() => setShowOffers(false)}
                className="cursor-pointer text-2xl text-gray-500 transition hover:text-black"
                aria-label="Close available offers"
              >
                ×
              </button>

            </div>

            {/* Contains all available offer cards. */}
            <div className="mt-5 space-y-4">

              {/* First offer */}
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

              {/* Second offer */}
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

              {/* Third offer */}
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

            {/* Closes the Available Offers popup. */}
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

      {/* ================= TERMS AND CONDITIONS POPUP ================= */}

      {/* Displays the Terms and Conditions popup when showTerms is true. */}
      {showTerms && (

        /* Creates the dark transparent background behind the popup. */
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          {/* Contains all Terms and Conditions information. */}
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

            {/* Displays the popup heading and close icon. */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">

              <h2 className="text-xl font-bold">
                Terms and Conditions
              </h2>

              {/* Closes the Terms and Conditions popup. */}
              <button
                type="button"
                onClick={() => setShowTerms(false)}
                className="cursor-pointer text-2xl text-gray-500 transition hover:text-black"
                aria-label="Close terms and conditions"
              >
                ×
              </button>

            </div>

            {/* Contains the booking rules shown to the user. */}
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

            {/* Closes the Terms and Conditions popup. */}
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

export default Checkout;