import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { LocationProvider } from "./context/LocationContext";


// Render the React application into the root DOM element
createRoot(document.getElementById("root")).render(
  <StrictMode>
     {/* Enables routing across the app */}
    <BrowserRouter>
    {/* Provides location data globally to all components */}
      <LocationProvider>
         {/* Main application component */}
        <App />
      </LocationProvider>
    </BrowserRouter>
  </StrictMode>
);