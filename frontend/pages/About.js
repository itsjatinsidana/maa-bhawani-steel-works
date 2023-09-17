import {Link} from "react-router-dom";
import {useEffect} from "react";
import load from "load-script";

// NEW
import TopHeader from "../components/new/TopHeader";
import NewNavigation from "../components/new/Navigation";
import BreadCrumb from "../components/new/BreadCrumb";
import NewFooter from "../components/new/NewFooter";
import Banner from "../components/new/Banner";
import AfterFooter from "../components/AfterFooter";
import {LoadingScreen} from "../components/ReactLoadingAnimation";
import ProductCard from "../components/ProductCard";

function About() {
    useEffect(() => {
        document.title = "About Us";
    });

    return (
        <>
            <header className="header-pos mb-40">
                <TopHeader/>

                <NewNavigation logo="assets/img/logo/logo-sinrato.png" />
            </header>

            <section className="contact-style-2 pt-30 pb-35">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="contact2-title text-center mb-65">
                                <h1>About us</h1>
                                <br/>
                                <h4> A firm from last 25 years manufacturing iron,steel and aluminium gates, grills,railings and much more.</h4>
                                <h6>The Main Aim Is To Build Up The Trust By Providing Good Quality And Fulfilling The Requirement Of The Customers.</h6>
                                <br/>
                                <h4>we deal with:- <br/>
                                    *iron gate<br/>
                                     *steel gate<br/>
                                      * aluminium gate<br/>
                                       *automated sliding gate<br/>
                                        *sliding gate</h4>
                                <br/>
                                <h6> A firm from last 25 years manufacturing iron, steel and aluminium gates, bottom sliding gates,automatic sliding gates, grills roilings and much more.<br/>All products are of good quality by using supremegrade factor inputs and most advanced technology.
                                <br/>We offered these products in different size and dimensions. The offered products are tested in gainest various parameters and maintain the ongoing market trends.</h6>

                            </div>
                        </div>

                        <div className="col-lg-6 text-center">
                            <div style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <img src="assets/img/logo/logo-sinrato.png"
                                     alt="brand-logo"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <NewFooter/>
        </>
    );
}

export default About;