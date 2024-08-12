import React from 'react'
import sc1 from '../assets/images/sc1.png'
import sc2 from '../assets/images/sc2.png'
import sc3 from '../assets/images/sc3.png'
import sc4 from '../assets/images/sc4.png'
import ellipse from '../assets/images/Ellipse.png'
import r1 from '../assets/images/r1.png'
import r2 from '../assets/images/r2.png'
import r3 from '../assets/images/r3.png'
import r4 from '../assets/images/r4.png'
import r5 from '../assets/images/r5.png'
import toright1 from '../assets/images/toright1.png'
import toleft1 from '../assets/images/toleft1.png'
import { lr,mr } from '../assets/landingPage/landingPage'
import stars from "../assets/images/Stars.svg";


const Roadmap = () => {
    return (
        <>
            <section class="roadmap" id='roadmap'>
            <h1>
          <img src={stars} alt="" className="star" />Roadmap
          </h1>
                <div class="roadmap_con">

                    <img src={lr} className='pc' />
                    <img src={mr} className="mobile" />
                </div>

            </section>

        </>
    )
}

export default Roadmap