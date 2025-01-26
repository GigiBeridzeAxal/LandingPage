import React from 'react'

export default function LandingPage() {
  return (
 

    <div className="landingpage flex bg-black w-[100%] flex items-center justify-center p-[10px]">
      <div className="landingpageheader flex items-center justify-between w-[80%]">
        <div className="left"><img width={120} src="Super5 logo.png" alt="" /></div>
        <div className="right flex items-center justify-center gap-[20px] text-white">
            <div className="landingregister">Not a Member Yet? <a href="/login">Register Now</a></div>
            <a href='/login' className="landinglogin p-[5px] p-[5px]">Log In</a>
        </div>
      </div>
    </div>



  )
}
