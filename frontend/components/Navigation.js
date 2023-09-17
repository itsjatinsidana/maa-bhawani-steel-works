import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import {URL} from "./URL";

import {CartContext} from "../CartContext";

function Navigation() {
    let navigate = useNavigate();

    let {cart, setCart, cartCount, setCartCount} = useContext(CartContext);

    let [category, setCategory] = useState([]);
    let [subCategory, setSubCategory] = useState([]);
    let [loading, setLoading] = useState(true);

    // Get Category
    let FetchAPI = async () => {
        await axios.get(`${URL}get-category`)
            .then(res => {
                // console.log(res.data);

                setCategory(res.data);
                // setTimeout(() => {
                // setLoading(false);
                // }, 1000);

            }).catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        FetchAPI();
        ToTop();
        checkLogin();
    }, []);

    // Get Sub-Category
    let FetchSubCategory = async (id) => {
        // console.log(id);

        await axios.post(`${URL}get-sub-category`, {
            id: id
        }).then(res => {
            // console.log(res.data);

            setSubCategory(res.data);
            // setTimeout(() => {
            //     setLoading(false);
            // }, 500);
        }).catch(err => {
            console.log(err);
        });
    }

    function goToCart() {
        navigate('/cart');
    }

    function hoverFun(index, e) {
        if (index === 0) {
            e.target.style.cursor = "default";
        }
    }

    function ToTop() {
        window.scrollTo(0, 0);
    }

    let [loggedIn, setLoggedIn] = useState(false);

    // Check User Login
    const checkLogin = () => {
        axios.get(`${URL}users/check-login`)
            .then(res => {
                // console.log(res.data);

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
    }

    return (
        <>
            {/*HEADER START*/}
            <header className="header-three header-absolute sticky-header sigma-header">
                {/* header top */}
                <div className="header-top">
                    <div className="container-fluid container-custom-three">
                        <div className="d-md-flex align-items-center justify-content-between">
                            <p className="welcome-text">Free Shipping On All Domestic Orders</p>
                            <ul className="header-top-info">
                                <li>
                                    <i className="fal fa-Clock"> </i>
                                    Mon - Sat 9.00 - 18.00
                                </li>
                                <li>
                                    <i className="fal fa-Clock"> </i>
                                    Mon - Sat 9.00 - 18.00
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* //Header top */}

                {/* Desktop Menu Start*/}
                <div className="main-menu-area sticky-header">
                    <div className="container-fluid container-custom-three">
                        <div className="nav-container d-flex align-items-center justify-content-between">
                            {/* Site Logo */}
                            <div className="site-logo site-logo-text">
                                <Link to="/">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         version="1.1" width="45" height="45" x="0"
                                         y="0"
                                         viewBox="0 0 512 512" className="">
                                        <path
                                            d="M369.853,250.251l-100-241C267.53,3.65,262.062,0,255.999,0s-11.531,3.65-13.854,9.251l-100,241    c-1.527,3.681-1.527,7.817,0,11.498l100,241c2.323,5.601,7.791,9.251,13.854,9.251s11.531-3.65,13.854-9.251l100-241    C371.381,258.068,371.381,253.932,369.853,250.251z M255.999,457.861L172.239,256l83.76-201.861L339.759,256L255.999,457.861z"
                                            fill="#ffffff"/>
                                        <path className="diamond-spark spark-1"
                                              d="M139.606,118.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C145.465,133.748,145.465,124.25,139.606,118.393z"
                                              fill="#ffffff"/>
                                        <path className="diamond-spark spark-2"
                                              d="M456.607,55.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394l63-63C462.465,70.748,462.465,61.25,456.607,55.393z"
                                              fill="#ffffff"/>
                                        <path className="diamond-spark spark-3"
                                              d="M139.606,372.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    C58.322,459.535,62.16,461,65.999,461s7.678-1.465,10.607-4.394l63-63C145.465,387.748,145.465,378.25,139.606,372.393z"
                                              fill="#ffffff"/>
                                        <path className="diamond-spark spark-4"
                                              d="M456.607,435.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C462.465,450.748,462.465,441.25,456.607,435.393z"
                                              fill="#ffffff"/>
                                    </svg>
                                    <div className="site-logo-text">
                                        <h3>Laramiss</h3>
                                        <h6>Luxury Pieces</h6>
                                    </div>
                                </Link>
                            </div>
                            {/* //Site Logo */}

                            {/* Main Menu */}
                            <div className="nav-menu d-lg-flex align-items-center justify-content-between">
                                {/*Navbar Close Icon*/}
                                <div className="navbar-close">
                                    <div className="cross-wrap">
                                        <span className="top"></span>
                                        <span className="bottom"></span>
                                    </div>
                                </div>

                                {/* Menu Items*/}
                                <div className="sigma-header-nav">
                                    <div className="container">
                                        <div className="sigma-header-nav-inner">
                                            <nav>
                                                <ul className="sigma-main-menu">
                                                    {/*Home*/}
                                                    <li className="menu-item menu-item-has-children">
                                                        <Link to="/">
                                                            Home
                                                        </Link>
                                                        <ul className="sub-menu">
                                                            <li className="menu-item">
                                                                <Link to="/">
                                                                    Home
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </li>

                                                    {/* Category */}
                                                    <li className="menu-item menu-item-has-children menu-item-has-megamenu">
                                                        <Link to="#">
                                                            Categories
                                                        </Link>
                                                        <div className="sub-menu">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col-lg-3">
                                                                        <ul className="sigm-megamenu-nav nav nav-tabs">
                                                                            {
                                                                                category.map((cat, index) => {
                                                                                    return (
                                                                                        <li onClick={() => FetchSubCategory(cat.categoryid)}
                                                                                            key={cat.categoryid}
                                                                                            onMouseEnter={(e) => hoverFun(index, e)}
                                                                                            className="nav-item">
                                                                                            <a href={"#tab" + cat.categoryid}
                                                                                               className={index === 0 ? "nav-link active" : "nav-link"}
                                                                                               data-toggle="tab">
                                                                                                {/*<i className="fal fa-rings-wedding"></i>*/}

                                                                                                {
                                                                                                    index === 0 ?
                                                                                                        <h4>
                                                                                                            <u>Categories</u>
                                                                                                        </h4>
                                                                                                        :
                                                                                                        cat.categoryname
                                                                                                }
                                                                                            </a>
                                                                                        </li>
                                                                                    );
                                                                                })
                                                                            }
                                                                        </ul>
                                                                    </div>

                                                                    <div className="col-lg-9">
                                                                        <div className="tab-content">
                                                                            {
                                                                                category.map((cat, index) => {
                                                                                    return (
                                                                                        <div key={cat.categoryid}
                                                                                             className={index === 0 ? "tab-item show active" : "tab-item"}
                                                                                             id={"tab" + cat.categoryid}>
                                                                                            <div className="row">
                                                                                                {
                                                                                                    index === 0 ?
                                                                                                        <>
                                                                                                            <div
                                                                                                                className="col-lg-12 mt-5">
                                                                                                                <h4 className="sigma-title">
                                                                                                                    Select
                                                                                                                    Any
                                                                                                                    Category
                                                                                                                </h4>
                                                                                                            </div>

                                                                                                            <div
                                                                                                                className="col-lg-8">
                                                                                                                <div
                                                                                                                    className="sigma-megamenu-navbox menu-item-has-children">
                                                                                                                    <ul className="sub-menu">
                                                                                                                        <li className="menu-item">
                                                                                                                            {/*<Link to="#">&nbsp;</Link>*/}
                                                                                                                        </li>
                                                                                                                    </ul>
                                                                                                                </div>
                                                                                                            </div>

                                                                                                            <div
                                                                                                                className="col-lg-4">
                                                                                                                <div
                                                                                                                    className="sigma-megamenu-img">
                                                                                                                    {/*<a href="#">*/}
                                                                                                                    <img
                                                                                                                        src="/assets/img/others/01.png"
                                                                                                                        alt="img"/>
                                                                                                                    {/*</a>*/}
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </>
                                                                                                        :
                                                                                                        <>
                                                                                                            <div
                                                                                                                className="col-lg-12 mt-5">
                                                                                                                <h5 className="sigma-title">
                                                                                                                    Types
                                                                                                                    Of&nbsp;&nbsp;{cat.categoryname}
                                                                                                                </h5>
                                                                                                            </div>

                                                                                                            <div
                                                                                                                className="col-lg-4">
                                                                                                                <div
                                                                                                                    className="sigma-megamenu-navbox menu-item-has-children">
                                                                                                                    <ul className="sub-menu">
                                                                                                                        {
                                                                                                                            subCategory.map((subcat, index) => {
                                                                                                                                if (index % 2 === 0) {
                                                                                                                                    return (
                                                                                                                                        <li key={subcat.subcategoryid}
                                                                                                                                            className="menu-item">
                                                                                                                                            <Link
                                                                                                                                                to={`/sub-products/${subcat.subcategoryid}`}>
                                                                                                                                                {subcat.subcategoryname}
                                                                                                                                            </Link>
                                                                                                                                        </li>
                                                                                                                                    );
                                                                                                                                }
                                                                                                                            })
                                                                                                                        }
                                                                                                                    </ul>
                                                                                                                </div>
                                                                                                            </div>

                                                                                                            <div
                                                                                                                className="col-lg-4">
                                                                                                                <div
                                                                                                                    className="sigma-megamenu-navbox menu-item-has-children">
                                                                                                                    <ul className="sub-menu">
                                                                                                                        {
                                                                                                                            subCategory.map((subcat, index) => {
                                                                                                                                if (index % 2 !== 0) {
                                                                                                                                    return (
                                                                                                                                        <li key={subcat.subcategoryid}
                                                                                                                                            className="menu-item">
                                                                                                                                            <Link
                                                                                                                                                to={`/sub-products/${subcat.subcategoryid}`}>
                                                                                                                                                {subcat.subcategoryname}
                                                                                                                                            </Link>
                                                                                                                                        </li>
                                                                                                                                    );
                                                                                                                                }
                                                                                                                            })
                                                                                                                        }
                                                                                                                    </ul>
                                                                                                                </div>
                                                                                                            </div>

                                                                                                            <div
                                                                                                                className="col-lg-4">
                                                                                                                <div
                                                                                                                    className="sigma-megamenu-img">
                                                                                                                    {/*<a href="#">*/}
                                                                                                                    <img
                                                                                                                        src="/assets/img/others/01.png"
                                                                                                                        alt="img"/>
                                                                                                                    {/*</a>*/}
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </>
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    {/* Product */}
                                                    <li className="menu-item menu-item-has-children">
                                                        <Link to="#">
                                                            Products
                                                        </Link>
                                                        <ul className="sub-menu">
                                                            <li className="menu-item">
                                                                <Link to="/products">
                                                                    Products
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </li>

                                                    {/*About*/}
                                                    <li className="menu-item">
                                                        <Link to="/about">
                                                            About
                                                        </Link>
                                                    </li>

                                                    {/*Contact*/}
                                                    <li className="menu-item">
                                                        <Link to="/contact">
                                                            Contact
                                                        </Link>
                                                    </li>

                                                    {/*Blog*/}
                                                    <li className="menu-item menu-item-has-children">
                                                        <Link to="#">
                                                            User
                                                        </Link>
                                                        <ul className="sub-menu">
                                                            <li className="menu-item">
                                                                <Link to="/user-signup">Signup</Link>
                                                            </li>

                                                            <li className="menu-item">
                                                                <Link to="/user-login">Login</Link>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* //Main Menu */}

                            {/* Login, Search, Cart */}
                            <div className="menu-right-buttons">
                                {/* user icon */}
                                <div className="login-btn">
                                    {
                                        loggedIn &&
                                        <Link title={"User Dashboard"} to="/users/dashboard" id="loginBtn">
                                            <i className="fal fa-user"></i>
                                        </Link>
                                    }
                                </div>

                                {/* search button */}
                                <div className="">
                                    <Link title={"Search Product"} to="/search" className="search-icon" id="">
                                        <i className="fal fa-search open-icon"></i>
                                        {/*<i className="fal fa-times close-icon"></i>*/}
                                    </Link>

                                    {/*<div className="search-form">*/}
                                    {/*    <form action="#">*/}
                                    {/*        <input type="text" placeholder="Search your keyword..."/>*/}
                                    {/*        <button type="submit"><i className="far fa-search"></i></button>*/}
                                    {/*    </form>*/}
                                    {/*</div>*/}
                                </div>

                                {/* Off canvas Toggle */}
                                {/*<div className="toggle">*/}
                                {/*    <Link to="#" id="offCanvasBtn"><i className="fal fa-bars"></i></Link>*/}
                                {/*</div>*/}

                                {/* CART */}
                                {/*<Link to="/cart" className="toggle dropdown-btn">*/}
                                {/*<div className="toggle dropdown-btn">*/}
                                <div className="toggle dropdown-btn" onClick={goToCart}>
                                    <span className="sigma-notification text-dark">
                                        {/*0*/}
                                        {cartCount > 0 ? cartCount : 0}
                                    </span>
                                    <Link title={"Shopping Cart"} to="/cart">
                                        <i className="fal fa-shopping-bag"></i>
                                    </Link>
                                </div>
                                {/*</Link>*/}

                                {/*Navbar Toggler*/}
                                <div className="navbar-toggler">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* // Desktop Menu End*/}

                {/* Mobile Header Start*/}
                <div className="sigma-mobile-header">
                    <div className="container">
                        <div className="sigma-mobile-header-inner">
                            {/*Site Logo*/}
                            <div className="site-logo site-logo-text">
                                <Link to="#">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         version="1.1" width="45" height="45" x="0"
                                         y="0"
                                         viewBox="0 0 512 512" className="">
                                        <path
                                            d="M369.853,250.251l-100-241C267.53,3.65,262.062,0,255.999,0s-11.531,3.65-13.854,9.251l-100,241    c-1.527,3.681-1.527,7.817,0,11.498l100,241c2.323,5.601,7.791,9.251,13.854,9.251s11.531-3.65,13.854-9.251l100-241    C371.381,258.068,371.381,253.932,369.853,250.251z M255.999,457.861L172.239,256l83.76-201.861L339.759,256L255.999,457.861z"
                                            fill="#ffffff"/>
                                        <path className="diamond-spark spark-1"
                                              d="M139.606,118.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C145.465,133.748,145.465,124.25,139.606,118.393z"
                                              fill="#ffffff"/>
                                        <path className="diamond-spark spark-2"
                                              d="M456.607,55.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394l63-63C462.465,70.748,462.465,61.25,456.607,55.393z"
                                              fill="#ffffff"/>
                                        <path className="diamond-spark spark-3"
                                              d="M139.606,372.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    C58.322,459.535,62.16,461,65.999,461s7.678-1.465,10.607-4.394l63-63C145.465,387.748,145.465,378.25,139.606,372.393z"
                                              fill="#ffffff"/>
                                        <path className="diamond-spark spark-4"
                                              d="M456.607,435.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C462.465,450.748,462.465,441.25,456.607,435.393z"
                                              fill="#ffffff"/>
                                    </svg>
                                    <div className="site-logo-text">
                                        <h3>Laramiss</h3>
                                        <h6>Luxury Pieces</h6>
                                    </div>
                                </Link>
                            </div>
                            <div className="sigma-hamburger-menu">
                                <div className="sigma-menu-btn">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* // Mobile Header End*/}

                {/* Mobile Menu Start*/}
                <aside className="sigma-mobile-menu">
                    <ul className="sigma-main-menu">
                        <li className="menu-item">
                            <Link to="/">
                                Home
                            </Link>
                        </li>

                        <li className="menu-item">
                            <Link to="/products">
                                Products
                            </Link>
                        </li>

                        <li className="menu-item">
                            <Link to="/about">
                                About
                            </Link>
                        </li>

                        <li className="menu-item">
                            <Link to="/contact">
                                Contact
                            </Link>
                        </li>

                        <li className="menu-item menu-item-has-children">
                            <a href="#">User</a>
                            <ul className="sub-menu">
                                <li className="menu-item">
                                    <Link to="/user-signup">Signup</Link>
                                </li>

                                <li className="menu-item">
                                    <Link to="/user-login">Login</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </aside>
                {/* // Mobile Menu End*/}
            </header>
        </>
    );
}

export default Navigation;