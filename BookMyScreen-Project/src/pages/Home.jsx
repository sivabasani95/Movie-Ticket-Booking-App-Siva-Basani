import React from "react";
import BannerSlider from "../assets/components/shared/BannerSlider";
import Recommended from "../assets/components/Recommended";
import LiveEvents from "../assets/components/shared/LiveEvents";

const Home = () => {

   
    return (
        
        <div className="home-page">         
            <BannerSlider />
            <Recommended />
            <LiveEvents />
        </div>
    );
}
 export default Home;