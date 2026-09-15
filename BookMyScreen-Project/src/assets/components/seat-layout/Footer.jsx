import React from "react";

// Displays the screen direction and seat status information.
const Footer = () => {
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