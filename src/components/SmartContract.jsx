import React, { useState } from "react";
import "../stylesheets/index.css";
import { mint } from "../utils/constants";
import CopyToClipboard from "react-copy-to-clipboard";

const SmartContract = () => {
  const [refCopied, setrefCopied] = useState(false);
  return (
    <>
      <section class="smart__contract" id="whitepaper">
        <div class="sc__con">
          <div class="sc__con_details">
            <h2>Smart Contract</h2>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div class="crypto_info">
              <div class="crypto_info_top">
                <div class="each_box">
                  <span>Blockchain</span>
                  <h4>SOLANA</h4>
                </div>

                <div class="each_box">
                  <span>Token Symbol</span>
                  <h4>$DINO</h4>
                </div>

                <div class="each_box">
                  <span>Token Decimals</span>
                  <h4>18</h4>
                </div>
              </div>
              <div class="crypto_info_bottom">
                <label>Contract Address</label>
                <div class="copy_address">
                  <div class="address">
                    <p>EgoQYRxgKhkzUdK9pcXg2WHi7ZcBA2X3NXY3JUH3odKm</p>
                  </div>
                  <CopyToClipboard
                    text={
                      "https://solscan.io/token/EgoQYRxgKhkzUdK9pcXg2WHi7ZcBA2X3NXY3JUH3odKm"
                    }
                    onCopy={() => {
                      setrefCopied(true);
                      setTimeout(() => {
                        setrefCopied(false);
                      }, 1000);
                    }}
                  >
                    <button class="copy">
                      {refCopied ? "Copied!" : "Copy"}
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <button class="jp">Join Presale</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SmartContract;
