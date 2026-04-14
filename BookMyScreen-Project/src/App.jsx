


import { Route, Routes } from "react-router-dom";
import Header from "./assets/components/shared/Header";
import Footer from "./assets/components/shared/Footer";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Profile from "./pages/Profile";
import About from "./assets/components/shared/About";
import React, { useState } from "react";




function App() {

  const [wishlist, setWishlist] = useState([]);


const addToWishlist = (movie) => {
  setWishlist((prev) => prev.some((item) => item.id === movie.id) ? prev :
   [...prev, movie]);
};

const removeFromWishlist = (id) => {
  setWishlist((prev) => prev.filter((m) => m.id !== id));
};

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile
           wishlist={wishlist} 
           removeFromWishlist={removeFromWishlist}
           />} />
          <Route path="/movies" element={<Movies addToWishlist={addToWishlist} wishlist={wishlist} />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;