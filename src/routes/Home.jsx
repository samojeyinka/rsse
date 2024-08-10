import React from 'react';
import { About, Buy, Cart, Community, Faq, Footer, Header, Hero, Media, Pawkenomics, Roadmap, SmartContract } from "../components/component";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Cart />
      <Buy />
      <About />
      <Pawkenomics />
      <Roadmap />
      <Faq />
      <SmartContract />
      <Media />
      <Community />
      <Footer />
    </>
  );
}

export default Home