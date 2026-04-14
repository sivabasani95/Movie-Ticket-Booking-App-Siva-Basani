


import { Route, Routes } from "react-router-dom";
import Header from "./assets/components/shared/Header";
import Footer from "./assets/components/shared/Footer";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Profile from "./pages/Profile";
import About from "./assets/components/shared/About";
import React, { useState } from "react";



// Main App component handles routing and shared wishlist state
function App() {
  // State to store wishlist movies
  const [wishlist, setWishlist] = useState([]);

  // Adds a movie to wishlist only if it is not already added
  const addToWishlist = (movie) => {
    setWishlist((prev) => prev.some((item) => item.id === movie.id) ? prev :
      [...prev, movie]);
  };

  // Removes a movie from wishlist by id
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="app-container">
      {/* Common header shown on all pages */}
      <Header />
      {/* Main page content */}
      <main className="main-content">
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Home />} />
          {/* Profile page route with wishlist props */}
          <Route path="/profile" element={<Profile
            wishlist={wishlist}
            removeFromWishlist={removeFromWishlist}
          />} />
          {/* Movies page route with wishlist actions */}
          <Route path="/movies" element={<Movies addToWishlist={addToWishlist} wishlist={wishlist} />} />

          <Route path="/movies/:movieId" element={<MovieDetails />} />
          {/* About page route */}
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      {/* Common footer shown on all pages */}
      <Footer />
    </div>
  );
}

export default App;