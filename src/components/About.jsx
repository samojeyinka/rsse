import React from 'react'
import i91 from '../assets/images/9 1.png'
import frame1597881833 from '../assets/images/Frame 1597881833.png'
import egg1 from '../assets/images/egg 1  2.png'
import egg2 from '../assets/images/egg 3 1.png'
import egg3 from '../assets/images/egg 2 1.png'
import egg4 from '../assets/images/egg 4 1.png'
import i32 from '../assets/images/3 2.png'
import i41 from '../assets/images/4 1.png'
import image10 from '../assets/images/Image 10.png'

const About = () => {
  return (
    <>
        <section class="about" id="about">
        <div class="container">

            <div class="abox first-abox">
                <img class="img6" src={i91} alt=""/>
                <h2>What is Shibadino? <img src={frame1597881833} alt=""/></h2>
                <p>Immerse yourself in the fascinating world of ShibaDino, the new Solana token that combines the best
                    of the past and the future. </p>
                <p> ShibaDino is more than just a token. It is a community, a meme and a movement. Inspired by explosive
                    popularity of Siba Inu in 2021, ShibaDino brings a playful twists by combining the classic Shiba Inu
                    dog with a dinosaur mask.</p>
                <p>The result is a charming and irresistible combination that will appeal to NFT collectors and
                    investors alike.</p>

                <img class="img7" src={egg1} alt=""/>
                <img class="img9" src={egg2} alt=""/>
                <img class="img8" src={egg3} alt=""/>
            </div>

            <div class="abox second-abox">
                <img class="img4" src={i32} alt=""/>
                <h2>The Story <img src={frame1597881833} alt=""/></h2>
                <div class="flex-box">
                    <div class="sbox1">
                        <p>
                            In a distant, mysterious world, hidden deep in the untouched jungle, there was a glowing
                            egg. glowing egg. One day, ShibaDino hatched from it, a unique creature with the
                            extraordinary extraordinary ability to hide magical eggs. These mystical eggs, which
                            promised prosperity quickly attracted brave adventurers and curious treasure hunters. Every
                            time such an egg was discovered and opened, another ShibaDino hatched, bringing great wealth
                            to the finder. wealth to the finder
                        </p>
                        <button>Join Presale</button>
                    </div>
                    <div class="sbox2">
                        <img src={image10} alt=""/>
                    </div>
                </div>
            </div>

            <div class="abox second-abox third-abox">
                <img class="img10" src={egg4} alt=""/>
                <h2>Why ShibaDino <img src={frame1597881833} alt=""/></h2>
                <div class="flex-box">
                    <div class="tbox1">
                        <div>
                            <h3>Innovation on the Solana chain: </h3>
                            <p> ShibaDino is released on the Solana blockchain, which is known for its fast transactions
                                and low fees. This ensures that your investment is efficient and cost-effective.</p>
                        </div>

                        <div>
                            <h3>Exclusive NFT collection:</h3>
                            <p>Our NFT collection consists of 222 unique ShibaDinos designed in a trendy pixel design.
                                Each NFT is a unique work of art and a coveted collector's item.</p>
                        </div>

                        <div>
                            <h3>Growing community:</h3>
                            <p>At ShibaDino, we rely on the strength of our community by reaching important milestones
                                together. As soon as these milestones are reached, we reward our community members with
                                token airdrops. This way you benefit directly from the success of the project.</p>
                        </div>

                    </div>
                    <div class="tbox2">
                        <img src={i41} alt=""/>
                    </div>
                </div>
            </div>

        </div>

    </section>

        </>
  )
}

export default About