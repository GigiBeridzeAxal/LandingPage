'use client'
import React, { useRef, useState } from 'react'
import '../LandingPage/LandingPageCss.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick';
import {motion} from 'framer-motion'



export default function LandingPage() {



  const QuestionsRef = useRef()
  const [MouseAcitvated , SetMouseActivated] = useState(false)
  const [startx , setstartx] = useState(0)
  const [currentslide , setcurrentslide] = useState(0)
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






  const slidewidth = 245

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

    const HandleOpen = (ind) => {
      


      setfaqs((perv) => (
        perv.map((faq, i) => (
          i === ind ? { ...faq, Opened: !faq.Opened } : faq
        ))



      ))

    }

    const scrollbyradio = (currentslideer) => {
      console.log(currentslideer)
      setcurrentslide(currentslideer )
      QuestionsRef.current.scrollTo({
        left: Math.round(255 * currentslideer ),
        behavior: 'smooth',
      });
    
    }

    const MosueUP = (e) => {
      SetMouseActivated(false)
      console.log(e , QuestionsRef)

      let current = 1
      
      if (startx - e.clientX > 0) {
        // Dragging to the left
        SetMouseActivated(false);
        if (currentslide < 5) {
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
            <div className="tutorialframe flex items-center justify-center w-[100%]">
            <div className="tutorialbox p-[5px] justify-between items-center"><img width={30} src="RCB.png" alt="" /> <div className="rcbvstittle">RCB vs CSK</div> <img width={45} src="CSK.png" alt="" /> </div>
            </div>
            </div>
          </div>

          <div className="stepfirst step relative">
            <div className="stepframe">
            <div className="stepnumber bg-orange-500">2</div>
            <strong className="steptittle">Answer 5 Questions</strong>
            <div className="setpdesc mb-[10px]">Use your circketing skills and pick the correct answers for 5 questions</div>
            <div className="tutorialframe flex items-center justify-center w-[100%]">


          
            <div className="tutorialbox flex flex-col items-center justify-center p-[5px]">


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


              <div className="chooser flex gap-[10px]">
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
            <div className="stepframe">
            <div className="stepnumber bg-orange-500">3</div>
            <strong className="steptittle">Join Free Contest</strong>
            <div className="setpdesc mb-[10px]">Join Free Contests And Win Free Rewards</div>
            <div className="tutorialframe flex items-center justify-center w-[100%]">
            <div className="tutorialbox flex items-center justify-center flex-col">
              <strong className="winiphonetittle flex items-center justify-center gap-[5px] p-[5px]">Win Iphone <img width={30} src="Iphone.png" alt="" /></strong>
              <div className="freejoin w-[100%] flex items-center justify-center bg-green-500 text-white">Join Free</div>
              
               </div>
            </div>
            </div>
          </div>

        </div>
        <br /><br />
        <iframe  className='w-[100%] howtoplayvideo' width="1024" height="458" src="https://www.youtube.com/embed/8RoDqWFEoZQ" title="Dream11: How to Play on Dream11" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <br /><br />

    <div className="reviewtittle text-[24px]">Reviews</div>
      <div className="reviews">
        <div className="reviewsframe">


        <div className="review bg-gray-100 p-[20px]">
            <div className="firstline flex items-center justify-between w-[100%]">
              <div className="profile flex items-center gap-[5px] justify-start">
                              <div className="manphoto"><img width={60} src="https://cdnflags.dream11.com/d11-static-pages/images/manasMalhotra.webp" alt="" /></div>
              <div className="manname">Manas Malhotra</div>
              
              
              </div>
              <div className="stars flex items-center justify-center gap-[8px]">
              <img width={30} src="Star.png" alt="" />
              <img width={30} src="Star.png" alt="" />
              <img width={30} src="Star.png" alt="" />
              <img width={30} src="Star.png" alt="" />
              <img width={30} src="Star.png" alt="" />
              
              </div>
              


            </div>
            <br />
            <div className="desc">I've been playing on Dream11 for many years and I have won earlier too. This time I won a Mega Contest! I'm an avid cricket follower. The best part was I got my winnings instantly into my bank account after the withdrawal.</div>
          </div>
<br />
          
          <div className="review bg-gray-100 p-[20px]">
            <div className="firstline flex items-center justify-between w-[100%]">
              <div className="profile flex items-center gap-[5px] justify-start">
                              <div className="manphoto"><img width={60} src="https://cdnflags.dream11.com/d11-static-pages/images/AnujYadav.webp" alt="" /></div>
              <div className="manname"> Anuj Yadav</div>
              
              
              </div>
              <div className="stars flex items-center justify-center gap-[8px]">
              <img width={30} src="Star.png" alt="" />
              <img width={30} src="Star.png" alt="" />
              <img width={30} src="Star.png" alt="" />
              <img width={30} src="Star.png" alt="" />
              <img width={30} src="Star.png" alt="" />
              
              </div>
              


            </div>
            <br />
            <div className="desc">One of the many reasons why I trust Dream11 is because I get my winnings safely and instantly after the contest gets over. I also used my own cricket knowledge to enhance my fantasy cricket skills.</div>
          </div>
<br />
          
          <div className="review bg-gray-100 p-[20px]">
            <div className="firstline flex items-center justify-between w-[100%]">
              <div className="profile flex items-center gap-[5px] justify-start">
                              <div className="manphoto"><img width={60} src="https://cdnflags.dream11.com/d11-static-pages/images/sagarBhagat.webp" alt="" /></div>
              <div className="manname">
              Sagar Bhagat</div>
              
              
              </div>
              <div className="stars flex items-center justify-center gap-[8px]">
              <img width={30} src="Star.png" alt="" />
              <img width={30} src="Star.png" alt="" />
              <img width={30} src="Star.png" alt="" />
              <img width={30} src="Star.png" alt="" />
              <img width={30} src="Star.png" alt="" />
              
              </div>
              


            </div>
            <br />
            <div className="desc">I used to always watch cricket and analyse the game. It was all about doing some good research and putting skills to work. I'm glad my knowledge and skills got rewarded and I won the Mega Contest.</div>
          </div>

        </div>


      </div>
      <br /><br />

      <div className="faqtittle text-[24px]">FAQ</div>

      <br /><br />

      <div className="faq flex items-center text-[14px] justify-center w-[100%]">
        <div className="faqframe flex flex-col items-center  gap-[10px] w-[60%]">

          {faqs.map((data , ind) => (


         <motion.button onClick={() => HandleOpen(ind)} className="faqquestionframe  w-[80%]">
         <div className="faqquest flex items-center justify-between w-[100%]">{data.QuestionTittle} {data.Opened == true ? <div className="arrow"><img width={30} src="Collapse.png" alt="" /></div> : <div className="arrow"><img width={30} src="Expand.png" alt="" /></div>} </div>
          <motion.div exit={{display:'none',height:0 , opacity:0}} initial={{ display:'none',height:0 , opacity:0 }} animate={data.Opened == true ? {height:'max-content' , opacity:1 , display:'block'} : null}  className="faqanswer  flex items-start">{data.Answer}</motion.div>
       </motion.button>

          ))}

 




        </div>
      </div>
      
      <br /><br />
        </div>


      </div>
    </div>
   


  )
}
