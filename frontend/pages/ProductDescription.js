import {useState, useEffect, useContext} from "react";
import {Link, useParams} from "react-router-dom";

import axios from "axios";
import {URL} from "../components/URL";
import {LoadingScreen} from "../components/ReactLoadingAnimation";

// NEW
import TopHeader from "../components/new/TopHeader";
import NewNavigation from "../components/new/Navigation";
import BreadCrumb from "../components/new/BreadCrumb";
import NewFooter from "../components/new/NewFooter";
import load from "load-script";
import {CartContext} from "../CartContext";
import Swal from "sweetalert2";

function ProductDescription() {
    let [isAdding, setIsAdding] = useState(false);

    let {cart, setCart, cartCount, setCartCount} = useContext(CartContext);

    let addToCart = (e, product) => {
        e.preventDefault();
        // console.log(product);

        axios.post(`${URL}add-to-cart`, {
            data: product[0],
            action: 'add'
        }).then(res => {
            if (res.status === 200 && res.statusText === "OK") {
                if (res.data.count) {
                    setCartCount(res.data.count);
                    setIsAdding(true);
                    setTimeout(() => {
                        setIsAdding(false);
                    }, 1500);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Product Already Exist In Cart!',
                    })
                }
            }
        }).catch(err => {
            console.log(err);
        })
    }
    // -----------------------
    // -----------------------

    let params = useParams();
    // console.log(params.id);

    let [product, setProduct] = useState([]);
    let [loading, setLoading] = useState(true);

    let FetchAPI = async () => {
        await axios.post(`${URL}view-products`, {
            action: "single_product",
            id: params.id
        }).then(res => {
            // console.log(res.data);
            setProduct(res.data);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }).catch(err => {
            console.log(err);
        });
    }

    function ToTop() {
        window.scrollTo(0, 0);
        document.title = "Product Page | Grocerino";
        document.body.classList.remove("grocino-home");
        document.body.classList.add("grocino-about");
    }

    useEffect(async () => {
        await ToTop();
        await FetchAPI();
        load('../new/assets/js/vejcustome.js', function (err, script) {
            if (err) {

            } else {

            }
        });
    }, []);


    let imageURl = "http://localhost:5000/";

    return (
        <>
            {/*<header className="header-pos mb-40">*/}
            {/*    <TopHeader/>*/}

            {/*    <NewNavigation logo="../assets/img/logo/logo-sinrato.png" />*/}
            {/*</header>*/}

            <TopHeader/>

            <div className="home-header home-header2">
                {/*<NewNavigation />*/}
                <NewNavigation logo="../assets/img/logo/logo-sinrato.png"/>
            </div>

            <div className="product_details">
                <div className="container">
                    {
                        loading ?
                            <>
                                <div style={{height: "400px"}}>
                                    <div style={{
                                        display: "grid",
                                        // alignItems: "center",
                                        alignContent: "center",
                                        justifyContent: "center"
                                        // justifyItems: "center"
                                    }}>
                                        {/*<LoadingScreen  type="spinningBubbles"/>*/}
                                        {/*<LoadingScreen  type="spin"/>*/}
                                        <LoadingScreen type="spokes" color="#fcd462"/>
                                        <p>loading...</p>
                                    </div>
                                </div>
                            </> :
                            <>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="detail_left">
                                            <div className="zoom-in">
                                                {/*<a href="#">*/}
                                                <img srcSet={`${URL + product[0].photo}`} alt="Product"/>
                                                {/*</a>*/}
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-md-8">
                                        <div className="detail_right">
                                            <h1>{product[0].productname}</h1>

                                            <p>{product[0].pdescription}</p>

                                            <hr className="mb-4"/>

                                            <div className="d-inline-flex align-items-center w-100">
                                                {
                                                    product[0].discount > 0 ?
                                                        <>
                                                            <div
                                                                className="price text-dark">&#x20b9;{Math.round(product[0].price - ((product[0].price * product[0].discount) / 100))}&ensp;</div>
                                                            <div style={{fontSize: "1.2rem"}}
                                                                 className="price text-danger">
                                                                <del>&#x20b9;{product[0].price}</del>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <div
                                                                className="price text-dark">&#x20b9;{product[0].price}</div>
                                                        </>
                                                }

                                                <div className="input-group qty_weight">
                                                    <div className="btn-area">
                                                        <button onClick={(e) => addToCart(e, product)}
                                                                disabled={isAdding}
                                                                className="btn btn-success" style={{width: "127px"}}>
                                                            <img src="../assets/img/banner/addtocart.png"
                                                                 className="arrow-left"
                                                                 alt="Arrow Left" width="100%"/> &ensp;
                                                            {isAdding ? 'Added' : 'Add to Cart'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>

            <NewFooter/>
        </>
    );
}

export default ProductDescription;