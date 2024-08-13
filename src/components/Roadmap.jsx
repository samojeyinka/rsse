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

        <div class="rmp_mobile">
            <div class="r_box">
                <div class="r_box_top">
                    <div class="left">
                        <img src={ellipse} />
                        <h3>Brainstorming and project preparation</h3>
                    </div>
                    <img class="avatar" src={r1}/>
                </div>
                <div class="r_box_btm">
                    <div>
                        <strong>Brainstorming:</strong>
                        <p>The basic idea for ShibaDino was developed, inspired by the successful Shiba Inu
                            cryptocurrency.</p>
                    </div>
                    <div>
                        <strong>Composition of the team:</strong>
                        <p>A team of experts in the fields of blockchain technology, design and marketing was formed.
                        </p>
                    </div>
                    <div>
                        <strong>Project planning:</strong>
                        <p>Detailed planning and strategy development for the implementation of the project.</p>
                    </div>
                    <div>
                        <strong>Financing:</strong>
                        <p>Securing the financial resources to support the development and development and marketing
                            activities.</p>
                    </div>
                </div>
            </div>


            <div class="r_box right">
                
                <div class="r_box_top">
                    <div class="left">
                        <img src={ellipse} />
                        <h3>Development phase</h3>
                    </div>
                    <img class="avatar" src={r2} />
                </div>
                <div class="r_box_btm">
                    <div>
                        <strong>Launch of website V1.0:</strong>
                        <p>Publication of the first version of the Shibadino website website</p>
                    </div>
                    <div>
                        <strong> Start of development:</strong>
                        <p>Start of development of the Shibadino tokens and NFTs as well as the platform.
                        </p>
                    </div>
                    <div>
                        <strong>Smart contract development:</strong>
                        <p>Detailed planning and strategy development for the implementation of the project.</p>
                    </div>
                    <div>
                        <strong>Financing:</strong>
                        <p>Programming and testing of smart contracts for Shibadino tokens and NFTs on the Solana blockchain.</p>
                    </div>
                </div>
            </div>

            <div class="r_box">
                <div class="r_box_top">
                    <div class="left">
                        <img src={ellipse} />
                        <h3>Presale and token launch</h3>
                    </div>
                    <img class="avatar" src={r3} />
                </div>
                <div class="r_box_btm">
                    <div>
                        <strong>Start of the presale:</strong>
                        <p>Start of the pre-sale of Shibadino tokens. Date: TBD</p>
                    </div>
                    <div>
                        <strong>Composition of the team:</strong>
                        <p>A team of experts in the fields of blockchain technology, design and marketing was formed.
                        </p>
                    </div>
                    <div>
                        <strong>Token auditing:</strong>
                        <p>Conducting an independent audit of the smart contracts to security and reliability.</p>
                    </div>
                    <div>
                        <strong>Token Launch:</strong>
                        <p>Official launch and distribution of Shibadino tokens.</p>
                    </div>

                    <div>
                        <strong>Listing on decentralized exchange:</strong>
                        <p>Listing of Shibadino tokens on a decentralized exchange to enable trading. exchange to enable trading.</p>
                    </div>

                    <div>
                        <strong>Initiation of marketing campaign:</strong>
                        <p>Launch of a comprehensive marketing campaign to increase awareness of Shibadino.</p>
                    </div>

                    <div>
                        <strong>1st mint of the NFT collection:</strong>
                        <p>First minting of the exclusive Shibadino NFTs in a limited limited edition of 222 units.</p>
                    </div>

                </div>
            </div>


            <div class="r_box right">
                <div class="r_box_top">
                    <div class="left">
                        <img src={ellipse}/>
                        <h3>Expansion and community building</h3>
                    </div>
                    <img class="avatar" src={r4} />
                </div>
                <div class="r_box_btm">
                    <div>
                        <strong>Listing on Tier 1 Exchange:</strong>
                        <p>Listing of $DINO on Tier 1 Exchanges. </p>
                    </div>
                    <div>
                        <strong>Global influencer collaborations:</strong>
                        <p>Collaboration with global influencers to increase the increase reach and awareness. </p>
                    </div>
                    <div>
                        <strong>Marketing campaigns:</strong>
                        <p>Continuation and intensification of marketing campaigns, worldwide.</p>
                    </div>
                    <div>
                        <strong> Community building:</strong>
                        <p>Building and strengthening the Shibadino community through various initiatives and events.</p>
                    </div>

                    <div>
                        <strong>Advertising deals:</strong>
                        <p>Conclusion of advertising deals to further promote the Shibadino brand.</p>
                    </div>
                </div>
            </div>

            <div class="r_box">
                <div class="r_box_top">
                    <div class="left">
                        <img src={ellipse} />
                        <h3>2025: Expansion and new opportunities</h3>
                    </div>
                    <img class="avatar" src={r5}/>
                </div>
                <div class="r_box_btm">
                    <div>
                        <strong>Airdrops from the Solana ecosystem:</strong>
                        <p>Conducting airdrops for Shibadino holders to provide additional benefits and engagement.</p>
                    </div>
                    <div>
                        <strong>Beta participation in the game for NFT holders:</strong>
                        <p>Exclusive beta access for Shibadino NFT holders to a new game based on the Shibadino universe.</p>
                    </div>
                    <div>
                        <strong>Further expansion:</strong>
                        <p>Continuation of the expansion and introduction of new features and partnerships to increase project value and community participation.</p>
                    </div>
                    <div>
                        <strong>Launch of the ShibaPaw token, exclusively for ShibaDino investors</strong>
                    </div>
                </div>
            </div>


         

        </div>



            </section>

        </>
    )
}

export default Roadmap