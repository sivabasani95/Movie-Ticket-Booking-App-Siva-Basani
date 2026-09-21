// Imports the default styles required by the Slick Carousel library.
import "slick-carousel/slick/slick.css";

// Imports the Slick Carousel theme styles.
import "slick-carousel/slick/slick-theme.css";

// Imports StrictMode to help detect potential problems during development.
import { StrictMode } from "react";

// Imports createRoot to render the React application into the browser DOM.
import { createRoot } from "react-dom/client";

// Imports BrowserRouter to enable page navigation using React Router.
import { BrowserRouter } from "react-router-dom";

// Imports the application's global CSS styles.
import "./index.css";

// Imports the main App component.
import App from "./App.jsx";

// Imports LocationProvider to make location information available throughout the application.
import { LocationProvider } from "./context/LocationContext";

// Imports AuthProvider to make authentication state available throughout the application.
import { AuthProvider } from "./context/AuthContext";

// Renders the React application inside the root element in index.html.
createRoot(document.getElementById("root")).render(
  <StrictMode>

    {/* Enables React Router navigation throughout the application. */}
    <BrowserRouter>

      {/* Provides location information to components throughout the application. */}
      <LocationProvider>

        {/* Provides authentication state such as modal visibility and login steps globally. */}
        <AuthProvider>

          {/* Loads the main BookMyScreen application. */}
          <App />

        </AuthProvider>

      </LocationProvider>

    </BrowserRouter>

  </StrictMode>
);