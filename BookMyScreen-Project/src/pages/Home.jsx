import React from "react";
import BannerSlider from "../assets/components/shared/BannerSlider";
import Recommended from "../assets/components/Recommended";
import LiveEvents from "../assets/components/shared/LiveEvents";

const Home = () => {

    const [showAbout, setShowAbout] = useState(false);
    return (
        <div className="home-page">
            <Header onAboutClick= {() => setShowAbout(!showAbout)} />
                {showAbout && <About />}

            <BannerSlider />
            <Recommended />
            <LiveEvents />

        </div>
    );
}
 export default Home;