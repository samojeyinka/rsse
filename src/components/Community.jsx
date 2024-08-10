import React from 'react'
import i227 from '../assets/images/2 27.svg'
import frame1597881833 from '../assets/images/Frame 1597881833.png'
import telegram from '../assets/images/telegram.svg.svg'
import twitter from '../assets/images/twitter.svg.svg'
import { tree1 } from '../assets/landingPage/landingPage'

const Community = () => {
  return (
    <>
     <section class="community" id="community">
      <div className='com_tree'>
        <img src={tree1} />
      </div>
        <div class="community-box">
            <h2><img src={frame1597881833} alt=""/> Join the only and official <br/> ShibaDino Community!</h2>
            <p>and become a part of the family!</p>
            <div class="link-flex">
                <div><button class="com-btn1"><img src={telegram} alt=""/>Telegram</button></div>
                <div><button class="com-btn2"><img src={twitter} alt=""/>Twitter (X)</button></div>
            </div>
        </div>
    </section>

    </>
  )
}

export default Community