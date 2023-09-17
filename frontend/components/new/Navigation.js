import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import {URL} from "../URL";
import {CartContext} from "../../CartContext";

import Logo from "./Logo";
import load from "load-script";

const Navigation = (props) => {
    let navigate = useNavigate();

    let {cart, setCart, cartCount, setCartCount} = useContext(CartContext);

    let [loading, setLoading] = useState(true);
    let [loggedIn, setLoggedIn] = useState(false);
    let [categorylist, setCategoryList] = useState([]);

    function ToTop() {
        window.scrollTo(0, 0);
    }

    function getCategoryList(){
        axios.get(`${URL}get-category`)
            .then(res => {
               setCategoryList(res.data)
                // console.log(res.data)
            }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getCategoryList();
        ToTop();
        axios.get(`${URL}users/check-login`)
            .then(res => {
                if (res.status === 200 && res.statusText === "OK") {
                    if (res.data === 'notLogged') {
                        setLoggedIn(false);
                    } else {
                        setLoggedIn(true);
                    }
                }
            }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <>
            <div className="header-top-menu sticky4 mt-40 sticker">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        {/* LOGO */}
                        <div className="col-lg-3 col-md-4 col-4">
                            <div className="logo">
                                <a href="index.html">
                                    {/*<img src="assets/img/logo/logo-sinrato.png"*/}
                                    {/*     alt="brand-logo"/>*/}
                                    <img src={props.logo}
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
                                            <li><Link to="/">Home</Link></li>

                                            {
                                                categorylist.length > 0?
                                                categorylist.map((row,index)=>{
                                                    return (
                                                        <>
                                                            <li><Link to={"/subcategorypage/"+row.categoryid}>{row.categoryname}</Link></li>
                                                        </>
                                                    );
                                                }) : ""
                                            }
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
                                        <Link className="ha-toggle" to="/cart">
                                            <span className="lnr lnr-cart"></span>
                                            <span className="count">
                                                <span className="cart-count">{cartCount > 0 ? cartCount : 0}</span>
                                            </span>
                                        </Link>
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

export default Navigation;