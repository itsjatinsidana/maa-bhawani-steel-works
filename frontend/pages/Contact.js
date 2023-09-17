import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

// NEW
import TopHeader from "../components/new/TopHeader";
import NewNavigation from "../components/new/Navigation";
import BreadCrumb from "../components/new/BreadCrumb";
import NewFooter from "../components/new/NewFooter";
import load from "load-script";
import AfterFooter from "../components/AfterFooter";
import Swal from "sweetalert2";

function Contact() {
    useEffect(() => {
        document.title = "Contact Us";
    });

    let [name, setName] = useState("");
    let [phone, setPhone] = useState("");
    let [email, setEmail] = useState("");
    let [subject, setSubject] = useState("");
    let [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (name && email && message) {
            document.getElementById('contact').reset();
            alert('Message Submitted');
        // } else {
        //     Swal.fire({
        //         icon: "warning",
        //         title: "All fields are required."
        //     })
        // }

    }

    return (
        <>
            <header className="header-pos mb-40">
                <TopHeader/>

                <NewNavigation logo="assets/img/logo/logo-sinrato.png" />
            </header>

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
                                <p>Address : No 40 Baria Sreet<br/>NewYork City, United States.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="contact-single-info mb-30 text-center">
                                <div className="contact-icon">
                                    <i className="fa fa-phone"></i>
                                </div>
                                <h3>number phone</h3>
                                <p>Phone 1: 0(1234) 567 89012<br/>Phone 2: 0(987) 567 890</p>
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
                                <p>info@roadthemes.com<br/>yourname@roadthemes.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="contact-two-area pt-60 pb-70">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="contact2-title text-center mb-60">
                                <h2>tell us your project</h2>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="contact-message">
                                <form onSubmit={handleSubmit} id="contact-form" className="contact-form">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <input onChange={(e) => setName(e.target.value)} name="first_name"
                                                   placeholder="Name *" type="text"/>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <input onChange={(e) => setPhone(e.target.value)} name="phone"
                                                   placeholder="Phone *" type="text"/>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <input onChange={(e) => setName(e.target.value)} name="email_address"
                                                   placeholder="Email *" type="text"/>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <input onChange={(e) => setSubject(e.target.value)} name="contact_subject"
                                                   placeholder="Subject *" type="text"/>
                                        </div>
                                        <div className="col-12">
                                            <div className="contact2-textarea text-center">
                                                <textarea onChange={(e) => setName(e.target.value)}
                                                          placeholder="Message *" name="message"
                                                          className="form-control2" required=""></textarea>
                                            </div>
                                            <div className="contact-btn text-center">
                                                <button className="btn btn-secondary" type="submit">
                                                    Send Message
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <NewFooter/>
        </>
    );
}
export default Contact;