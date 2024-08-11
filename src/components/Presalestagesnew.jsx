import { psf,fc, b3, tf, fft } from "../assets/PresalePagesImages/PresalePagesImages";
import "../stylesheets/presalecss.css";

const Presalestagesnew = () => {
    return (
        <>
            <section className="presale_stages_f">
                    <div className="psf_con">
                        <h2>Presale Stages</h2>
                        <div className="psfc_box">
                            <img src={psf} className="psf_flower"/>
                            <img src={fc} className="fc_flower"/>
                            <img src={b3} className="bt_flower"/>
                            <img src={tf} className="tf_flower"/>
                            <img src={fft} className="fft_flower"/>
                            <div className="psf_absolute_btns">
                                <button className="psf_btn a">Stage 14: 0,0046 USD</button>
                                <button className="psf_btn c pink">Stage 15: 0,0049 USD</button>
                                <button className="psf_btn d">Stage 13: 0,0043 USD</button>
                                <button className="psf_btn e">Stage 11: 0,0037 USD</button>
                                <button className="psf_btn f pink">Stage 10: 0,0034 USD</button>
                                <button className="psf_btn g">Stage 12: 0,0040 USD</button>
                                <button className="psf_btn h">Stage 7: 0,0025 USD</button>
                                <button className="psf_btn i pink">Stage 6: 0,0022 USD</button>
                                <button className="psf_btn j">Stage 5: 0,0019 USD</button>
                                <button className="psf_btn k">Stage 9: 0,0031 USD</button>
                                <button className="psf_btn l pink">Stage 8: 0,0028 USD</button>
                                <button className="psf_btn m">Stage 3: 0,0013 USD</button>
                                <button className="psf_btn n pink">Stage 2: 0,0010 USD</button>
                                <button className="psf_btn o">Stage 1: 0,0007 USD</button>
                                <button className="psf_btn p">Stage 4: 0,0016 USD</button>
                               
                            </div>
                        </div>
                    </div>
            </section>
        </>
    )
}


export default Presalestagesnew;