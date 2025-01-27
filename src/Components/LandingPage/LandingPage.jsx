'use client'
import React, { useRef } from 'react'
import '../LandingPage/LandingPageCss.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick';



export default function LandingPage() {




    const settings = {
      dots:true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true, // Enables drag functionality
      centerMode: false,
      focusOnSelect: true,
      autoplay: true,
      autoplaySpeed: 2000,
    };
  

  return (
 

    <div className="">



    <div className="landingpageheader flex bg-black w-[100%] flex items-center justify-center p-[20px]">



      <div className="landingpageheader flex items-center justify-between w-[80%]">
        <div className="left"><img width={120} src="Super5 logo.png" alt="" /></div>
        <div className="right flex items-center justify-center gap-[20px] text-white">
            <div className="landingregister flex items-center justify-center gap-[10px]"> <div className="notmember">Not a Member Yet? </div> <a className='text-red-400' href="/login ">Register Now</a></div>
            <a href='/login' className="landinglogin p-[5px] p-[5px]">Log In</a>
        </div>
      </div>




    </div>
    <div className="carousel-container">
    <Slider  {...settings}>
      <div>
           <img src="https://rcmg.in/fantasy/landingimg/acquistion/mainlpsbanners/my11circle-dlp-sliding-fs-banner-1.jpg?v=78" alt="" />
      </div>
      <div>

      <img  src="https://rcmg.in/fantasy/landingimg/acquistion/mainlpsbanners/my11circle-dlp-sliding-fs-banner-2.jpg?v=7" alt="" />
      </div>
      <div>
      <img  src="https://rcmg.in/fantasy/landingimg/acquistion/mainlpsbanners/my11circle-dlp-sliding-fs-banner-4.jpg?v=3" alt="" />
      </div>



    </Slider>

    </div>
    </div>
  )
}
