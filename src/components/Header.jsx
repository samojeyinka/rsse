import React from "react";
import "../stylesheets/presale.css";
import logo from "../assets/images/logo.png";
import logoMobile from "../assets/images/logo-avatar.svg";
import { FaBars } from "react-icons/fa";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();


  
  const urlPath = location.pathname.split('/');
  const presale = urlPath[urlPath.length - 1]

  console.log(presale)

  const { publicKey } = useWallet();

  const handleMobileMenu = () => {
    let menuList = document.getElementById("menuList");
    let navOverlay = document.getElementById("navOverlay");

    if (menuList.style.width == "0%" || menuList.style.width === "") {
      menuList.style.width = "60%";
      navOverlay.style.width = "100%";


      navOverlay.addEventListener("click", closeMenu);
    } else {
      menuList.style.width = "0%";
      navOverlay.style.width = "0%";


      navOverlay.removeEventListener("click", closeMenu);
    }
  };

  const closeMenu = () => {
    let menuList = document.getElementById("menuList");
    let navOverlay = document.getElementById("navOverlay");

    menuList.style.width = "0%";
    navOverlay.style.width = "0%";

    navOverlay.removeEventListener("click", closeMenu);
  };






  return (
    <>
      {/* The header section */}
      <header>
        <nav class="navbar">
          <Link to={"/"} class="logo__box">
            <img src={logo} class="logo__img" />
          </Link>
          <div class="nav__links__con">
            <ul class="nav__links">
              <li class="nav__link">
                <a href={presale === "presale" ? "/#about" : "#about"}>About Us</a>
              </li>
              <li class="nav__link">
                <a href={presale === "presale" ? "/#roadmap" : "#roadmap"}>RoadMap</a>
              </li>
              <li class="nav__link">
                <a href={presale === "presale" ? "/#pawkenomics" : "#pawkenomics"}>Pawkenomics</a>
              </li>
              <li class="nav__link">
                <a href={presale === "presale" ? "/#whitepaper" : "#whitepaper"}>Whitepaper</a>
              </li>
              <li class="nav__link">
                <a href={presale === "presale" ? "/#cart" : "#cart"}>Buy</a>
              </li>
            </ul>
          </div>

          <div class="connect__wallet">
            <WalletMultiButton
              style={{
                width: "200px",
                height: "39px",
                borderRadius: "12px",
                background: "var(--light-bg)",
                color: "var(--color-1)",
                fontFamily: "Rowdies",
                fontSize: "11px",
                fontWeight: 700,
                cursor: "pointer",
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
              }}
            >
              {publicKey
                ? publicKey?.toString().slice(0, 4) +
                "..." +
                publicKey?.toString().slice(-4)
                : "CONNECT WALLET"}
            </WalletMultiButton>
          </div>

          <div class="hamburger" onClick={handleMobileMenu}>
            <i>
              <FaBars />
            </i>
          </div>
        </nav>
      </header>

      {/* for mobile starts */}
      <div id="navOverlay">

      </div>
      <div class="nav__links__con" id="menuList">
        <img src={logoMobile} class="mobile_logo" />
        <ul class="nav__links">
          <li class="nav__link" onClick={closeMenu}>
            <a href="#about">About Us</a>
          </li>
          <li class="nav__link" onClick={closeMenu}>
            <a href="#roadmap">RoadMap</a>
          </li>
          <li class="nav__link" onClick={closeMenu}>
            <a href="#pawkenomics">Pawkenomics</a>
          </li>
          <li class="nav__link" onClick={closeMenu}>
            <a href="#whitepaper">Whitepaper</a>
          </li>
          <li class="nav__link" onClick={closeMenu}>
            <a href="#cart">Buy</a>
          </li>
        </ul>
        <div class="connect__wallet_mobile">
          <WalletMultiButton
            style={{
              width: "200px",
              height: "39px",
              borderRadius: "12px",
              background: "var(--light-bg)",
              color: "var(--color-1)",
              fontFamily: "Rowdies",
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {publicKey
              ? publicKey?.toString().slice(0, 4) +
              "..." +
              publicKey?.toString().slice(-4)
              : "CONNECT WALLET"}
          </WalletMultiButton>
        </div>
      </div>
      {/* for mobile  ends*/}
    </>
  );
};

export default Header;
