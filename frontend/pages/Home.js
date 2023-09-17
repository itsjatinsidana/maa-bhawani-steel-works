import {Link} from "react-router-dom";
import axios from "axios";
import {useState, useEffect} from "react";

import ProductCard from "../components/ProductCard";
import {URL} from "../components/URL";
import {LoadingScreen} from "../components/ReactLoadingAnimation";
import load from "load-script";
import Swal from "sweetalert2";

// NEW
import TopHeader from "../components/new/TopHeader";
import NewNavigation from "../components/new/Navigation";
import Banner from "../components/new/Banner";
import NewFooter from "../components/new/NewFooter";
import AfterFooter from "../components/AfterFooter";

function Home(props) {
    let [products, setProducts] = useState([]);
    // let [loading, setLoading] = useState(true);
    let [loading, setLoading] = useState(false);

    let FetchAPI = async () => {
        await axios.post(`${URL}view-products`, {
            action: "home"
        }).then(res => {
            setProducts(res.data);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }).catch(err => {
            console.log(err);
        });
    }

    function PageTitle() {
        document.title = "Home";
    }

    useEffect(async () => {
        await FetchAPI();
        await PageTitle();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        document.getElementById('subscribe').reset();
        Swal.fire({
            icon: "success",
            title: "Thank You"
        })
    }



     return (
            <>
                <header className="header-pos mb-40">
                    <TopHeader/>

                    <NewNavigation logo="assets/img/logo/logo-sinrato.png"/>
                </header>

                <Banner/>

                {/* After Slider */}
                <div className="banner-statics mt-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-4 col-md-4">
                                <div className="single-banner-statics">
                                    <a href="assets/img/banner/gate4edit.jpeg">
                                        <img src="assets/img/banner/gate4edit.jpeg" alt=" "/>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="single-banner-statics">
                                    <a href="assets/img/banner/gate2.jpeg">
                                        <img src="assets/img/banner/gate2.jpeg" alt=""/>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="single-banner-statics">
                                    <a href="assets/img/banner/gate3.jpeg">
                                        <img src="assets/img/banner/gate3.jpeg" alt=""/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Card */}
                <div className="main-wrapper pt-35">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="product-shop-main-wrapper mb-50">
                                    <div className="shop-baner-img mb-70">
                                        {/*<a href="#"><img src="assets/img/banner/category-image.jpg" alt=""/></a>*/}
                                    </div>

                                    {
                                        loading ?
                                            <>
                                                <div style={{height: "400px"}}>
                                                    <div style={{
                                                        display: "grid",
                                                        alignContent: "center",
                                                        justifyContent: "center"
                                                    }}>
                                                        <LoadingScreen type="spokes" color="#fcd462"/>
                                                        <p>loading...</p>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <>
                                                {
                                                    products.length > 0
                                                        ?
                                                        <>
                                                            <div className="shop-product-wrap grid row">
                                                                {

                                                                    products.map((product) => {
                                                                        return (
                                                                            <ProductCard key={product.productid}
                                                                                         details={product}/>
                                                                        );
                                                                    })
                                                                }
                                                            </div>

                                                            <div className="text-center">
                                                                <Link to="products"
                                                                      className="btn btn-secondary">
                                                                    More Products
                                                                </Link>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <div className="text-center p-5 alert alert-danger">No
                                                                Products
                                                                Found
                                                            </div>
                                                        </>
                                                }
                                            </>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Brands */}
                {/*<div className="brand-area-home2 pt-30 pb-70">*/}
                {/*    <div className="container">*/}
                {/*        <div className="row">*/}
                {/*            <div className="col-lg-2">*/}

                {/*                    <h3><Link to={"/about"}></Link></h3>*/}
                {/*                */}
                {/*            </div>*/}
                {/*            <div className="col-lg-2">*/}
                {/*                <div className="single-brand-logo">*/}
                {/*                    <a href="#"><img src="assets/img/brand/brand2.png" alt=""/></a>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-2">*/}
                {/*                <div className="single-brand-logo">*/}
                {/*                    <a href="#"><img src="assets/img/brand/brand3.png" alt=""/></a>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-2">*/}
                {/*                <div className="single-brand-logo">*/}
                {/*                    <a href="#"><img src="assets/img/brand/brand4.png" alt=""/></a>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-2">*/}
                {/*                <div className="single-brand-logo">*/}
                {/*                    <a href="#"><img src="assets/img/brand/brand5.png" alt=""/></a>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-2">*/}
                {/*                <div className="single-brand-logo">*/}
                {/*                    <a href="#"><img src="assets/img/brand/brand6.png" alt=""/></a>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <hr/>
                <section className="contact-style-2 pt-30 pb-35">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="contact2-title text-center mb-65">
                                    <h2>about us</h2>
                                    <br/>
                                    <h4> A firm from last 25 years manufacturing iron,steel and aluminium gates,
                                        grills,railings and much more.</h4>
                                    <h6>The Main Aim Is To Build Up The Trust By Providing Good Quality And Fulfilling
                                        The Requirement Of The Customers.</h6>
                                    <br/>
                                    <h4>we deal with:- <br/>
                                        *iron gate<br/>
                                        *steel gate<br/>
                                        * aluminium gate<br/>
                                        *automated sliding gate<br/>
                                        *sliding gate</h4>
                                    <br/>
                                    <h6> A firm from last 25 years manufacturing iron, steel and aluminium gates, bottom
                                        sliding gates,automatic sliding gates, grills roilings and much more.<br/>All
                                        products are of good quality by using supremegrade factor inputs and most
                                        advanced technology.
                                        <br/>We offered these products in different size and dimensions. The offered
                                        products are tested in gainest various parameters and maintain the ongoing
                                        market trends.</h6>

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
                <hr/>
                <section className="contact-style-2 pt-30 pb-35">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="contact2-title text-center mb-65">
                                    <h2>contact us</h2>
                                    <p> Claritas est etiam processus dynamicus, Maria Denardo is the Fashion Director at
                                        theFashionSpot<br/>mutationem consuetudium lectorum.</p>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="contact-single-info mb-30 text-center">
                                    <div className="contact-icon">
                                        <i className="fa fa-map-marker"></i>
                                    </div>
                                    <h3>address street</h3>
                                    <p>Address : 22 No, Phatak Rd, Opp. Khalsa College For Women, Guru Arjun Nagar,
                                        Putligarh, Amritsar, Punjab 143001.</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="contact-single-info mb-30 text-center">
                                    <div className="contact-icon">
                                        <i className="fa fa-phone"></i>
                                    </div>
                                    <h3>number phone</h3>
                                    <p>Phone 1: 98762-71597<br/>Phone 2: 98152-71597</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="contact-single-info mb-30 text-center">
                                    <div className="contact-icon">
                                        <i className="fa fa-fax"></i>
                                    </div>
                                    <h3>number fax</h3>
                                    <p>Fax 1: 0(1234) 567 89012<br/>Fax 2: 0(987) 567 890</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="contact-single-info mb-30 text-center">
                                    <div className="contact-icon">
                                        <i className="fa fa-envelope"></i>
                                    </div>
                                    <h3>address email</h3>
                                    <p>jatinsadana1998@gmail.com<br/>maabhawani@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </section>
                <div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.0845261108184!2d74.83725991496992!3d31.631535981332956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391964ce25c3fbef%3A0xd2630ce66c89accc!2sMaa%20Bhawani%20Steel%20Works!5e0!3m2!1sen!2sin!4v1653637351072!5m2!1sen!2sin"
                        width={1600} height={600} style={{border: 0}} allowFullScreen loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"/>
                </div>

                <NewFooter/>
            </>
        );

}


export default Home;