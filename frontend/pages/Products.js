import {Link} from "react-router-dom";
import axios from "axios";
import {useState, useEffect, useContext} from "react";
import load from "load-script";
import {LoadingScreen} from "../components/ReactLoadingAnimation";

// NEW
import TopHeader from "../components/new/TopHeader";
import NewNavigation from "../components/new/Navigation";
import BreadCrumb from "../components/new/BreadCrumb";
import NewFooter from "../components/new/NewFooter";

import ProductCard from "../components/ProductCard";
import {URL} from "../components/URL";

// Context
import {CartContext} from "../CartContext";
import AfterFooter from "../components/AfterFooter";
import Banner from "../components/new/Banner";
import {Breadcrumb} from "react-bootstrap";

function Products() {
    let [products, setProducts] = useState([]);
    let [loading, setLoading] = useState(true);

    let FetchAPI = async () => {
        await axios.post(`${URL}view-products`, {
            action: "product_page"
        }).then(res => {
            // console.log(res.data);
            setProducts(res.data);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }).catch(err => {
            console.log(err);
        });
    }

    function ToTop() {
        window.scrollTo(0, 0);
        document.title = "Product Page";
        document.body.classList.remove("home");
        document.body.classList.add("about-us");
    }

    useEffect(async () => {
        await ToTop();
        await FetchAPI();
    }, []);

    return (
        <>
            <header className="header-pos mb-40">
                <TopHeader/>

                <NewNavigation logo="assets/img/logo/logo-sinrato.png" />
            </header>

           <BreadCrumb title="Products"/>

            {/* Products Card */}
            <div className="main-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="product-shop-main-wrapper mb-50">
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

            {/* After Slider */}
            <div className="banner-statics mb-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-4 col-md-4">
                            <div className="single-banner-statics">
                                <a href= "shop-grid-left-sidebar.html">
                                    <img src="assets/img/banner/gate4edit.jpeg" alt=""/>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="single-banner-statics">
                                <a href="shop-grid-left-sidebar.html">
                                    <img src="assets/img/banner/gate2.jpeg" alt=""/>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="single-banner-statics">
                                <a href="shop-grid-left-sidebar.html">
                                    <img src="assets/img/banner/gate3.jpeg" alt=""/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <NewFooter/>
        </>
    );
}

export default Products;