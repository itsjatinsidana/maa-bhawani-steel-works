import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

import {URL} from "../components/URL";

// NEW
import TopHeader from "../components/new/TopHeader";
import NewNavigation from "../components/new/Navigation";
import BreadCrumb from "../components/new/BreadCrumb";
import NewFooter from "../components/new/NewFooter";
import load from "load-script";
import AfterFooter from "../components/AfterFooter";

function UserSignup() {
    useEffect(() => {
        document.title = "User Signup";
    }, []);

    let [formInputs, setFormInputs] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
        name: '',
        mobile: '',
        address: ''
    });

    // Handle Form Inputs...
    const handle_Inputs = (e) => {
        let key = e.target.name;
        formInputs[key] = e.target.value;
        setFormInputs(formInputs);
    }

    // Signup Action
    const handle_Signup = () => {
        let {username, email, password, confirmpassword, name, mobile, address} = formInputs;

        if (username && email && password && confirmpassword && name && mobile && address) {
            if (password !== confirmpassword) {
                Swal.fire({
                    text: "Password & Confirm Password must be same.",
                    icon: 'warning',
                });
            } else {
                axios.post(`${URL}user-signup`, {
                    username, email, password, confirmpassword, name, mobile, address
                }).then(res => {
                        if (res.status === 200 && res.statusText === "OK") {
                            if (res.data === 'success') {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'User Registration Done',
                                });

                                document.getElementById('signup-form').reset();

                                setFormInputs({
                                    username: '',
                                    email: '',
                                    password: '',
                                    confirmpassword: '',
                                    name: '',
                                    mobile: '',
                                    address: ''
                                });
                            } else if (res.data === 'notmatched') {
                                Swal.fire({
                                    text: "Password & Confirm Password must be same.",
                                    icon: 'warning'
                                });
                            } else {
                                Swal.fire({
                                    title: "Username already exist.",
                                    icon: 'error',
                                });
                            }
                        }
                    }
                ).catch(err => {
                    console.log(err);
                })
            }
        } else {
            Swal.fire({
                title: 'All Fields Are Required.',
                icon: 'warning',
            });
        }
    }

    return (
        <>


            <header className="header-pos mb-40">
                <TopHeader/>

                <NewNavigation logo="assets/img/logo/logo-sinrato.png" />
            </header>

            <BreadCrumb title="Login"/>

            <div className="login-wrapper pb-70">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">

                            <main id="primary" className="site-main">
                                <div className="user-login">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="section-title text-center">
                                                <h3> Create an Account</h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8 offset-xl-2">
                                            <div className="registration-form login-form">
                                                <form id="signup-form">
                                                    <div className="login-info mb-20">
                                                        <p>Already have an account?
                                                            <Link className="text-primary" to="/user-login">Log in
                                                                instead!</Link></p>
                                                    </div>

                                                    <div className="">
                                                        <div className="row">
                                                            <div className="col-lg-6 form-group">
                                                                <div className="ui left icon input field w-100">
                                                                    <label className="form-check-label">Username
                                                                        *</label>
                                                                    <input onChange={handle_Inputs} type="text"
                                                                           name="username"
                                                                           id="username" className="form-control"
                                                                           required/>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 form-group">
                                                                <div className="ui left icon input field w-100">
                                                                    <label className="form-check-label">Full Name
                                                                        *</label>
                                                                    <input onChange={handle_Inputs} type="text"
                                                                           name="name"
                                                                           id="name" className="form-control"
                                                                           required/>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 form-group">
                                                                <div className="ui left icon input w-100 field">
                                                                    <label className="form-check-label">Password
                                                                        *</label>
                                                                    <input onChange={handle_Inputs} type="password"
                                                                           id="password"
                                                                           name="password" className="form-control"
                                                                           required/>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 form-group">
                                                                <div className="ui left icon input w-100 field">
                                                                    <label className="form-check-label">Confirm Password
                                                                        *</label>
                                                                    <input onChange={handle_Inputs} type="password"
                                                                           id="confirmpassword"
                                                                           name="confirmpassword"
                                                                           className="form-control"
                                                                           required/>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 form-group">
                                                                <div className="ui left icon input w-100 field">
                                                                    <label className="form-check-label">Email *</label>
                                                                    <input onChange={handle_Inputs} type="email"
                                                                           name="email"
                                                                           id="email" className="form-control"
                                                                           required/>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 form-group">
                                                                <div className="ui left icon input w-100 field">
                                                                    <label className="form-check-label">Mobile Number
                                                                        *</label>
                                                                    <input onChange={handle_Inputs} type="tel"
                                                                           name="mobile"
                                                                           id="mobile" className="form-control"
                                                                           required/>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-12 form-group">
                                                                <label className="form-check-label">Address *</label>
                                                                <textarea onChange={handle_Inputs}
                                                                          style={{minHeight: "80px"}}
                                                                          className="form-control" name="address"
                                                                          id="address"
                                                                          required/>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="register-box d-flex justify-content-end mt-20">
                                                        <button className="btn btn-secondary"
                                                                onClick={handle_Signup}
                                                                type="button">Sign Up
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </main>
                        </div>
                    </div>
                </div>
            </div>

            <NewFooter/>
        </>
    );
}

export default UserSignup;