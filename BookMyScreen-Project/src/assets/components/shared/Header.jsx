import { FaSearch } from "react-icons/fa";
import mainLogo from "../../images/main-icon.png";

const Header = () => {
  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-3">
        {/* top Nav bar have 3 part (logo) (search Bar) Profile*/}
        {/* Left: Logo + search bar*/}
        <div className="flex items-center">
          <img
            src={mainLogo}
            alt="BookMyScreen Logo"
            className="h-12 cursor-pointer"
          />


          {/* Center: Search Bar */}
          <div className="relative w-full max-w-12xl">
            <input
              type="search"
              placeholder="Search for Movies, Events, Plays, Sports and Activities..."
              className="w-full border border-gray-300 rounded-md h-8 px-4 pr-10 text-base
             focus:outline-none focus:ring-2 focus:ring-red-500"

            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-6">
          <div className="cursor-pointer text-sm font-medium">
            St Louis &nbsp; ▼
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition">
            Sign in
          </button>
        </div>
      </div>
       {/*Bottom Navbar Left side  */}
      <div className="bg-[#f2f2f2] px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto flex justify-between 
            items-center py-2 text-gray-700">
            
          <div className="flex items-center space-x-9 font-medium">
              <span className="cursor-pointer hover:text-red-500">Movies</span>
              <span className="cursor-pointer hover:text-red-500">stream</span>
              <span className="cursor-pointer hover:text-red-500">Events</span>
              <span className="cursor-pointer hover:text-red-500">plays</span>
              <span className="cursor-pointer hover:text-red-500">Sports</span>
              <span className="cursor-pointer hover:text-red-500">Activities</span>
          </div>
               {/*Bottom Navbar Right side  */}
               <div className="flex items-center space-x-6 text-sx">
                <span className="cursor-pointer hover:underline">ListYourShow</span>
                 <span className="cursor-pointer hover:underline">Corporates</span>
                  <span className="cursor-pointer hover:underline">Offers</span>
                   <span className="cursor-pointer hover:underline">Gift Cards</span>
          </div> 
                         
        </div>
     </div>
  </header>
  );
};
export default Header;