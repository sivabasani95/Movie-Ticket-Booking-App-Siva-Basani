// Imports React and useState for managing application state.
import React, { useState } from "react";

// Imports routing components and useMatch for checking the current route.
import { Route, Routes, useMatch } from "react-router-dom";

// Imports the shared Header displayed on normal application pages.
import Header from "./assets/components/shared/Header";

// Imports the shared Footer displayed on normal application pages.
import Footer from "./assets/components/shared/Footer";

// Imports the Sign In modal used for the multi-step authentication process.
import SignInModel from "./assets/components/shared/SignInModel";

// Imports the Home page component.
import Home from "./pages/Home";

// Imports the Movies page component.
import Movies from "./pages/Movies";

// Imports the Movie Details page component.
import MovieDetails from "./pages/MovieDetails";

// Imports the Profile page component.
import Profile from "./pages/Profile";

// Imports the About page component.
import About from "./assets/components/shared/About";

// Imports the Seat Layout page used for selecting movie seats.
import SeatLayout from "./pages/SeatLayout";

// Imports the Checkout page used during the booking process.
import Checkout from "./pages/Checkout";

// Imports the custom hook that loads the currently logged-in user.
import { useLoadUser } from "./hooks/useLoadUser";


// ==========================================================
// APP COMPONENT
// ==========================================================

// Main App component handles routing, shared layout,
// authentication state, and wishlist state.
function App() {

  // Stores the movies that the user has added to their wishlist.
  const [wishlist, setWishlist] = useState([]);

  // Loads the currently logged-in user from the backend.
  // This calls GET /api/users/me when the application starts.
  const { isLoading } = useLoadUser();

  // Checks whether the current page is the seat layout page.
  const isSeatLayoutPage = useMatch("/shows/:showId/seats");

  // Checks whether the current page is the checkout page.
  const isCheckoutPage = useMatch("/shows/:showId/checkout");

  // Hides the normal shared Header and Footer
  // on SeatLayout and Checkout pages.
  const hideSharedLayout =
    isSeatLayoutPage || isCheckoutPage;


  // ==========================================================
  // WISHLIST FUNCTIONS
  // ==========================================================

  // Adds a movie to the wishlist only if
  // that movie is not already present.
  const addToWishlist = (movie) => {

    setWishlist((prev) =>
      prev.some((item) => item.id === movie.id)
        ? prev
        : [...prev, movie]
    );
  };


  // Removes a movie from the wishlist using the movie's ID.
  const removeFromWishlist = (id) => {

    setWishlist((prev) =>
      prev.filter((movie) => movie.id !== id)
    );
  };


  // ==========================================================
  // INITIAL USER LOADING
  // ==========================================================

  // Wait until the application finishes checking
  // whether there is already a logged-in user.
  //
  // IMPORTANT:
  // This comes AFTER all React hooks above.
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


  // ==========================================================
  // APPLICATION UI
  // ==========================================================

  return (

    <div className="app-container">

      {/* Displays the shared Header except
          on SeatLayout and Checkout pages. */}
      {!hideSharedLayout && <Header />}


      {/* Displays the Sign In modal when
          showModal is true inside AuthContext. */}
      <SignInModel />


      {/* Contains the main page content
          controlled by React Router. */}
      <main className="main-content">

        <Routes>

          {/* ================= HOME ================= */}

          <Route
            path="/"
            element={<Home />}
          />


          {/* ================= MOVIES ================= */}

          <Route
            path="/movies"
            element={
              <Movies
                addToWishlist={addToWishlist}
                wishlist={wishlist}
              />
            }
          />


          {/* ================= MOVIE DETAILS ================= */}

          <Route
            path="/movies/:movieId"
            element={<MovieDetails />}
          />


          {/* ================= PROFILE ================= */}

          <Route
            path="/profile"
            element={
              <Profile
                wishlist={wishlist}
                removeFromWishlist={removeFromWishlist}
              />
            }
          />


          {/* ================= ABOUT ================= */}

          <Route
            path="/about"
            element={<About />}
          />


          {/* ================= SEAT SELECTION ================= */}

          <Route
            path="/shows/:showId/seats"
            element={<SeatLayout />}
          />


          {/* ================= CHECKOUT ================= */}

          <Route
            path="/shows/:showId/checkout"
            element={<Checkout />}
          />

        </Routes>

      </main>


      {/* Displays the shared Footer except
          on SeatLayout and Checkout pages. */}
      {!hideSharedLayout && <Footer />}

    </div>
  );
}


// Exports App so it can be rendered by main.jsx.
export default App;