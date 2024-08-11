import React from "react";
import faqImage from "../assets/images/faqImage.svg";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faq = () => {
  return (
    <>
      <section class="faq">
        <h2>ShibaDino FAQS</h2>
        <div class="faq_flex">
          <div class="faq_con">
            <Accordion
              sx={{
                bgcolor: "transparent",
                color: "white",
                borderRadius: "16px !important",
                py: 1,
                mb: 2,
                border:"2px solid #fff"
              }}
              PaperProps={{
                sx: {
                  borderRadius: "10px 10px 10px 10px",
                },
              }}
              variant="outlined"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{fontWeight:"600"}}
              >
                What is ShibaDino
              </AccordionSummary>
              <AccordionDetails>
                The ShibaDino is an ancient creature that comes from the depths
                of the jungle and hides eggs all over the world. Due to the
                rarity and peculiarity of these eggs, many adventurers have gone
                in search of them, but mostly without success. The few who have
                actually managed to find one of these precious eggs have been
                generously rewarded by the ShibaDino that hatches from it.
                ShibaDino is a Solana-based memecoin that ventures into the vast
                world of play-to-earn and metaverse and attracts investors with
                its aura of pure nostalgia mixed with the thrill of the crypto
                world. The full story of the legendary ShibaDino can be found in
                the whitepaper.
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                bgcolor: "transparent",
                color: "white",
                borderRadius: "16px !important",
                py: 1,
                mb: 2,
                border:"2px solid #fff"
              }}
              PaperProps={{
                sx: {
                  borderRadius: "10px 10px 10px 10px",
                },
              }}
              variant="outlined"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{fontWeight:"600"}}
              >
                Why ShibaDino
              </AccordionSummary>
              <AccordionDetails>
                With its offbeat theme that combines the reach of the legendary
                Shiba Inu coin and the pure nostalgia of the dragon dinosaur,
                ShibaDino aims to reach a maximum range of investors to create a
                community that stands out from the crowd of other memecoins.
                With the advantages of the Solana blockchain and the vision of
                shaping the play-to-earn world with an innovative video game,
                ShibaDino is one of the most attractive projects of today.
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                bgcolor: "transparent",
                color: "white",
                borderRadius: "16px !important",
                py: 1,
                mb: 2,
                border:"2px solid #fff"
              }}
              PaperProps={{
                sx: {
                  borderRadius: "10px 10px 10px 10px",
                },
              }}
              variant="outlined"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{fontWeight:"600"}}
              >
                How can I get an exclusive NFT?
              </AccordionSummary>
              <AccordionDetails>
                For the particularly brave supporters who invest at least 20 SOL
                or more, there is a chance to get one of our 250 exclusive Pixel
                ShibaDino NFTs. These are listed on OpenSea, the largest
                marketplace for NFTs..
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                bgcolor: "transparent",
                color: "white",
                borderRadius: "16px !important",
                py: 1,
                mb: 2,
                border:"2px solid #fff"
              }}
              PaperProps={{
                sx: {
                  borderRadius: "10px 10px 10px 10px",
                },
              }}
              variant="outlined"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{fontWeight:"600"}}
              >
                How do I get ShibaDino (DINO)?
              </AccordionSummary>
              <AccordionDetails>
                You can only buy $DINO on the official ShibaDino website. After
                the presale you will be able to claim and trade your purchased
                tokens. Important: You can currently only buy $DINO on
                shibadino.xyz. All other providers are scam. Never send money
                directly to the contract address, always buy via the presale
                panel on the website.
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                bgcolor: "transparent",
                color: "white",
                borderRadius: "16px !important",
                py: 1,
                mb: 2,
                border:"2px solid #fff"
              }}
              PaperProps={{
                sx: {
                  borderRadius: "10px 10px 10px 10px",
                },
              }}
              variant="outlined"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white"}} />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{fontWeight:"600"}}
              >
                Who do I contact if I have a problem?{" "}
              </AccordionSummary>
              <AccordionDetails>
                You can ask questions at any time in our ShibaDino Community
                group and we recommend that you join so that you are always up
                to date. If you have any direct questions, please send us an
                email: contact@shibadino.xyz.
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
