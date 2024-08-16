import React from 'react'
import footerlogo from '../assets/images/footer-logo.svg'
import cookies from "../assets/pdfs/4_5908823939194295922.pdf"
import tc from "../assets/pdfs/ShibaDino_Terms and Condition.pdf"
import pr from "../assets/pdfs/4_5908823939194295923.pdf"
import whitepaper from "../assets/pdfs/ShibaDino_Whitepaper .pdf"


const Footer = () => {
  return (
    <>
      <footer class="index__footer">
        <div class="footer_con">
            <div class="footer-first">
                <div class="footer__logo">
                    <img src={footerlogo} />
                </div>
                <div class="footer-second">
                    <div class="flex_btns mobile">
                        <button type="button">Join Presale</button>
                        <button type="button">How to buy?</button>
                    </div>
                </div>
                <div class="footer_links_section">
                    <div class="link_section_box">
                        <h3>About</h3>
                        <ul>
                            <li><a href="#">Tokenomics</a></li>
                            <li><a href="#">How to buy</a></li>
                        </ul>
                    </div>
                    <div class="link_section_box">
                        <h3>Docs</h3>
                        <ul>
                            <li><a href = {whitepaper} target = "_blank">Whitepaper</a></li>
                            <li><a href="#">Audit Report</a></li>
                        </ul>
                    </div>

                    <div class="link_section_box">
                        <h3>Terms</h3>
                        <ul>
                            <li><a href = {cookies} target = "_blank">Cookies Policy</a></li>
                            <li><a href = {pr} target = "_blank">Privacy Policy</a></li>
                            <li><a href = {tc} target = "_blank">Terms of Use</a></li>
                        </ul>
                    </div>

                    <div class="link_section_box">
                        <h3>Social</h3>
                        <ul>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Telegram</a></li>
                        </ul>
                    </div>


                </div>
            </div>
            <div class="footer-second">
                <div class="flex_btns">
                    <button type="button">Join Presale</button>
                    <button type="button">How to buy?</button>
                </div>
            </div>

            <div class="footer-third">
                <p>Disclaimer: Cryptocurrency may be unregulated in your jurisdiction. The value of cryptocurrencies may
                    go down as well as up. Profits may be subject to capital
                    gains or other taxes applicable in your jurisdiction.</p>
            </div>
        </div>
        <div class="footer-copyright">
            <span>© 2024 ShibaDino. All Rights Reserved.</span>
        </div>
    </footer>

    </>
  )
}

export default Footer