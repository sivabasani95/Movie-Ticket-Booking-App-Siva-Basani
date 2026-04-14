import React from "react";
import SliderModule from "react-slick";
import { banners } from "../../../utils/constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BannerSlider.css";

// BannerSlider component for displaying carousel banners
const BannerSlider = () => {

  // Fix for default export issue in react-slick
  const Slider = SliderModule.default || SliderModule;

  // Slider configuration settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    centerMode: true,
    centerPadding: "80px",
    // Responsive settings
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: "60px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: "40px",
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: "20px",
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="banner-section">
      {/* Wrapper for slider */}
      <div className="banner-wrapper">
        {/* Slider component */}
        <Slider {...settings}>
          {/* Loop through banner images */}
          {banners.map((banner, i) => (
            <div key={i} className="banner-slide">
              {/* Banner image */}
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