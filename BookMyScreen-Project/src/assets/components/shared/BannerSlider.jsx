import React from "react";
import SliderModule from "react-slick";
import { banners } from "../../../utils/constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BannerSlider.css";

const BannerSlider = () => {
    const Slider = SliderModule.default || SliderModule;

    console.log("SLIDER:", Slider);
    console.log("BANNERS:", banners);

    return (
        <div className="banner-container">
            <div className="banner-wrapper">
                <Slider
                    
                    slidesToShow={1}
                    infinite={true}
                    autoplay={true}
                    autoplaySpeed={3000}
                    speed={800}
                    dots={true}
                    arrows={true}
                >
                    {banners.map((banner, i) => (
                        <div key={i} className="banner-slide">
                            <img
                                src={banner}
                                alt={`banner-${i}`}
                                className="banner-image"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default BannerSlider;
