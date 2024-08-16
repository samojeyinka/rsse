import React from "react";
import pawkenomicsegg from "../assets/images/pawkenomicsegg.png";
import pawkenomicupdated from "../assets/images/pawkenomicupdated.svg";
import stars from "../assets/images/Stars.svg";
import powkenomicsmobile from "../assets/images/powkenomics-mobile.svg";
import '../stylesheets/style.css'
import {Junglepaw,pc} from '../assets/landingPage/landingPage'
import whitepaper from "../assets/pdfs/ShibaDino_Whitepaper .pdf"


const Pawkenomics = () => {
  return (
    <>
      <div class="pawkenomics-section" id="pawkenomics">
        <div class="pawkenomics">
          <h1>
          <img src={stars} alt="" className="star" />pawkenomics
          </h1>
          <div className="junglepaw_box">
            <img src={Junglepaw} />
          </div>
          <br/>
          <h3 className="TOTAL_SUPPLY">TOTAL SUPPLY: 2.222.222.222</h3>
          <div class="pawkenomics-buttons">
            <div class="pawkenomics-button">Join Presale</div>
            <a href = {whitepaper} target = "_blank">
            <div class="pawkenomics-whitepaper">Whitepaper</div>
            </a>
          </div>


          {/* The buttons */}

          <div className="absolute_buttons">
              <button className="a">TEAM: 2,5%</button>
              <button className="b">LISTINGS & LIQUDITY: 20%</button>
              <button className="c">BONUS EVENTS: 2%</button>
              <button className="d">PRESALE: 67,5%</button>
              <button className="e">MARKETING: 8%</button>
          </div>

          <div className="absolute_clouds">
             <img src={pc} className="ac"/>
             <img src={pc} className="bc"/>
             <img src={pc} className="cc"/>
             <img src={pc} className="dc"/>
             <img src={pc} className="ec"/>
             
          </div>

        </div>
      </div>
    </>
  );
};

export default Pawkenomics;
