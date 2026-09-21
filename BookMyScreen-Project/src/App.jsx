

// Imports React and useState.
import React, { useState } from "react";

// Imports React Router components.
import { Route, Routes, useMatch } from "react-router-dom";

// Imports the shared Header.
import Header from "./assets/components/shared/Header";

// Imports the shared Footer.
import Footer from "./assets/components/shared/Footer";

// Imports the Sign In modal.
import SignInModel from "./assets/components/shared/SignInModel";

// Imports the Home page.
import Home from "./pages/Home";

// Imports the Movies page.
import Movies from "./pages/Movies";

// Imports the Movie Details page.
import MovieDetails from "./pages/MovieDetails";

// Imports the Profile page.
import Profile from "./pages/Profile";

// Imports the About page.
import About from "./assets/components/shared/About";

// Imports the Seat Layout page.
import SeatLayout from "./pages/SeatLayout";

// Imports the Checkout page.
import Checkout from "./pages/Checkout";

// Imports the hook that loads the logged-in user.
import { useLoadUser } from "./hooks/useLoadUser";

// Imports ProtectedRoute for pages that require login.
import ProtectedRoute from "./components/ProtectedRoute";


// Main App component.
function App() {

  // Stores movies added to the wishlist.
  const [wishlist, setWishlist] = useState([]);

  // Checks whether a user is already logged in.
  const { isLoading } = useLoadUser();

  // Checks whether the current page is the Seat Layout page.
  const isSeatLayoutPage = useMatch("/shows/:showId/seats");

  // Checks whether the current page is the Checkout page.
  const isCheckoutPage = useMatch("/shows/:showId/checkout");

  // Hides the normal Header and Footer on booking pages.
  const hideSharedLayout = isSeatLayoutPage || isCheckoutPage;


  // Adds a movie to the wishlist.
  const addToWishlist = (movie) => {

    // Prevents the same movie from being added twice.
    setWishlist((prev) =>
      prev.some((item) => item.id === movie.id)
        ? prev
        : [...prev, movie]
    );
  };


  // Removes a movie from the wishlist.
  const removeFromWishlist = (id) => {

    // Keeps every movie except the selected movie.
    setWishlist((prev) =>
      prev.filter((movie) => movie.id !== id)
    );
  };


  // Shows loading while checking the logged-in user.
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }


  // Displays the application.
  return (

    <div className="app-container">

      {/* Shows the normal Header outside booking pages. */}
      {!hideSharedLayout && <Header />}


      {/* Displays the Sign In modal when needed. */}
      <SignInModel />


      {/* Contains all application routes. */}
      <main className="main-content">

        <Routes>


          {/* Home page does not require login. */}
          <Route
            path="/"
            element={<Home />}
          />


          {/* Movies page does not require login. */}
          <Route
            path="/movies"
            element={
              <Movies
                addToWishlist={addToWishlist}
                wishlist={wishlist}
              />
            }
          />


          {/* Movie Details page does not require login. */}
          <Route
            path="/movies/:movieId"
            element={<MovieDetails />}
          />


          {/* Profile page requires login. */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile
                  wishlist={wishlist}
                  removeFromWishlist={removeFromWishlist}
                />
              </ProtectedRoute>
            }
          />


          {/* About page does not require login. */}
          <Route
            path="/about"
            element={<About />}
          />


          {/* Seat Layout page requires login. */}
          <Route
            path="/shows/:showId/seats"
            element={
              <ProtectedRoute>
                <SeatLayout />
              </ProtectedRoute>
            }
          />


          {/* Checkout page requires login. */}
          <Route
            path="/shows/:showId/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />


        </Routes>

      </main>


      {/* Shows the normal Footer outside booking pages. */}
      {!hideSharedLayout && <Footer />}

    </div>
  );
}


// Exports App for use in main.jsx.
export default App;