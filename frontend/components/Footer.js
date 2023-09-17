import {useState} from "react";
import {Link} from "react-router-dom";

function Footer() {
    let [quantity, setQuantity] = useState(1);

    function increaseQty() {
        // console.log(quantity);

        if (quantity < 5) {
            setQuantity(quantity + 1);
        }
    }

    function descreaseQty() {
        // console.log(quantity);

        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <>
            {/*<Link to="#" className="back-to-top" id="backToTop">*/}
            {/*<i className="fal fa-angle-double-up"></i>*/}
            {/*</Link>*/}

            {/* FOOTER */}
            <footer className="sigma-footer">
                <div className="sigma-footer-top">
                    <div className="container-fluid">
                        <div className="row no-gutters">
                            <div className="col-lg-8">

                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="sigma-backto-top">
                                            {/*<Link to="#" className="back-to-top" id="backToTop">*/}
                                            {/*    <i className="fal fa-chevron-up"></i>*/}
                                            {/*    Back to Top*/}
                                            {/*</Link>*/}
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="h-100 d-flex align-items-center justify-content-end">
                                            {/*<select>*/}
                                            {/*    <option>English</option>*/}
                                            {/*    <option>Español</option>*/}
                                            {/*</select>*/}
                                            {/*<select>*/}
                                            {/*    <option>USD</option>*/}
                                            {/*    <option>GBP</option>*/}
                                            {/*    <option>INR</option>*/}
                                            {/*</select>*/}
                                        </div>
                                    </div>
                                </div>

                                <div className="sigma-footer-box">
                                    <div className="sigma-footer-box-top">
                                        <div className="ft-logo">
                                            <Link to="/">
                                                <img src="/assets/img/logo.png" alt="Logo"/>
                                            </Link>
                                        </div>
                                        <ul className="ft-social-media">
                                            <li>
                                                <Link to="#">
                                                    <i className="fab fa-facebook-f"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fab fa-instagram"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fab fa-twitter"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="sigma-footer-nav">
                                        <ul className="ft-nav">
                                            <li className="menu-item">
                                                <Link to="index-2.html">
                                                    Home
                                                </Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link to="about.html">
                                                    About Us
                                                </Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link to="blog-grid.html">
                                                    News
                                                </Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link to="gallery.html">
                                                    Gallery
                                                </Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link to="contact.html">
                                                    Contact
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="contact-maps">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d790.0696625396289!2d74.87366601158567!3d31.636607038080665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39196357d4fdd50f%3A0xbc63a447f674b0e9!2sVMM%20Education!5e0!3m2!1sen!2sin!4v1645101037841!5m2!1sen!2sin"
                                        style={{width: "100%", height: "100%"}}
                                        loading="lazy"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sigma-footer-bottom">
                    <div className="container-fluid">
                        <div className="sigma-footer-bottom-inner">
                            <div className="row no-gutters align-items-end">
                                <div className="col-lg-6">
                                    <div className="sigma-footer-contact">
                                        <ul>
                                            <li>
                                                <i className="flaticon-phone"></i>
                                                <a href="tel:"><span>Phone Number</span> +91 1234567898</a>
                                            </li>
                                            <li>
                                                <i className="flaticon-message"></i>
                                                <a href="mailto:"><span>Email Address</span> demo@email.com</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="sigma-footer-search">
                                        <form>
                                            {/*<div className="input-group">*/}
                                            {/*    <div className="input-group-prepend">*/}
                                            {/*        <button><i className="fal fa-search"></i></button>*/}
                                            {/*    </div>*/}
                                            {/*    <input type="text" name="#" className="form-control"*/}
                                            {/*           placeholder="Search..."/>*/}
                                            {/*</div>*/}
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="sigma-footer-contact style-2">
                                        <ul>
                                            <li>
                                                <i className="flaticon-location-pin"></i>
                                                <a href="#"><span>Office Address</span> 14/A, Miranda City, NYC</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sigma-copyright">
                    <div className="container-fluid">
                        <div className="sigma-copyright-inner">
                            <div className="row">
                                <div className="col-lg-6 col-md-5 order-2 order-md-1">
                                    <p className="sigma-copyright-text">Copyright By@<a href="#">Example</a> - 2022</p>
                                </div>
                                <div className="col-lg-6 col-md-7 order-1 order-md-2">
                                    <div className="sigma-copyright-menu">
                                        <ul>
                                            <li>
                                                <a href="#">Terms of use</a>
                                            </li>
                                            <li>
                                                <a href="#">Privacy Environmental Policy</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* //FOOTER */}

            {/*Quick View Modal Start*/}
            <div className="modal fade quick-view-modal" id="quickViewModal" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="close-btn" data-dismiss="modal">
                                <a href="#" className="remove">
                                    <i className="fal fa-times"></i>
                                </a>
                            </div>

                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-5">
                                        <div className="shop-detail-image">
                                            <img src="assets/img/shop/detail-1.png" className="img-fluid" alt="img"/>
                                        </div>
                                    </div>

                                    <div className="col-lg-7">
                                        <div className="shop-detail-content">
                                            <h3 className="product-title mb-20">Handmade Golden Ring</h3>

                                            <div className="desc mb-20 pb-20 border-bottom">
                                                <span className="price">$390 <span>$480</span></span>
                                            </div>

                                            <div className="mt-20 mb-20">
                                                <div className="d-inline-block other-info">
                                                    <h6>Availability:
                                                        <span className="text-success ml-2">In Stock</span>
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className="short-descr mb-20">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                    eiusmod tempor</p>
                                            </div>

                                            <div className="quantity-cart d-block d-sm-flex">
                                                <div className="quantity-box">
                                                    {/*<button type="button" className="minus-btn">*/}
                                                    <button onClick={descreaseQty}
                                                            type="button"
                                                            className="minus-btn">
                                                        <i className="fal fa-minus"></i>
                                                    </button>

                                                    <input readOnly
                                                           type="text"
                                                           className="input-qty"
                                                           name="name"
                                                        // value="1"/>
                                                           value={quantity}/>

                                                    {/*<button type="button" className="plus-btn">*/}
                                                    <button onClick={increaseQty}
                                                            type="button"
                                                            className="plus-btn">
                                                        <i className="fal fa-plus"></i>
                                                    </button>
                                                </div>
                                                <div className="cart-btn pl-40">
                                                    <Link to="#" className="main-btn btn-border">Add to Cart</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* //Quick View Modal Start*/}
        </>
    );
}

export default Footer;