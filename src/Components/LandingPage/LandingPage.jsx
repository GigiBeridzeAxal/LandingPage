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
      <div className=''>
           <img className='CarouselImages' src="https://rcmg.in/fantasy/landingimg/acquistion/mainlpsbanners/my11circle-dlp-sliding-fs-banner-1.jpg?v=78" alt="" />
      </div>
      <div>

      <img  className='CarouselImages' src="https://rcmg.in/fantasy/landingimg/acquistion/mainlpsbanners/my11circle-dlp-sliding-fs-banner-2.jpg?v=7" alt="" />
      </div>
      <div>
      <img className='CarouselImages'  src="https://rcmg.in/fantasy/landingimg/acquistion/mainlpsbanners/my11circle-dlp-sliding-fs-banner-4.jpg?v=3" alt="" />
      </div>



    </Slider>

    </div>

    <div className="StartPlaying w-[100%] flex items-center justify-center mt-[60px]">
      <div className="startplayingframe w-[80%] flex flex-col gap-[30px] items-center justify-center">

        <div className="startplaytittle flex items-center gap-[5px] flex-wrap">its 3 simple steps to start playing <div className="text-red-600">on Dream11</div></div>
      
              <div className="steps w-[100%] flex items-center justify-between">


          <div className="stepfirst step relative">
            <div className="stepframe">
            <div className="stepnumber bg-orange-500">1</div>
            <strong className="steptittle">Select A Match</strong>
            <div className="setpdesc mb-[10px]">Select Upcoming Match That You Want To Play</div>
            <div className="tutorialbox p-[5px] justify-between items-center"><img width={30} src="RCB.png" alt="" /> <div className="rcbvstittle">RCB vs CSK</div> <img width={45} src="CSK.png" alt="" /> </div>
            </div>
           
          </div>

          <div className="stepfirst step relative">
            <div className="stepframe">
            <div className="stepnumber bg-orange-500">2</div>
            <strong className="steptittle">Answer 5 Questions</strong>
            <div className="setpdesc mb-[10px]">Use your circketing skills and pick the correct answers for 5 questions</div>
            <div className="tutorialbox flex flex-col items-center justify-center p-[5px]">
              <strong className="first mb-[5px]">1. RCB Top Run Scorer</strong>
              <div className="chooser flex gap-[10px]">
                <input checked type='checkbox' />
                <input  type='checkbox' />
                <input  type='checkbox' />
              
              </div>
            </div>
            </div>
           
          </div>

          <div className="stepfirst step relative">
            <div className="stepframe">
            <div className="stepnumber bg-orange-500">3</div>
            <strong className="steptittle">Join Free Contest</strong>
            <div className="setpdesc mb-[10px]">Join Free Contests And Win Free Rewards</div>
            <div className="tutorialbox flex items-center justify-center flex-col">
              <strong className="winiphonetittle flex items-center justify-center gap-[5px] p-[5px]">Win Iphone <img width={30} src="Iphone.png" alt="" /></strong>
              <div className="freejoin w-[100%] flex items-center justify-center bg-green-500 text-white">Join Free</div>
              
               </div>
            </div>
           
          </div>

        </div>
        <br /><br />
        <iframe  className='w-[100%] howtoplayvideo' width="1024" height="458" src="https://www.youtube.com/embed/8RoDqWFEoZQ" title="Dream11: How to Play on Dream11" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <br /><br />
        </div>


      </div>
    </div>
   


  )
}
