import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./WinPrizeSlider.css";
import Iphone from "../../Assets/iphone-img.jpeg";
import Camera from "../../Assets/circle.png";
import Cash from "../../Assets/coin.png";
import Display from "../../Assets/checked.png";

const sliderData = [
  { text: "Win iPhone", icon: Iphone },
  { text: "Best Camera Phone", icon: Camera },
  { text: "Fast Charging", icon: Cash },
  { text: "Super Retina Display", icon: Display },
];

const WinPrizeSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full  mx-auto">
      <Slider {...settings}>
        {sliderData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-4 p-4 shadow-md bg-white"
          >
            <strong className="text-sm md:text-sm font-semibold justify-center flex items-center gap-2">
              <img
                src={item.icon}
                alt={item.text}
                className="w-5 h-5 md:w-5 md:h-5 object-contain"
              />
              {item.text}
            </strong>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default WinPrizeSlider;
