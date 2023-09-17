import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {URL} from "./URL";

import Logo from "./new/Logo";
import load from "load-script";

function AdminNavigation({logo}) {
    let navigate = useNavigate();

    // Check Admin Logged-In
    const checkLogin = () => {
        axios.get(`${URL}admin/check-login`)
            .then(res => {
                if (res.status === 200 && res.statusText === "OK") {
                    if (res.data === 'notLogged') {
                        navigate('/admin-login');
                    } else {

                    }
                }
            }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        checkLogin();
        ToTop();
    }, []);

    // LOGOUT ACTION
    const logout = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure to logout?',
            // text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`${URL}admin/logout`).then(res => {
                    // console.log(res.data);

                    if (res.status === 200 && res.statusText === "OK") {
                        if (res.data === 'loggedOut') {
                            navigate('/admin-login');
                        }
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        })
    }

    function ToTop() {
        window.scrollTo(0, 0);
    }

    return (
        <>
            <div className="header-top-menu sticky4 mt-40 sticker">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        {/* LOGO */}
                        <div className="col-lg-3 col-md-4 col-4">
                            <div className="logo">
                                <a href="index.html">
                                    <img src="../assets/img/logo/logo-sinrato.png"
                                         alt="brand-logo"/>
                                </a>
                            </div>
                        </div>

                        {/* LINKS */}
                        <div className="col-lg-8 d-none d-lg-flex">
                            <div className="top-main-menu menu-style4">
                                <div className="main-menu">
                                    <nav id="mobile-menu">
                                        <ul>
                                            <li><Link to="/admin/dashboard">Home</Link></li>

                                            <li>
                                                <a href="#">Manage<span className="lnr lnr-chevron-down"></span></a>
                                                <ul className="dropdown">
                                                    <li><Link to="/admin/manage-category">Category</Link></li>
                                                    <li><Link to="/admin/manage-sub-category">Sub-Category</Link></li>
                                                    <li><Link to="/admin/manage-product">Products</Link></li>
                                                </ul>
                                            </li>

                                            <li><Link to="/admin/manage-orders">Orders</Link></li>

                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>

                        {/* CART */}
                        <div className="col-lg-1 col-md-8 col-8">
                            <div className="mini-cart-option cart-mini4">
                                <ul>
                                    <li className="my-cart cart-h4">
                                        {/*<a className="ha-toggle" href="#">*/}
                                        {/*    <span className="lnr lnr-cart"></span>*/}
                                        {/*    <span className="count">*/}
                                        {/*<span className="cart-count">{cartCount > 0 ? cartCount : 0}</span>*/}
                                        {/*</span>*/}
                                        {/*</a>*/}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-12 d-block d-lg-none">
                            <div className="mobile-menu"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-middle header-style4"></div>
        </>
    );
}

export default AdminNavigation;