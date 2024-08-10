import React from 'react'
import image1  from '../assets/images/image 1.png'
import Ellipse79  from '../assets/images/Ellipse 79.png'
import Ellipse81  from '../assets/images/Ellipse 81.png'
import i32  from '../assets/images/3 2.png'
import image3 from '../assets/images/Image 3.png'
import i1 from '../assets/images/1.png'
import i2 from '../assets/images/2.png'
import i3 from '../assets/images/3.png'

const Buy = () => {
  return (
    <>
     <section class="buy" id="buy">

        <img class="img1" src={image1} alt=""/>
        <img class="img2" src={Ellipse79} alt=""/>
        <img class="img3" src={Ellipse81} alt=""/>
        <img class="img4" src={i32} alt=""/>
        <img class="img5" src={image3} alt=""/>

        <h2>how to buy</h2>
        <p>Learn how to buy in 3 steps</p>

        <div class="step-box">
            <div class="bbox">
                <img src={i1} alt=""/>
                <h2>Connect your Wallet</h2>
                <p>Go to the wallet connect button on the website and connect your wallet to the presale panel.</p>
            </div>

            <div class="bbox">
                <img src={i2} alt=""/>
                <h2>Select the Amount</h2>
                <p>Select the currency you want to use to pay (We recommend using SOL). Enter the amount you want to
                    spend and make sure you are on the Solana Blockchain, otherwise it will not work.</p>
            </div>

            <div class="bbox last-bbox">
                <img src={i3} alt=""/>
                <h2>Confirm and go</h2>
                <p>Click on the confirm button and approve. 
                    Congrats you have now purchased $DINO. Your token are secured in the smart contract and can be
                    claimed and traded once the presale has finished!</p>
            </div>

        </div>

    </section>
    </>
  )
}

export default Buy