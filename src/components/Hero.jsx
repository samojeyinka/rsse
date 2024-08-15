import React from "react";
import "../stylesheets/index.css";
import "../stylesheets/homehero.css";
import {
  herov,
  hhrcircle,
  twinkle1,
  twinkle2,
  cf1,
  cf2,
  cf3,
  path,
  avo5,
  avoa,
  avob,
  avoc,
  avo6,
  hc1,
  hc2,
  svg1,
  svg2,
  svg3,
  svg4,
} from "../assets/heroImages";
import { cloudLeft,cloudRight,  Cloudbottomleft, CloudbottomRight } from "../assets/landingPage/landingPage";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <section class="home__hero__section">
        <div class="home__hero__con">
          <div class="flex__hero__details">
            <div class="fhd_box">
              <img src={herov} class="fhd_image" />
              <img src={hhrcircle} class="fhd_image bg-circle" />
              <h1>SHIBADINO</h1>
              <p>Unleash the roar, experience the adventure </p>
              <div class="flex-btns">
                <Link to="/presale">
                  {" "}
                  <button type="button" class="jp">
                    Join Presale
                  </button>
                </Link>
                <button type="button" class="wp">
                  Whitepaper
                </button>
              </div>
              <div class="utils">
                <img src={twinkle1} class="twinkle1" />
                <img src={twinkle2} class="twinkle2" />
                <img src={cf1} class="cf1" />
                <img src={cf2} class="cf2" />
                <img src={cf3} class="cf3" />
                <img src={path} class="cf4" />
                <img src={avo6} class="avo6" />
                <img src={cloudRight} class="hc1" />
                <img src={cloudLeft} class="hc2" />
              </div>
            </div>
          </div>

        <img src={Cloudbottomleft} class="svg1" />
          <img src={CloudbottomRight} class="svg4" />
        </div>
      </section>
    </>
  );
};

export default Hero;
