'use client'
import React, { useEffect, useRef, useState } from 'react'
import '../LandingPage/LandingPageCss.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick';
import {motion} from 'framer-motion'



export default function LandingPage() {



  const QuestionsRef = useRef()
  const imagesliderRef = useRef()
  const [MouseAcitvated , SetMouseActivated] = useState(false)
  const [MouseAcitvatedimageslider , SetMouseActivatedimageslider] = useState(false)
  const [startx , setstartx] = useState(0)
  const [startximageslider , setstartximageslider] = useState(1)
  const [currentslide , setcurrentslide] = useState(0)
  const [currentimageslide , setcurrentimageslide] = useState(0)
  const [desktop , setdesktop] = useState(true)
  const [screenheight , setheight]  = useState(800)
  const [screenwidth , setscreenwidth] = useState(window.innerWidth)
  




  // Faq List To Show On Screen
  const [SliderImages , setSliderImages] = useState([
    {
      DesktopURL:"/Desktop.png",
      MobileURL:"/Mobile.png"
    },
    {
      DesktopURL:"/Desktop.png",
      MobileURL:"/Mobile.png"
    },





  ])
  const [faqs , setfaqs] = useState([

    {
      Opened:false,
      QuestionTittle:"What is Fantasy Sports? ",
      Answer:"Fantasy sports is a strategy-based online sports game where you can create a virtual team of real players, playing in live matches worldwide. You earn points and win cash prizes based on the performances of these players in actual matches."
    },
    {
      Opened:false,
      QuestionTittle:"What is Fantasy Sports? ",
      Answer:"Fantasy sports is a strategy-based online sports game where you can create a virtual team of real players, playing in live matches worldwide. You earn points and win cash prizes based on the performances of these players in actual matches."
    },
    {
      Opened:false,
      QuestionTittle:"What is Fantasy Sports? ",
      Answer:"Fantasy sports is a strategy-based online sports game where you can create a virtual team of real players, playing in live matches worldwide. You earn points and win cash prizes based on the performances of these players in actual matches."
    },
    {
      Opened:false,
      QuestionTittle:"What is Fantasy Sports? ",
      Answer:"Fantasy sports is a strategy-based online sports game where you can create a virtual team of real players, playing in live matches worldwide. You earn points and win cash prizes based on the performances of these players in actual matches."
    },
    {
      Opened:false,
      QuestionTittle:"What is Fantasy Sports? ",
      Answer:"Fantasy sports is a strategy-based online sports game where you can create a virtual team of real players, playing in live matches worldwide. You earn points and win cash prizes based on the performances of these players in actual matches."
    },
    


  ])

    



  


    const settings = {


        infinite: true,
        dots:true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true, // Enables drag functionality
        centerMode: false,
        focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 2000,


    };

    // Image Height By ScreenHeight
    useEffect(() => {
      if(window){
        setheight(window.innerHeight - 80)
      }
      if(window){
        if(window.innerWidth < 900){
          setdesktop(false)

        }else{
          setdesktop(true)
        }
      }

      window.addEventListener('resize' , (e) => {
        if(window){
          setheight(e.innerHeight - 80)
        }
        if(e.currentTarget.innerWidth < 900){
          setdesktop(false)

        }else{
          setdesktop(true)
        }
      })

    },[])
    // Open/Close Faq
    const HandleOpen = (ind) => {
      


      setfaqs((perv) => (
        perv.map((faq, i) => (
          i === ind ? { ...faq, Opened: !faq.Opened } : faq
        ))



      ))

    }

        // Scroll Function For Radio Slider
    const scrollbyradio = (currentslideer) => {

      setcurrentslide(currentslideer )
      QuestionsRef.current.scrollTo({
        left: Math.round(255 * currentslideer ),
        behavior: 'smooth',
      });
    
    }

    const MosueUP = (e) => {
      SetMouseActivated(false)


      let current = 1
      
      if (startx - e.clientX > 0) {
        // Dragging to the left
        SetMouseActivated(false);
        if (currentslide < 4) {
          setcurrentslide((perv => (perv + 1))); // Increment slide index

        }
        // Scroll to the next slide with smooth behavior
        QuestionsRef.current.scrollTo({
          left: Math.round(255 * (currentslide + 1)),
          behavior: 'smooth',
        });
      

      } else {
        // Dragging to the right
        SetMouseActivated(false);
        if (currentslide > 0) {
          setcurrentslide((perv => (perv - 1)));
   
        }
        // Scroll to the previous slide with smooth behavior
        QuestionsRef.current.scrollTo({
          left: 255 * (currentslide - 1),
          behavior: 'smooth',
        });
      
     
      }
 
   


    }
    const MosueUPcapt = ()=> {
      SetMouseActivated(false)
    }

    const MouseDown = (e) => {
      SetMouseActivated(true)


            setstartx(e.clientX)

  
  

    }
    const Mouseleave = () => {
      SetMouseActivated(false)
    }
    const MouseOver = (e) => {
      setstartx(e.clientX)
    }
    const MouseMove = (e) => {

      if(MouseAcitvated){
        QuestionsRef.current.scrollLeft += (startx - e.clientX) * 0.1
      }
  
  
    }
  

    
  return (
 

    <div className="">

  
    <div className="landingpageheaderr flex bg-black w-[100%] flex items-center justify-center p-[20px]">



      <div className="landingpageheader flex items-center justify-between w-[80%]">
        <div className="left"><img width={120} src="Super5 logo.png" alt="" /></div>
        <div className="right flex items-center justify-center gap-[20px] text-white">
            <div className="landingregister flex items-center justify-center gap-[10px] "> <div className="notmember ">Not a Member Yet? </div> <a className='text-red-400' href="/login ">Register Now</a></div>
            <a href='/login' className="landinglogin p-[5px] p-[5px]">Log In</a>
        </div>
      </div>




    </div>
    <div className="slider-container">
      <Slider {...settings}>
        {SliderImages.map(data => (
        <div><img src={desktop == true ? `${data.DesktopURL}` : `${data.MobileURL}` } alt="slide 1" /></div>
        ))}

      </Slider>
    </div>

    <div className="StartPlaying w-[100%] flex items-center justify-center mt-[60px]">
      <div className="startplayingframe w-[70%] flex flex-col gap-[30px] items-center justify-center">

        <div className="startplaytittle flex items-center gap-[5px] flex-wrap">its 3 simple steps to start playing <div className="text-red-600">on SUPER5</div></div>
      
              <div className="steps w-[100%] flex items-center justify-between">


          <div className="stepfirst step relative">
            <div className="stepframe flex justify-between flex-col ">


            <div className="mainstepframe gap-[10px] p-[5px] flex w-[100%]">

            <div className="stepnumber  text-black ">1</div>
            <div className="stepinfo">
            <strong className="steptittle flex items-center gap-[5px]"> Select A Match</strong>
            <div className="setpdesc ">Select Upcoming Match That You Want To Play</div>
     
            </div>

            
            </div>
            <div className="tutorialbox p-[5px] justify-around items-center"><img width={30} src="RCB.png" alt="" /> <div className="rcbvstittle">RCB vs CSK</div> <img width={45} src="CSK.png" alt="" /> </div>

            </div>
          </div>

          <div className="stepfirst step relative">
            <div className="stepframe flex flex-col ">


            <div className="mainstepframe gap-[10px] p-[5px] flex w-[100%]">

            <div className="stepnumber  text-black">2</div>
            <div className="stepinfo">
            <strong className="steptittle">Answer 5 Questions</strong>
            <div className="setpdesc ">Use your circketing skills and pick the correct answers for 5 questions</div>
     
            </div>

            
            </div>
            <div className="tutorialframe flex items-center justify-center w-[100%]">


          
        

            <div className="tutorialbox flex flex-col items-center justify-center ">


<div ref={QuestionsRef}

onMouseDown={(e) => MouseDown(e)} 
onMouseUp={(e) =>MosueUP(e)}
onMouseMove={(e) => MouseMove(e)}
onMouseUpCapture={MosueUPcapt}
onMouseLeave={Mouseleave}
onMouseOverCapture={(e) => MouseOver(e)}




className="questions flex items-center ">
<strong className="quest mb-[5px]">1.  Who wins match</strong>
<strong className="quest mb-[5px]">2. RCB Top Run Scorer</strong>
<strong className="quest mb-[5px]">3. CSK Top Run Scorer</strong>
<strong className="quest mb-[5px]">4. RCB Top Wickets Taker</strong>
<strong className="quest mb-[5px]">5. ⁠CSK Top Wickets Taker</strong>
</div>


<div className="chooser items-center justify-center flex gap-[10px]">
  {currentslide == 0 ? <input checked={currentslide == 0 ? true : false} type='radio' /> :<input onClick={() => scrollbyradio(0)} checked={false}  type='radio' /> }
  {currentslide == 1 ? <input checked={currentslide == 1 ? true : false} type='radio' /> :<input onClick={() => scrollbyradio(1)} checked={false}  type='radio' /> }
  {currentslide == 2 ? <input checked={currentslide == 2 ? true : false} type='radio' /> :<input onClick={() => scrollbyradio(2)}  checked={false} type='radio' /> }
  {currentslide == 3 ? <input checked={currentslide == 3 ? true : false} type='radio' /> :<input onClick={() => scrollbyradio(3)} checked={false} type='radio' />}
  {currentslide == 4 ? <input checked={currentslide == 4 ? true : false} type='radio' /> :<input onClick={() => scrollbyradio(4)} checked={false} type='radio' />}




</div>
</div>
</div>
            </div>
          </div>


          <div className="stepfirst step relative">
            <div className="stepframe flex flex-col ">


            <div className="mainstepframe gap-[10px] p-[5px] flex w-[100%]">

            <div className="stepnumber text-black">3</div>
            <div className="stepinfo">
            <strong className="steptittle">Join Free Contest</strong>
            <div className="setpdesc ">Join Free Contests And Win Free Rewards</div>
     
            </div>

            
            </div>
            <div className="tutorialbox flex items-center justify-center flex-col">
              <strong className="winiphonetittle flex items-center justify-center gap-[5px] p-[5px]">Win Iphone <img width={30} src="Iphone.png" alt="" /></strong>
              <div className="freejoin w-[100%] flex items-center justify-center bg-green-500 text-white">Join Free</div>
              
               </div>

            </div>
          </div>
        

        </div>
 
      

  
    <br />
        <iframe  className='w-[100%] howtoplayvideo' width="548" height="260" src="https://www.youtube.com/embed/q5DSFO8rA2o" title="Super5.live" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <div className="faqtittle text-[24px]">FAQ</div>


      <div className="faq flex items-center text-[14px] justify-center w-[100%]">
        <div className="faqframe flex flex-col items-center   gap-[10px] w-[60%]">

          {faqs.map((data , ind) => (


         <motion.button onClick={() => HandleOpen(ind)} className="faqquestionframe relative  w-[80%]">
         <div className="faqquest flex items-center  justify-between w-[100%]">{data.QuestionTittle} {data.Opened == true ? <div className="arrow"><img width={30} src="Collapse.png" alt="" /></div> : <div className="arrow"><img width={30} src="Expand.png" alt="" /></div>} </div>

          <motion.div  exit={{    height:0 , opacity:0 ,  }}  initial={{ height:0 , bottom:'0px' , opacity:0 }}  animate={data.Opened == true ? { height:'max-content' , marginTop:'10px'   , opacity:1} : null}  className="faqanswer  flex items-start">{data.Answer}</motion.div>
       </motion.button>

          ))}

 




        </div>
      </div>

      
      
      <br /><br />

   

        </div>


      </div>
      <div className="footer w-[100%] bg-gray-600 text-white ">
        <div className="footerframe flex   p-[20px] justify-around w-[100%]">
          <div className="firstline flex  flex-col"><img width={135} src="Super5 logo.png" alt="" />
          <br />
          <strong>Address</strong>
          1234 Maple Street, Suite 567, Rivertown, TX 78901
          <br /><br />
          <div className="socialstittle">Socials</div>
          <div className="socials flex items-center gap-[5px]"><a href=""><img width={30} src="Facebook.png" alt="" /></a> <a href=""><img width={30} src="Instagram.png" alt="" /></a> </div>
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
        <div className="copyright flex items-center justify-center bg-black">Copyright @2025 all rights reserved</div>
      </div>
    </div>
   


  )
}
