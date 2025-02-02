"use client";
import React, { useEffect, useRef, useState } from "react";
import "../LandingPage/LandingPageCss.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { motion } from "framer-motion";
import AutoPlaySlider from "../SlideCard/AutoPlaySlider";
import FantasyPoints from "../FantasyPoint/FantasyPoints";
import WinPrizeSlider from "../WinPrizeSlider/WinPrizeSlider";

export default function LandingPage() {
  const QuestionsRef = useRef();
  const imagesliderRef = useRef();
  const [MouseAcitvated, SetMouseActivated] = useState(false);
  const [MouseAcitvatedimageslider, SetMouseActivatedimageslider] =
    useState(false);
  const [startx, setstartx] = useState(0);
  const [startximageslider, setstartximageslider] = useState(1);
  const [currentslide, setcurrentslide] = useState(0);
  const [currentimageslide, setcurrentimageslide] = useState(0);
  const [desktop, setdesktop] = useState(true);
  const [screenheight, setheight] = useState(800);
  const [screenwidth, setscreenwidth] = useState(window.innerWidth);

  // Faq List To Show On Screen
  const [SliderImages, setSliderImages] = useState([
    {
      DesktopURL: "/Desktop.png",
      MobileURL: "/Mobile.png",
    },
    {
      DesktopURL: "/Desktop.png",
      MobileURL: "/Mobile.png",
    },
    {
      DesktopURL: "/Desktop.png",
      MobileURL: "/Mobile.png",
    },
  ]);
  const [faqs, setfaqs] = useState([
    {
      Opened: false,
      QuestionTittle: "What is Fantasy Sports? ",
      Answer:
        "Fantasy sports is a strategy-based online sports game where you can create a virtual team of real players, playing in live matches worldwide. You earn points and win cash prizes based on the performances of these players in actual matches.",
    },
    {
      Opened: false,
      QuestionTittle: "What is Fantasy Sports? ",
      Answer:
        "Fantasy sports is a strategy-based online sports game where you can create a virtual team of real players, playing in live matches worldwide. You earn points and win cash prizes based on the performances of these players in actual matches.",
    },
    {
      Opened: false,
      QuestionTittle: "What is Fantasy Sports? ",
      Answer:
        "Fantasy sports is a strategy-based online sports game where you can create a virtual team of real players, playing in live matches worldwide. You earn points and win cash prizes based on the performances of these players in actual matches.",
    },
    {
      Opened: false,
      QuestionTittle: "What is Fantasy Sports? ",
      Answer:
        "Fantasy sports is a strategy-based online sports game where you can create a virtual team of real players, playing in live matches worldwide. You earn points and win cash prizes based on the performances of these players in actual matches.",
    },
    {
      Opened: false,
      QuestionTittle: "What is Fantasy Sports? ",
      Answer:
        "Fantasy sports is a strategy-based online sports game where you can create a virtual team of real players, playing in live matches worldwide. You earn points and win cash prizes based on the performances of these players in actual matches.",
    },
  ]);

  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    centerMode: false,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  // Image Height By ScreenHeight
  useEffect(() => {
    if (window) {
      setheight(window.innerHeight - 80);
    }
    if (window) {
      if (window.innerWidth < 900) {
        setdesktop(false);
      } else {
        setdesktop(true);
      }
    }

    window.addEventListener("resize", (e) => {
      if (window) {
        setheight(e.innerHeight - 80);
      }
      if (e.currentTarget.innerWidth < 900) {
        setdesktop(false);
      } else {
        setdesktop(true);
      }
    });
  }, []);
  // Open/Close Faq
  const HandleOpen = (ind) => {
    setfaqs((perv) =>
      perv.map((faq, i) => (i === ind ? { ...faq, Opened: !faq.Opened } : faq))
    );
  };

  // Scroll Function For Radio Slider
  const scrollbyradio = (currentslideer) => {
    setcurrentslide(currentslideer);
    QuestionsRef.current.scrollTo({
      left: Math.round(255 * currentslideer),
      behavior: "smooth",
    });
  };

  return (
    <div className="">
      <div className="landingpageheaderr fixed top-0 left-0 w-full bg-black  backdrop-blur-md flex items-center justify-center p-[10px] z-[100]">
        <div className="landingpageheader flex items-center justify-between w-[80%]">
          <div className="left">
            <img width={120} height={30} src="Super5 logo.png" alt="Logo" />
          </div>
          <div className="right flex items-center justify-center gap-[20px] text-white">
            <div className="landingregister flex items-center justify-center gap-[10px]">
              <div className="notmember">Not a Member Yet?</div>
              <a className="text-red-400" href="/login">
                Register Now
              </a>
            </div>
            <a href="/login" className="landinglogin p-[5px]">
              Log In
            </a>
          </div>
        </div>
      </div>

      <section className="slider-container">
        {SliderImages.length > 1 ? (
          <Slider {...settings}>
            {SliderImages.map((data, index) => (
              <div key={index}>
                <img
                  src={desktop ? data.DesktopURL : data.MobileURL}
                  alt="slide"
                  className="h-[450px] md:h-[500px] lg:h-[550px] w-full"
                />
              </div>
            ))}
          </Slider>
        ) : (
          SliderImages.map((data, index) => (
            <div key={index}>
              <img
                className=" h-[450px] md:h-[500px] lg:h-[550px] w-full"
                src={desktop ? data.DesktopURL : data.MobileURL}
                alt="slide"
              />
            </div>
          ))
        )}
      </section>

      <section className="w-full min-h-[400px] flex flex-col -mt-[10px] items-center text-center p-4 bg-gray-100">
        <div className="startplaytittle flex flex-wrap items-center gap-2 mt-8 text-sm md:text-lg lg:text-xl font-semibold">
          It's 3 simple steps to start playing{" "}
          <span className="sitecol font-bold">on SUPER5</span>
        </div>

        <div className="steps w-full flex flex-row md:flex-row items-center justify-center gap-4 mt-10">
          <div className="stepfirst  step relative ">
            <div className="stepframe flex flex-col items-center">
              <div className="mainstepframe gap-3 flex w-full">
                <div className="stepnumber text-black text-lg font-bold">1</div>
                <div className="stepinfo text-left">
                  <strong className="steptittle">Select A Match</strong>
                  <div className="setpdesc text-sm text-gray-600">
                    Select Upcoming Match That You Want To Play
                  </div>
                </div>
              </div>
              <div className="tutorialbox p-5 flex items-center justify-around w-full">
                <img width={30} src="RCB.png" alt="RCB" />
                <div className="rcbvstittle text-gray-700">RCB vs CSK</div>
                <img width={45} src="CSK.png" alt="CSK" />
              </div>
            </div>
          </div>
          <div className="stepfirst step relative ">
            <div className="stepframe flex flex-col ">
              <div className="mainstepframe gap-[10px] p-[5px] flex w-[100%]">
                <div className="stepnumber  text-black">2</div>
                <div className="stepinfo text-left">
                  <strong className="steptittle">Answer 5 Questions</strong>
                  <p className=" setpdesc text-sm text-gray-600">
                    Use your cricketing skills and pick the correct answers for
                    5 questions.
                  </p>
                </div>
              </div>
              <AutoPlaySlider />
            </div>
          </div>
          <div className="stepfirst thirdstep step relative ">
            <div className="stepframe flex flex-col items-center">
              <div className="mainstepframe gap-3 flex w-full">
                <div className="stepnumber text-black text-lg font-bold">3</div>
                <div className="stepinfo text-left">
                  <strong className="steptittle">Join Free Contest</strong>
                  <div className="setpdesc text-sm text-gray-600">
                    Join Free Contests And Win Free Rewards
                  </div>
                </div>
              </div>
              <div className="tutorialbox flex flex-col items-center justify-center">
                <WinPrizeSlider />
                <div className="freejoin w-full text-center bg-green-500 text-white  cursor-pointer">
                  Join Free
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="videoclass w-full h-[450px] md:h-[500px] lg:h-[600px]  flex flex-col items-center justify-center p-4 text-center">
        <div className="mb-6">
          <h2 className="videotitle text-3xl md:text-4xl font-bold mb-3">
            How to <span className="sitecol">Play</span>
          </h2>
          <p className="text-gray-700 max-w-2xl text-base md:text-lg">
            Watch this quick tutorial to learn how to play Super5.live and get
            the best experience!
          </p>
        </div>
        <div className="w-full flex justify-center">
          <iframe
            className="w-full max-w-[600px] h-[300px] md:h-[350px] lg:h-[400px] rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/q5DSFO8rA2o"
            title="Super5.live"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      <section className="fantasypoint">
        <FantasyPoints />
      </section>
      <section className="faq-section flex flex-col items-center justify-center w-full py-10">
        <h2 className="faqtittle text-[24px] font-bold mb-5">FAQ</h2>

        <div className="faq flex items-center text-[14px] justify-center w-full">
          <div className=" flex flex-col items-center gap-4 w-[95%] sm:w-[95%] md:w-[80%] lg:w-[80%]">
            {faqs.map((data, ind) => (
              <motion.button
                key={ind}
                onClick={() => HandleOpen(ind)}
                className="faqquestionframe relative w-[80%] sm:w-[90%] md:w-[80%] lg:w-[80%] bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <div className="faqquest flex items-center justify-between w-full">
                  {data.QuestionTittle}
                  <div className="arrow">
                    <img
                      width={30}
                      src={data.Opened ? "Collapse.png" : "Expand.png"}
                      alt={data.Opened ? "Collapse" : "Expand"}
                    />
                  </div>
                </div>

                <motion.div
                  exit={{ height: 0, opacity: 0 }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={
                    data.Opened
                      ? { height: "auto", opacity: 1, marginTop: "10px" }
                      : null
                  }
                  className="faqanswer flex items-start text-gray-700"
                >
                  {data.Answer}
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      <div className="footer footerdm w-[100%] bg-gray-600 text-white ">
        <div className="footerframe flex   p-[20px] justify-between m-auto w-[80%]">
          <div className="firstline flex  flex-col">
            <img width={135} src="Super5 logo.png" alt="" />
            <br />
            <strong>Address</strong>
            1234 Maple Street, Suite 567, Rivertown, TX 78901
            <br />
            <br />
            <div className="socialstittle">Socials</div>
            <div className="socials flex items-center gap-[5px]">
              <a href="">
                <img width={30} src="Facebook.png" alt="" />
              </a>{" "}
              <a href="">
                <img width={30} src="Instagram.png" alt="" />
              </a>{" "}
            </div>
          </div>
          <div className="navigate flex gap-[5px] flex-col">
            <strong className="navigatetittle text-[24px]">Navigate</strong>
            <a href="/www.trickit.now">About Us</a>
            <a href="/www.trickit.now">How to Play</a>
            <a href="/www.trickit.now">FAQ</a>
            <a href="/www.trickit.now">Contact us</a>
          </div>

          <div className="navigate gap-[5px] flex flex-col">
            <strong className="navigatetittle text-[24px]">Legal</strong>
            <a href="/www.trickit.now">Terms & Conditions</a>
            <a href="/www.trickit.now">Privacy policy</a>
          </div>

          <div className="navigate flex gap-[5px] flex-col">
            <strong className="navigatetittle text-[24px]">Support</strong>
            <a href="/www.trickit.now">Contact us</a>
          </div>
        </div>
        <div className="copyright flex items-center justify-center bg-black">
          Copyright @2025 all rights reserved
        </div>
      </div>
      <div className="footer w-full bg-gray-600 text-white block md:hidden lg:hidden">
  <div className="flex justify-center py-4">
    <img width={135} src="Super5 logo.png" alt="Super5 Logo" />
  </div>
<div className="flex w-full flex-row mt-[20px] justify-between gap-4">
  <div className="w-1/2 flex flex-col items-center sm:items-start text-center sm:text-left text-sm">
    <strong>Address</strong>
    <p>1234 Maple Street, Suite 567, Rivertown, TX 78901</p>
    <div className="justify-start mt-4">Socials</div>
    <div className="flex justify-start items-center gap-3">
      <a href=""><img width={30} src="Facebook.png" alt="Facebook" /></a>
      <a href=""><img width={30} src="Instagram.png" alt="Instagram" /></a>
    </div>
  </div>
  <div className="w-1/2 flex flex-col items-center sm:items-start text-center sm:text-left text-sm">
    <strong className="text-lg">Navigate</strong>
    <a href="#">About Us</a>
    <a href="#">How to Play</a>
    <a href="#">FAQ</a>
    <a href="#">Contact Us</a>
  </div>
</div>

    <div className="flex w-full flex-row mt-[20px] justify-between gap-4">
      <div className="w-1/2 flex flex-col items-center sm:items-start text-center sm:text-left text-sm">
        <strong className="text-lg">Legal</strong>
        <a href="#">Terms & Conditions</a>
        <a href="#">Privacy Policy</a>
      </div>
      <div className="w-1/2 flex flex-col items-center sm:items-start text-center sm:text-left text-sm">
        <strong className="text-lg">Support</strong>
        <a href="#">Contact Us</a>
      </div>
    </div>
  <div className="copyright flex items-center justify-center bg-black p-3 mt-6 text-sm">
    Copyright @2025 all rights reserved
  </div>
</div>

    </div>
  );
}
