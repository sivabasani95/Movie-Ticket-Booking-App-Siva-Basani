// Imports the React functions needed to create and use context.
import { createContext, useContext, useState } from "react";

// Creates the context that will store selected seats.
const SeatContext = createContext();

// Provides selected seat information to the application.
export const SeatContextProvider = ({ children }) => {

  // Stores the seats selected by the user.
  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <SeatContext.Provider
      value={{
        selectedSeats,
        setSelectedSeats,
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};

// Custom hook used by components to access selected seats.
export const useSeatContext = () => {
  return useContext(SeatContext);
};