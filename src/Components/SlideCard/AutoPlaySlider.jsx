import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrophy, FaBaseballBatBall, FaBowlingBall } from "react-icons/fa6";
import CricketBat from "../../Assets/cri1.png";
import CricketBat1 from "../../Assets/cric2.png";
import CricketBat2 from "../../Assets/cric3.png";
import CricketBat3 from "../../Assets/cricket.png";
import "./AutoPlaySlider.css";
const AutoPlaySlider = () => {
  const [currentslide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  // Icons based on the question
  const slideIcons = [
    <FaTrophy className="text-yellow-500 text-xl" />,
    <img src={CricketBat1} className="w-5 h-5" />,
    <img src={CricketBat2} className="w-5 h-5" />,
    <img src={CricketBat3} className="w-5 h-5" />,
    <img src={CricketBat} className="w-5 h-5" />,
  ];

  // Questions list
  const questions = [
    "Who wins the match?",
    "RCB Top Run Scorer",
    "CSK Top Run Scorer",
    "RCB Top Wickets Taker",
    "CSK Top Wickets Taker",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  const slideVariants = {
    hidden: { x: "70%", opacity: 0 },
    visible: { x: "0%", opacity: 1, transition: { duration: 0.3 } },
    exit: { x: "-70%", opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="stepfirst step relative">
      <div className="stepframe flex flex-col items-center">
        <div className="tutorialbox flex overflow-hidden flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentslide}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute flex flex-row items-center gap-2"
            >
              <div className="flex items-center justify-center">
                {slideIcons[currentslide]}
              </div>
              <strong className="text-sm font-bold">
                {questions[currentslide]}
              </strong>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-5 flex gap-2">
          {[...Array(totalSlides)].map((_, index) => (
            <input
              key={index}
              type="radio"
              checked={currentslide === index}
              onChange={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoPlaySlider;
