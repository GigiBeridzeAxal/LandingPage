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
    <div className="rating flex items-center justify-center w-[100%] mt-[50px]">
      <div className="ratingframe flex items-center justify-between w-[80%]">

      <div className="UserRating flex items-end justify-end gap-[10px] ">
          <img src="data:img/png;base64,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" alt="" />
          <div className="ratinginfo">
          <div className="ratingvalue">4.3 OUT OF 5</div>
          <strong className="ratingtittle text-[26px]">USER RATING</strong>
          </div>

        
        </div>
        <div className="UserRating flex items-end justify-end gap-[10px] ">
          <img src="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABbCAYAAADz9JKnAAAH60lEQVR4nO2daYwURRiG3x2WsAoeQ4sKeKEcooIQLzwwIhoFNSpGQYMo+AMTo2BQNPHAICoeoP5RAhGiYATEEzUYLwIYBRREFJGgrggoxGGVBBdhYU2Rt7G30kdVT3XNMFtPMpmd6urq6rerq+r76tiqYUOHAkANgNEAxgFogcpB3MuehLtRiZOGRgBPAHgawI5qijwKwKMAqitIZJ+coThpeAjAXgDPCGHvBjC+QkUuNeIBPiK+hbgPSyL/DGB1Bd3oXgNxdOkOoCvPqRIlWwjcMpDILwBuArA0i7tuRvQG8BqAbrzlnPw0VzmRjbASwPJgQlk1Ag4JWegqJ5AxmmjpSrQlnNCWcEJbwgltCSe0JZzQlnBCW8IJbQkntCWKdo3mPS/rnLahv3wwvWJ+noWP5kcAcwE8B+CvrDMSRl2hoBSv3Ev0AIo5AUAPqWDkKLwYFVoH4JoS5jORchb6OgAfAOigELcdgLcADLeQr1SUq9CdAcxLcd50AL0yyE/RlKvQrxRx7kyD+TBGOQotRifOLeL80wD0NZgfI5Sj0IMMpHG9gTSMUo5Cn2IgjW4KcaxSjkK3NZBGjYE0jFKOQqtZAPH8k2UG01COQpuYU7LWQBpGsTk76Uz2Jg4GsAnAAgB/hsSbx9k9xTA34tzDaG0eD2Anp1Z8md0t/48NoTsBeAHA5VL435wA+JgU/j2AhQAuSnm9FQC+CAkfA+B+AEdI4Z8BuAvAdymvp0TWVUdnVgWyyGDpmhBhnBRjSg8NCZsiJhqGiCzoB+AbAKcXcc1EshZa+CpaJ8S5GcAwKawWwJUprjcEwA9SmHA2jUw4rwXzmtmU5SyFFjfYRTHuhJDJO+8DuBDAeoXzf+NbMycibRU6cN5hJmQp9GUacY+NMDIW0xUqphYvA7A7cKwBwFcAxgI4GcCHIecfA+BUjXwM1IirRZaNoe6IQIeIblkDHfvi05GfKvZcNhrOQzvN+MoUJXTe83qxq7SevYUgf2gm96tCnE38qKKbh7C0u/KNEce+1kxvP6mEznue6DG8CuCKQPBsNmr+6y0c8XcqJikasJ9ijh8J4CwAJ7Ln0EgLspbTY6ME3cKunqo38A3p9wwAtwZ+f8TGe4tievvRFjrveaJeXwSgp3RItPhHAbiYv0X/dAmACxSSvSciXIwT3sIuWJT/4l/2u2fy4cvcx/wmIbqh7wbivAngWumcS/ngRAnfpZDmftI0hoNDRPYRgvQP/L6apS6Ox9m1CtKfJXU2Lbk4J1ErNryzOJF+gHR8MQ2VOLZIff1zQkT26ZSmn59G6D4Jx88L/L2NhsBUlrwga/kaPiCFi9VhH9Nk16UnH9qT0nni9w0AvpXCRUP7Mgd+NwfCk95Clbe0CWnq6KT6ST6+nQbDeI6etGHDF2YmTzc0wDqWXcZgv/h1fs5mXb+Dwoc1wkm9mezraL6isn/CZ3fMoGpSj2Gy4VHsG/mQb5fCl/ETh6ir60STFBFnqm5mtIWuKxQ25D1vCOvPILvY4d8Wclprlubu/LuWK8BW8fhAGiWmEW/SJyzJoPEiSvNJAOo5Z2QlHVxB6lnXi17GIdKx2ziPRItU3bu6QmFO3vNEKz0CwAm88DSKF6QLexSDQhw6C9l45iJ6C6YQTqv5dIuKJcNXybcD4G0AkyRbYCmt1ZEc8N3ItFakyVdqg6WuUFgjRIyZEiZcj8/GNLgT+X0HgMPT5kOBGj5s4fN4KkToPKus4eydBBvS3w34xvdRlK8j7+1TuQsNimAXTNzU8zHpbwr4JsYUkwdFfMNpScJrP5Gmvk8rmuX+PaYmldB5zxue9zxhBGxgxtcHMjIkpMsmM5+/e9OEzxqRt/N5jXcSrjUq4FY9jFbrOvZOPg9pXJXQEjrveS3ynvceu2F9OSwFDgdtYMMxSyEpf3Vu2lGUNPgW63KFc6fw4WwNWJU1tBFeBPCp7ki7boleIPk3fMbxe7Si89z3Mducf+G7S+N8KkHu5d8PhhzrRxeDMspCs0t3ScihrQHjY7Bicv6Ugo46mS0Sv9WuU0zGv5c1EUZNH4WRm/3olOioRssf1Gyr4WT3R1NsTnfwd5lRXYYtLMvj+HfUFAjlhlznRntEhPud/fYaafk3a3qfjDgapWur4AsdZXKrDtVpCd0qIryB35W4g43f3jQkxEtER+io0pdLOH4g499TlE7K9+xWZVnCCW0JJ7QlnNCWcEJbwgltCSe0JZzQltAROipuc9jCLeoelfUzUaKP5ndjQrwDmaInP+r4J0ZwH9Og3X8QR5JRYftO+/gFcTIn9QRXe1VL04hjURa6rlCYERYeGJytRKH9KmOR4vy9SEw2hpVcdRSNSaF1qqFSln6da7dUiKOESR/ybk7BQsye+cb8u0XQwMGKqph85vjZaeqiJoVezVlLjTHVSI7Htkcct0Et81kV40+uYl6N5dOk0Hs0Bj5Lyd5SbHTlLENLlFpom9s9lHRriVILncU/momipGOaRdfRqhvsRRC2RrwicXW0JZzQlnBCW8IJbQkntCWc0JZwQlvCCW0JJ7QlZKHdKIk5mmgpC+1KuDmaaJmTAs5oTv6HDOkXWNe4j2qOIvir+DtyvfNmm7nKkFL9z9n20krb+mpuhTMpsIq/XZa7ZTVDxE4JY6u5QVMjF8i3ae6qGKaeC0OnVXNUWGz8dChXwFZSg1iqqkMg0hTbVrwEYNd/Unle/MmZsjgAAAAASUVORK5CYII=" alt="" />
          <div className="ratinginfo">
          <div className="ratingvalue">4+ CRORE</div>
          <strong className="ratingtittle text-[26px]">TOTAL USERS</strong>
          </div>

        
        </div>
        <div className="UserRating flex items-end justify-end gap-[10px] ">
          <img src="data:img/png;base64,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" alt="" />
          <div className="ratinginfo">
          <div className="ratingvalue">₹ 500 CRORE+</div>
          <strong className="ratingtittle text-[26px]">PRIZES WON</strong>
          </div>

        
        </div>

     
      </div>
    </div>
    </div>
  )
}
