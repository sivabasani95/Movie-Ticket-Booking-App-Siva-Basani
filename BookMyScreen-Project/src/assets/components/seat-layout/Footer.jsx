import React from "react";

// Footer changes depending on whether seats are selected.
const Footer = ({ isSelected, selectedSeats }) => {

  // =========================================
  // SELECTED SEATS FOOTER
  // =========================================
  // When one or more seats are selected,
  // show the selected seat count and Proceed button.
  if (isSelected) {
    return (
      <footer className="w-full mt-auto py-4 border-t border-gray-200">

        <div className="flex items-center justify-between px-6">

          {/* Number of selected seats */}
          <p className="text-sm font-semibold m-0">
            ★ {selectedSeats.length}{" "}
            {selectedSeats.length === 1
              ? "Seat Selected"
              : "Seats Selected"}
          </p>

          {/* Proceed button */}
          <button
            type="button"
            className="bg-black text-white px-7 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
          >
            Proceed
          </button>

        </div>

      </footer>
    );
  }

  // =========================================
  // NORMAL FOOTER
  // =========================================
  // When no seats are selected,
  // show SCREEN THIS WAY and the seat legend.
  return (
    <footer className="w-full mt-auto py-4 border-t border-gray-200">

      {/* Footer content */}
      <div className="flex flex-col items-center justify-center">

        {/* Shows the direction of the movie screen */}
        <p className="text-xs font-bold text-purple-600 tracking-wider">
          SCREEN THIS WAY
        </p>

        {/* Seat status legend */}
        <div className="flex items-center gap-4 mt-2 text-xs">

          {/* Available seat */}
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border border-gray-500 rounded"></div>
            <span>Available</span>
          </div>

          {/* Occupied seat */}
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-300 border border-gray-400 rounded flex items-center justify-center">
              <span className="text-[8px]">×</span>
            </div>
            <span>Occupied</span>
          </div>

          {/* Selected seat */}
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-purple-600 rounded"></div>
            <span>Selected</span>
          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;