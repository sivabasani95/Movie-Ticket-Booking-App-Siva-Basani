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

// Main App component handles routing and shared wishlist state.
function App() {
  const [wishlist, setWishlist] = useState([]);

  // Checks whether the current page is the seat layout page.
  const isSeatLayoutPage = useMatch("/shows/:showId/seats");

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

      {/* Hides the header on the seat layout page. */}
      {!isSeatLayoutPage && <Header />}

      <main className="main-content">
        <Routes>

          {/* Displays the home page. */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Displays the movies page. */}
          <Route
            path="/movies"
            element={
              <Movies
                addToWishlist={addToWishlist}
                wishlist={wishlist}
              />
            }
          />

          {/* Displays details for the selected movie. */}
          <Route
            path="/movies/:movieId"
            element={<MovieDetails />}
          />

          {/* Displays the user's profile and wishlist. */}
          <Route
            path="/profile"
            element={
              <Profile
                wishlist={wishlist}
                removeFromWishlist={removeFromWishlist}
              />
            }
          />

          {/* Displays the About page. */}
          <Route
            path="/about"
            element={<About />}
          />

          {/* Displays the seat layout for the selected show. */}
          <Route
            path="/shows/:showId/seats"
            element={<SeatLayout />}
          />

        </Routes>
      </main>

      {/* Hides the footer on the seat layout page. */}
      {!isSeatLayoutPage && <Footer />}

    </div>
  );
}

export default App;