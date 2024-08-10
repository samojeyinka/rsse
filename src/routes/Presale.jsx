import React from "react";
import {
  Header,
  Presalehero,
  Presalestages,
  Footer,
} from "../components/component";
import "../stylesheets/presale.css";
import OwnerPrevilege from "./OwnerPrevilege/OwnerPrevilege";

const Presale = ({ adminState }) => {
  return (
    <main>
      <div className="header_hero">
        <Header />
        <Presalehero />
      </div>
      {adminState && <OwnerPrevilege />}
      <div className="ps_footer">
        <Presalestages />
        <Footer />
      </div>
    </main>
  );
};

export default Presale;
