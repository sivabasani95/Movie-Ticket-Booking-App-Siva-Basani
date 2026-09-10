import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext();

// Provides the user's city and state to the rest of the React app.
// City is used for display, while state is used for backend show searches.
export const LocationProvider = ({ children }) => {

  // Stores the user's city, such as O'Fallon.
  // This value can be displayed in the Header.
  const [location, setLocation] = useState(null);

  // Stores the user's state, such as Missouri.
  // This value is used when searching shows from Spring Boot.
  const [state, setState] = useState(null);

  // Tracks whether location data is still being loaded.
  const [loading, setLoading] = useState(true);

  // Stores an error message if location cannot be retrieved.
  const [error, setError] = useState(null);

  useEffect(() => {

    // Converts latitude and longitude into city and state information.
    // OpenStreetMap Nominatim provides the address details.
    const fetchLocationData = async (latitude, longitude) => {
      try {

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        const data = await res.json();

        // Gets the city for displaying the user's current location.
        // Falls back to town, village, or state when city is unavailable.
        const userLocation =
          data?.address?.city ||
          data?.address?.town ||
          data?.address?.village ||
          data?.address?.state;

         // Stores the state separately for backend show searches.
        // Example: Missouri is sent to GET /api/shows.
        setLocation(userLocation);
        setState(data?.address?.state || null);

      } catch (error) {

        // Displays a user-friendly error when location lookup fails.
        setError("Failed to fetch location data");

      } finally {

        // Stops the loading state after the request finishes.
        setLoading(false);
      }
    };

    // Gets the user's current latitude and longitude from the browser.
    // The coordinates are then sent to OpenStreetMap for address details.
    navigator.geolocation.getCurrentPosition(
      (position) => {

        const { latitude, longitude } = position.coords;

        fetchLocationData(latitude, longitude);
      },

      () => {

        // Handles cases where location permission is denied or unavailable.
        setError("Unable to retrieve your location");
        setLoading(false);
      }
    );

  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        state,
        loading,
        error,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);