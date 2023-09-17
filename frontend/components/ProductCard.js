import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {CartContext} from "../CartContext";
import axios from "axios";
import Swal from "sweetalert2";

import {URL} from "./URL";

function ProductCard(props) {
    let product = props.details;

    let [isAdding, setIsAdding] = useState(false);

    let {cart, setCart, cartCount, setCartCount} = useContext(CartContext);

    let addToCart = (e, product) => {
        e.preventDefault();
        // console.log(product);

        axios.post(`${URL}add-to-cart`, {
            data: product,
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
        });
    }

    return (
        <>
            {/* Products*/}
            <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="product-item mb-30">
                    <div className="product-thumb">
                        <a href={"/product-description/"+product.productid} className="text-center">
                            <img style={{height: "200px"}} src={URL + product.photo}
                                 className="pri-img" alt=""/>
                        </a>

                        {
                            product.discount > 0 &&
                            <div className="box-label">
                                <div className="label-product label_new">
                                    <span>{product.discount}% OFF</span>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="product-caption">
                        <div className="manufacture-product">
                            <p><a href="shop-grid-left-sidebar.html">{product.subcategoryname}</a></p>
                        </div>

                        <div className="product-name">
                            <h4>
                                <a href={"/product-description/"+product.productid}>{product.productname}</a>
                            </h4>
                        </div>

                        <div className="ratings" style={{visibility: "hidden"}}>
                            <span className="yellow"><i className="lnr lnr-star"></i></span>
                            <span className="yellow"><i className="lnr lnr-star"></i></span>
                            <span className="yellow"><i className="lnr lnr-star"></i></span>
                            <span className="yellow"><i className="lnr lnr-star"></i></span>
                            <span><i className="lnr lnr-star"></i></span>
                        </div>

                        <div className="price-box">
                            {
                                product.discount > 0 ?
                                    <>
                                        <span className="regular-price">
                                            &#x20b9;{Math.round(product.price - ((product.price * product.discount) / 100))}
                                            &ensp;
                                            <del className="text-danger">&#x20b9;{product.price}</del>
                                        </span>
                                    </>
                                    :
                                    <span className="regular-price">&#x20b9;{product.price}</span>
                            }
                        </div>

                        <button onClick={(e) => addToCart(e, product)}
                                disabled={isAdding}
                                className="btn-cart" type="button">
                            {isAdding ? 'Added' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
            {/* //Products*/}
        </>
    );
}

export default ProductCard;