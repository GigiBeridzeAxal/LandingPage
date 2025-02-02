import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrophy } from "react-icons/fa6";
import CricketBat from "../../Assets/cri1.png";
import CricketBat1 from "../../Assets/cric2.png";
import CricketBat2 from "../../Assets/cric3.png";
import CricketBat3 from "../../Assets/cricket.png";
import Trophy from "../../Assets/trophy.png"
import "./AutoPlaySlider.css";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderData = [
  { text: "Who wins the match?", icon: Trophy },
  { text: "RCB Top Run Scorer", icon: CricketBat },
  { text: "CSK Top Run Scorer", icon: CricketBat1 },
  { text: "RCB Top Wickets Taker", icon: CricketBat2 },
  { text: "CSK Top Wickets Taker", icon: CricketBat3 },
];

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

const AutoPlaySlider = () => {
  return (
    <div className="w-full  mx-auto">
      <Slider {...settings}>
        {sliderData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-4 p-4 "
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

export default AutoPlaySlider;
