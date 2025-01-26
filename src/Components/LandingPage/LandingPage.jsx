'use client'
import React from 'react'
import '../LandingPage/LandingPageCss.css'

export default function LandingPage() {



  return (
 

    <div className="">



    <div className="landingpageheader flex bg-black w-[100%] flex items-center justify-center p-[20px]">



      <div className="landingpageheader flex items-center justify-between w-[80%]">
        <div className="left"><img width={120} src="Super5 logo.png" alt="" /></div>
        <div className="right flex items-center justify-center gap-[20px] text-white">
            <div className="landingregister">Not a Member Yet? <a className='text-red-400' href="/login ">Register Now</a></div>
            <a href='/login' className="landinglogin p-[5px] p-[5px]">Log In</a>
        </div>
      </div>




    </div>
    

    <div className="carousel">
        <div className="carousel-item"><img src="https://rcmg.in/fantasy/landingimg/acquistion/mainlpsbanners/my11circle-dlp-sliding-fs-banner-1.jpg?v=78" alt="" /></div>
        <div className="carousel-item"><img  src="https://rcmg.in/fantasy/landingimg/acquistion/mainlpsbanners/my11circle-dlp-sliding-fs-banner-2.jpg?v=7" alt="" /></div>
        <div className="carousel-item"><img  src="https://rcmg.in/fantasy/landingimg/acquistion/mainlpsbanners/my11circle-dlp-sliding-fs-banner-4.jpg?v=3" alt="" /></div>
    </div>

    </div>


  )
}
