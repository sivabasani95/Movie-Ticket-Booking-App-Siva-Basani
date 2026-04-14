import React from "react";
import BannerSlider from "../assets/components/shared/BannerSlider";
import Recommended from "../assets/components/Recommended";
import LiveEvents from "../assets/components/shared/LiveEvents";


// Home component represents the landing page of the application
// It displays the main sections like banner, recommended movies, and live events
const Home = () => {

   
    return (
        
        <div className="home-page">   
        {/* Banner section - shows promotional movie/event banners */}      
            <BannerSlider />
             {/* Recommended section - displays popular/recommended movies */}
            <Recommended />
             {/* Live Events section - shows events happening currently */}
            <LiveEvents />
        </div>
    );
}
 export default Home;