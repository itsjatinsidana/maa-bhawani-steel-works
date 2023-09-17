import {Link} from "react-router-dom";

const NewFooter = () => {
    function ToTop() {
        window.scrollTo(0, 0);
    }

    return (
        <>
            <div className="scroll-top not-visible" onClick={ToTop}>
                <i className="fa fa-angle-up"></i>
            </div>


            <footer>
                {/*<div className="newsletter-group">*/}
                {/*    <div className="container-fluid">*/}
                {/*        <div className="row">*/}
                {/*            <div className="col-lg-12">*/}
                {/*                <div className="newsletter-box">*/}
                {/*                    <div className="newsletter-inner">*/}
                {/*                        <div className="newsletter-title">*/}
                {/*                            <h3>Sign Up For Newsletters</h3>*/}
                {/*                            <p>Be the First to Know. Sign up for newsletter today</p>*/}
                {/*                        </div>*/}
                {/*                        <div className="newsletter-box">*/}
                {/*                            <form id="mc-form">*/}
                {/*                                <input type="email" id="mc-email" autoComplete="off"*/}
                {/*                                       className="email-box" placeholder="enter your email"/>*/}
                {/*                                    <button className="newsletter-btn" type="submit"*/}
                {/*                                            id="mc-submit">subscribe !*/}
                {/*                                    </button>*/}
                {/*                            </form>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div className="link-follow">*/}
                {/*                        <a href="https://www.facebook.com/"><i className="fa fa-facebook"></i></a>*/}
                {/*                        <a href="https://plus.google.com/discover"><i className="fa fa-google-plus"></i></a>*/}
                {/*                        <a href="https://twitter.com/"><i className="fa fa-twitter"></i></a>*/}
                {/*                        <a href="https://www.youtube.com/"><i className="fa fa-youtube"></i></a>*/}
                {/*                    </div>*/}
                {/*                </div>*/}

                {/*                <div className="mailchimp-alerts">*/}
                {/*                    <div className="mailchimp-submitting"></div>*/}
                {/*                    <div className="mailchimp-success"></div>*/}
                {/*                    <div className="mailchimp-error"></div>*/}
                {/*                </div>*/}

                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="footer-top pt-50 pb-50">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="footer-single-widget">
                                    <div className="widget-title">
                                        <div className="footer-logo mb-30">
                                            <a href="index.html">
                                                <img src="assets/img/logo/logo-sinrato.png" alt=""/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="widget-body">
                                        <p>We are a team of designers and developers that create high quality iron,steel and aluminium gates,grills,railings and much more.</p>
                                        <div className="payment-method">
                                            <h4>payment</h4>
                                            <img src="assets/img/payment/payment.png" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-6 col-sm-6">
                                <div className="footer-single-widget">
                                    <div className="widget-title">
                                        <h4>Information</h4>
                                    </div>
                                    <div className="widget-body">
                                        <div className="footer-useful-link">
                                            <ul>
                                                <li><Link to="/about">about us</Link></li>
                                                {/*<li><a href="#">Delivery Information</a></li>*/}
                                                {/*<li><a href="#">Privacy Policy</a></li>*/}
                                                {/*<li><a href="#">Terms & Conditions</a></li>*/}
                                                {/*<li><a href="#">Contact Us</a></li>*/}
                                                {/*<li><a href="#">Returns</a></li>*/}
                                                {/*<li><a href="#">Site Map</a></li>*/}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="footer-single-widget">
                                    <div className="widget-title">
                                        <h4>contact us</h4>
                                    </div>
                                    <div className="widget-body">
                                        <div className="footer-useful-link">
                                            <ul>
                                                <li><span>Address:</span> 22 No, Phatak Rd, Opp. Khalsa College For Women, Guru Arjun Nagar, Putligarh, Amritsar, Punjab 143001.
                                                </li>
                                                <li><span>email:</span> jatinsadana1998@gmail.com</li>
                                                <li><span>Call us:</span> <strong>98762-71597</strong></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="footer-single-widget">
                                    <div className="widget-title">
                                        <h4>Our Twitter Feed</h4>
                                    </div>
                                    <div className="widget-body">
                                        <div className="twitter-article">
                                            <div className="twitter-text">
                                                Check out "Alice - Multipurpose Responsive #Magento #Theme" on #Envato
                                                by <a href="#">@maabhawanisteels</a> #latestgates <a
                                                href="#">https://t.co/DNdhAwzm88</a>
                                                <span className="tweet-time"><i className="fa fa-twitter"></i><a
                                                    href="#">30 sep</a></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="footer-bottom-content">
                                    <div className="footer-copyright">
                                        <p>&copy; 2022 <b>Maa Bhawani Steel Works</b>
                                            {/*Made with <i*/}
                                            {/*className="fa fa-heart text-danger"></i> by <a*/}
                                            {/*href="https://hasthemes.com/"><b>HasThemes</b></a>*/}
                                    </p>
                                    </div>
                                    <div className="footer-custom-link">
                                        <a href="#">Brands</a>
                                        <a href="#">Specials</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default NewFooter;