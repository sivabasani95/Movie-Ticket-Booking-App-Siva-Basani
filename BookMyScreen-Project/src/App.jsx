import React, { useState } from "react";
import { Route, Routes, useMatch } from "react-router-dom";

import Header from "./assets/components/shared/Header";
import Footer from "./assets/components/shared/Footer";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Profile from "./pages/Profile";
import About from "./assets/components/shared/About";
import SeatLayout from "./pages/SeatLayout";
import Checkout from "./pages/Checkout";

// Main App component handles routing and shared wishlist state.
function App() {
  const [wishlist, setWishlist] = useState([]);

  // Checks whether the current page is the seat layout page.
  const isSeatLayoutPage = useMatch("/shows/:showId/seats");

  // Checks whether the current page is the checkout page.
  const isCheckoutPage = useMatch("/shows/:showId/checkout");

  // Hide the normal shared Header/Footer on SeatLayout and Checkout pages.
  const hideSharedLayout = isSeatLayoutPage || isCheckoutPage;

  // Adds a movie to the wishlist if it is not already added.
  const addToWishlist = (movie) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === movie.id)
        ? prev
        : [...prev, movie]
    );
  };

  // Removes a movie from the wishlist using its ID.
  const removeFromWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter((movie) => movie.id !== id)
    );
  };

  return (
    <div className="app-container">

      {/* Normal shared header */}
      {!hideSharedLayout && <Header />}

      <main className="main-content">
        <Routes>

          {/* Home page */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Movies page */}
          <Route
            path="/movies"
            element={
              <Movies
                addToWishlist={addToWishlist}
                wishlist={wishlist}
              />
            }
          />

          {/* Movie details page */}
          <Route
            path="/movies/:movieId"
            element={<MovieDetails />}
          />

          {/* Profile page */}
          <Route
            path="/profile"
            element={
              <Profile
                wishlist={wishlist}
                removeFromWishlist={removeFromWishlist}
              />
            }
          />

          {/* About page */}
          <Route
            path="/about"
            element={<About />}
          />

          {/* Seat layout page */}
          <Route
            path="/shows/:showId/seats"
            element={<SeatLayout />}
          />

          {/* Checkout page */}
          <Route
            path="/shows/:showId/checkout"
            element={<Checkout />}
          />

        </Routes>
      </main>

      {/* Normal shared footer */}
      {!hideSharedLayout && <Footer />}

    </div>
  );
}

export default App;