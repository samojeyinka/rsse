import React from 'react'
import frame1597881834 from '../assets/images/Frame 1597881834.svg'
import frame1597881833 from '../assets/images/Frame 1597881833.png'
import mediaimage1 from '../assets/landingPage/p1.png'
import mediaimage2 from '../assets/landingPage/p2.png'
import mediaimage3 from '../assets/landingPage/p3.png'
import mediaimage4 from '../assets/landingPage/p4.png'
import mediaimage5 from '../assets/landingPage/p5.png'
import mediaimage6 from '../assets/landingPage/p6.png'
import mediaimage7 from '../assets/landingPage/p7.png'
import mediaimage8 from '../assets/landingPage/p8.png'
import mediaimage9 from '../assets/landingPage/p9.png'
import mediaimage10 from '../assets/landingPage/p10.png'
import mediaimage11 from '../assets/landingPage/p11.png'
import mediaimage12 from '../assets/landingPage/p12.png'
import '../stylesheets/second.css'


const Media = () => {
  return (
    <>
      <section class="media" id="media">
        <div class="media-container">
            <h2>Media Partners <img src={frame1597881833} alt=""/></h2>
            <div class="media-box">
                <div><img src={mediaimage1} alt=""/></div>
                <div><img src={mediaimage2}  alt=""/></div>
                <div><img src={mediaimage3}  alt=""/></div>
                <div><img src={mediaimage4}  alt=""/></div>
                <div><img src={mediaimage5}  alt=""/></div>
                <div><img src={mediaimage6}  alt=""/></div>
                <div><img src={mediaimage7}  alt=""/></div>
                <div><img src={mediaimage8}    alt=""/></div>
                <div><img src={mediaimage9} alt=""/></div>
                <div><img src={mediaimage10} alt=""/></div>
                <div><img src={mediaimage11} alt=""/></div>
                <div><img src={mediaimage12} alt=""/></div>
            </div>
        </div>
    </section>

    </>
  )
}

export default Media