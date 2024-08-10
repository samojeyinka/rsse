import React from 'react'
import Ellipse803 from '../assets/images/Ellipse 803.png'
import PngItem_3024199 from '../assets/images/PngItem_3024199 2.png'
import crackingegg_transparent from '../assets/images/crackingegg_transparent.GIF.gif'
import ETHlogo from '../assets/images/ETH logo.png'
import Line22 from '../assets/images/Line 22.png'
import '../stylesheets/first.css'


const Cart = () => {
  return (
    <>
      <section class="cart" id="cart">
        <h1 class="heading">Get your exclusive ShibaDino NFT</h1>
        <p class="subheading">Diligent investors who have invested 20 SOL or more will automatically qualify for a
            Limited ShibaDino Pixel NFT</p>
        <div class="box-container">
            <div class="cbox">
                <div class="infos">
                    <div><img src={Ellipse803} alt=""/></div>
                    <div class="itext">
                        <h2>Owned by</h2>
                        <span class="nftcard-check"><p>@Jenny wilson</p> <img src={PngItem_3024199} alt=""/></span>
                    </div>
                </div>

                <img class="tgif" src={crackingegg_transparent} alt=""/>

                <div class="time-box">
                    <div class="text">
                        <p>SHIBA DINO</p>
                    </div>
                    <div class="time">
                        <p>10 : 13 : 26</p>
                    </div>
                </div>

                <div class="cart-footer">
                    <div class="ethi">
                        <div><img class="eth-imgs" src={ETHlogo} alt=""/></div>
                        <div>
                            <div class="text">
                                <p>Highest Bid</p>
                            </div>
                            <h3 class="price">8.32 ETH</h3>
                        </div>
                    </div>
                    <div class="btn-box">
                        <button class="btn">Auction</button>
                    </div>
                </div>

            </div>

            <div class="cbox">
                <div class="infos">
                    <div><img src={Ellipse803} alt=""/></div>
                    <div class="itext">
                        <h2>Owned by</h2>
                        <span class="nftcard-check"><p>@Jenny wilson</p> <img src={PngItem_3024199} alt=""/></span>
                    </div>
                </div>

                <img class="tgif" src={crackingegg_transparent} alt=""/>

                <div class="time-box">
                    <div class="text">
                        <p>SHIBA DINO</p>
                    </div>
                    <div class="time">
                        <p>10 : 13 : 26</p>
                    </div>
                </div>

                <div class="cart-footer">
                    <div class="ethi">
                        <div><img class="eth-imgs" src={ETHlogo} alt=""/></div>
                        <div>
                            <div class="text">
                                <p>Highest Bid</p>
                            </div>
                            <h3 class="price">8.32 ETH</h3>
                        </div>
                    </div>
                    <div class="btn-box">
                        <button class="btn">Auction</button>
                    </div>
                </div>

            </div>

            <div class="cbox">
                <div class="infos">
                    <div><img src={Ellipse803} alt=""/></div>
                    <div class="itext">
                        <h2>Owned by</h2>
                        <span class="nftcard-check"><p>@Jenny wilson</p> <img src={PngItem_3024199} alt=""/></span>
                    </div>
                </div>

                <img class="tgif" src={crackingegg_transparent} alt=""/>

                <div class="time-box">
                    <div class="text">
                        <p>SHIBA DINO</p>
                    </div>
                    <div class="time">
                        <p>10 : 13 : 26</p>
                    </div>
                </div>

                <div class="cart-footer">
                    <div class="ethi">
                        <div><img class="eth-imgs" src={ETHlogo} alt=""/></div>
                        <div>
                            <div class="text">
                                <p>Highest Bid</p>
                            </div>
                            <h3 class="price">8.32 ETH</h3>
                        </div>
                    </div>
                    <div class="btn-box">
                        <button class="btn">Auction</button>
                    </div>
                </div>

            </div>

        </div>

        <div class="more">
            <div>
                <p>Limited to 222 pieces!</p>
            </div>
            <div><img src={Line22} alt=""/></div>
            <div><button>see all</button></div>
        </div>
    </section>

    </>
  )
}

export default Cart