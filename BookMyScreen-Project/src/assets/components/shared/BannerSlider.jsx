import React from "react";
import SliderModule from "react-slick";
import { banners } from "../../../utils/constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BannerSlider.css";

const BannerSlider = () => {
  const Slider = SliderModule.default || SliderModule;

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
      <div className="banner-wrapper">
        <Slider {...settings}>
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