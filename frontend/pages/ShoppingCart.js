import {useEffect, useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {CartContext} from "../CartContext";
import axios from "axios";

import Swal from "sweetalert2";
// import {useForm} from "react-hook-form";

import {URL} from "../components/URL";

// Import Razorpay Package
import useRazorpay from 'react-razorpay';

// new
import TopHeader from "../components/new/TopHeader";
import NewNavigation from "../components/new/Navigation";
import NewFooter from "../components/new/NewFooter";
import BreadCrumb from "../components/new/BreadCrumb";
import load from "load-script";
import AfterFooter from "../components/AfterFooter";

function ShoppingCart() {
    let navigate = useNavigate();

    // RAZORPAY
    const Razorpay = useRazorpay();

    let {cart, setCart, cartCount, setCartCount} = useContext(CartContext);

    let [products, setProducts] = useState([]);
    let [grandTotal, setGrandTotal] = useState(0);
    let [productsFetched, setProductsFetched] = useState(false);

    // ------ ------
    let [formInputs, setFormInputs] = useState({
        city: '',
        zipcode: '',
        address: '',
        remarks: ''
    });

    // let [payment, setPayment] = useState('COD');
    let [payment, setPayment] = useState('Online');
    // ------ ------

    // GET CART PRODUCTS
    let Fetch_CartProducts = (URL) => {
        // if (productsFetched === true) {
        //     return false;
        // }

        axios.post(`${URL}add-to-cart`, {
            action: 'view'
        }).then(res => {
            if (res.status === 200 && res.statusText === "OK") {
                setProducts(res.data.cart);
                setGrandTotal(res.data.grand_total);
                setProductsFetched(true);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    function ToTop() {
        document.title = "Shopping Cart";
    }

    useEffect(async () => {
        await ToTop();
        await Fetch_CartProducts(URL);
    }, [URL]);

    // DELETE
    let Delete = (pid) => {
        Swal.fire({
            title: 'Confirm',
            text: "Are you sure to Delete",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let updated_Product = products.filter((product) => product.productid !== pid);
                setProducts(updated_Product);

                axios.post(`${URL}add-to-cart`, {
                    pid,
                    action: 'delete'
                }).then(res => {
                    if (res.status === 200 && res.statusText === "OK") {
                        // console.log(res.data);

                        setCartCount(res.data.count);
                        setGrandTotal(res.data.grand_total);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        });
    }

    // INCREMENT QUANTITY
    let incrementQty = (pid) => {
        for (let i of products) {
            if (i.productid === pid) {
                if (i.quantity === 5) {
                    return false;
                }
            }
        }

        axios.post(`${URL}add-to-cart`, {
            pid,
            action: 'inc'
        }).then(res => {
            if (res.status === 200 && res.statusText === "OK") {
                // console.log(res.data);

                setProducts(res.data.cart);
                setGrandTotal(res.data.grand_total);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    // DECREMENT QUANTITY
    let decrementQty = (pid) => {
        for (let i of products) {
            if (i.productid === pid) {
                if (i.quantity === 1) {
                    return false;
                }
            }
        }

        axios.post(`${URL}add-to-cart`, {
            pid,
            action: 'less'
        }).then(res => {
            if (res.status === 200 && res.statusText === "OK") {
                // console.log(res.data);

                setProducts(res.data.cart);
                setGrandTotal(res.data.grand_total);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    // ------ ------

    // Radio
    const handleChange_Radio = (e) => {
        setPayment(e.target.value);
    };

    // Text_Boxes
    const handle_Inputs = (e) => {
        const newData = {...formInputs};
        let key = e.target.name;
        newData[key] = e.target.value;
        setFormInputs(newData);
    }

    // RAZORPAY Options
    let options = {
        key: "rzp_test_A3RM3Asww6uWvF",
        currency: 'INR',
        amount: 0,
        name: "Wolmart",
        description: "Best Online Shopping Platform",
        image: "https://i.pinimg.com/originals/c1/92/9d/c1929d3492c2f64ab65b43808c072043.jpg",
        handler: bookOrder,
        prefill: {
            name: "",
            // email: "",
            email: "user@yahoo.in",
            contact: "1234567890",
            // contact: "",
        },
        theme: {
            "color": "#F46432"
        }
    };

    // RAZORPAY Handler [razorpay_payment_id]
    function bookOrder(response) {
        let payment_id = response.razorpay_payment_id;
        if (payment_id !== '') {
            order_Request_To_Server(payment_id);
        } else {
            alert('Payment Failed. Try again...');
        }
    }

    // Place Order Button
    const place_Order = (price, pay_method) => {
        let {city, zipcode, address} = formInputs;

        if (city === '' || zipcode === '' || address === '') {
            Swal.fire({
                icon: "warning",
                title: "All fields are required."
            })
            return false;
        }

        if (pay_method === 'Online') {
            options.amount = price * 100;

            let rzp = new Razorpay(options);
            rzp.open(); // Display Razorpay
        } else {
            // alert('COD');

            order_Request_To_Server('');
        }
    }

    // Request To Server
    const order_Request_To_Server = (pay_id) => {
        let {city, zipcode, address, remarks} = formInputs;

        axios.post(`${URL}book-order`, {
            city,
            zipcode,
            address,
            remarks,
            pay_id,
            payment,
            grandTotal
        }).then(res => {
            if (res.status === 200 && res.statusText === "OK") {
                // console.log('Server Response -- -- ' + res.data);

                if (res.data === 'login') {
                    navigate('/user-login')
                } else if (res.data === 'placed') {
                    setCartCount(0);
                    window.scrollTo(0, 0);
                    Fetch_CartProducts(URL);
                    setTimeout(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Order Placed.',
                        });
                    }, 1000);
                } else {
                }
            }
        }).catch(err => {
            console.log(err);
        })
    }
    // ------ ------

    return (
        <>
            <div className="page-wrapper">
                {/*<h1 className="d-none">Wolmart - Responsive Marketplace HTML Template</h1>*/}
                <header className="header header-border">
                    <TopHeader logo="new/img/logos/white-logo.png"/>

                    <NewNavigation logo="assets/img/logo/logo-sinrato.png" />
                </header>

                <BreadCrumb title="Shopping Cart"/>

                {
                    products.length > 0 ?

                        <>
                            <div className="shopping-cart-wrapper pb-70">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <main id="primary" className="site-main">
                                                <div className="shopping-cart">
                                                    <div className="row">
                                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                                            <div className="section-title">
                                                                <h3>Shopping Cart</h3>
                                                            </div>

                                                            <form action="#">
                                                                <div className="table-responsive">
                                                                    <table className="table table-bordered">
                                                                        <thead>
                                                                        <tr>
                                                                            <td>Image</td>
                                                                            <td>Product Name</td>
                                                                            {/*<td>Model</td>*/}
                                                                            <td>Quantity</td>
                                                                            <td>Unit Price</td>
                                                                            <td>Total</td>
                                                                        </tr>
                                                                        </thead>
                                                                        <tbody>

                                                                        {
                                                                            products.map((product, index) => {
                                                                                return (
                                                                                    <>
                                                                                        <tr key={index}>
                                                                                            <td>
                                                                                                <a href="product-details.html">
                                                                                                    <img
                                                                                                        style={{
                                                                                                            width: "120px",
                                                                                                            height: "120px"
                                                                                                        }}
                                                                                                        src={URL + product.photo}
                                                                                                        alt="Cart Product Image"
                                                                                                        title="Compete Track Tote"
                                                                                                        className="img-thumbnail"/></a>
                                                                                            </td>

                                                                                            <td>
                                                                                                <a href="#">{product.productname}</a>
                                                                                            </td>


                                                                                            <td>
                                                                                                <div
                                                                                                    className="input-group">
                                                                                                    <input
                                                                                                        className="quantity form-control"
                                                                                                        type="text"
                                                                                                        // style={{width: "10px"}}
                                                                                                        defaultValue={product.quantity}
                                                                                                    />
                                                                                                    &nbsp;
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        onClick={() => incrementQty(product.productid)}
                                                                                                        className="btn btn-sm btn-secondary">
                                                                                                        <i className="fa fa-plus"></i>
                                                                                                    </button>
                                                                                                    &nbsp;
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        onClick={() => decrementQty(product.productid)}
                                                                                                        className="btn btn-sm btn-secondary">
                                                                                                        <i className="fa fa-minus"></i>
                                                                                                    </button>
                                                                                                </div>
                                                                                            </td>

                                                                                            <td>&#x20b9;{product.net_price}</td>
                                                                                            <td>&#x20b9;{product.net_price * product.quantity}</td>
                                                                                        </tr>
                                                                                    </>
                                                                                )
                                                                            })
                                                                        }
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </form>

                                                            <div className="cart-amount-wrapper">
                                                                <div className="row">
                                                                    <div className="col-12 col-sm-12 col-md-8">
                                                                        <Link to="/products"
                                                                              className="btn btn-secondary">
                                                                            Continue Shopping</Link>
                                                                    </div>

                                                                    <div className="col-12 col-sm-12 col-md-4">
                                                                        <table className="table table-bordered">
                                                                            <tbody>
                                                                            <tr>
                                                                                <td><strong>Total:</strong></td>
                                                                                <td><span
                                                                                    className="color-primary">&#x20b9;{grandTotal}</span>
                                                                                </td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </main>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="checkout-wrapper pt-10 pb-70">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                            <main id="primary" className="site-main">
                                                <div className="user-actions-area">
                                                    <div className="row">
                                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                                            <div className="user-actions user-login">
                                                                <h3>
                                                                    Returning customer? <Link to="/user-login">
                                                                    <span id="show_login">Click here to login.</span>
                                                                </Link>
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="checkout-area">
                                                    <div className="row">
                                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                                            <div className="checkout-form">
                                                                <div className="section-title left-aligned">
                                                                    <h3>Billing Details</h3>
                                                                </div>

                                                                <form>
                                                                    <div className="form-row mb-3">
                                                                        <div
                                                                            className="form-group col-12 col-sm-12 col-md-6">
                                                                            <label htmlFor="country_name"
                                                                                   className="d-block">City <span
                                                                                className="text-danger">*</span></label>
                                                                            <select onChange={handle_Inputs}
                                                                                    name="city" id="city"
                                                                                    className="form-control nice-select"
                                                                                    required="">
                                                                                <option value="">
                                                                                    --- Select ---
                                                                                </option>
                                                                                <option value="Amritsar">Amritsar
                                                                                </option>
                                                                                <option
                                                                                    value="Ahmedabad">Ahmedabad
                                                                                </option>
                                                                                <option value="Mumbai">Mumbai
                                                                                </option>
                                                                                <option
                                                                                    value="Bangalore">Bangalore
                                                                                </option>
                                                                                <option value="Lucknow">Lucknow
                                                                                </option>
                                                                                <option
                                                                                    value="Visakhapatnam">Visakhapatnam
                                                                                </option>
                                                                                <option value="Ludhiana">Ludhiana
                                                                                </option>
                                                                            </select>
                                                                        </div>

                                                                        <div
                                                                            className="form-group col-12 col-sm-12 col-md-6">
                                                                            <label htmlFor="zip_code">Zip Code <span
                                                                                className="text-danger">*</span></label>
                                                                            <input onChange={handle_Inputs}
                                                                                   type="number"
                                                                                   className="form-control"
                                                                                   name="zipcode" id="zipcode"
                                                                                   required/>
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-row mb-3">
                                                                        <div
                                                                            className="form-group col-12 col-sm-12 col-md-12">
                                                                            <label htmlFor="p_address">Address <span
                                                                                className="text-danger">*</span></label>
                                                                            <input onChange={handle_Inputs}
                                                                                   type="text" className="form-control"
                                                                                   id="address" name="address"
                                                                                   required/>
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-row">
                                                                        <div
                                                                            className="form-group col-12 col-sm-12 col-md-12">
                                                                            <label htmlFor="order_notes">
                                                                                Order Notes</label>
                                                                            <textarea className="form-control"
                                                                                      id="order_notes"
                                                                                      placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-row">
                                                                        <div
                                                                            className="form-group col-12 col-sm-12 col-md-12">
                                                                            <label>
                                                                                <h5>Payment
                                                                                    Method:</h5>
                                                                            </label>
                                                                            <br/>

                                                                            <input
                                                                                checked={payment === 'COD'}
                                                                                onChange={handleChange_Radio}
                                                                                type="radio"
                                                                                name='gender'
                                                                                value='COD'
                                                                                id='COD'/>

                                                                            <span
                                                                                className="mr-3"
                                                                                style={{fontSize: "15px"}}>
                                                                                       &nbsp;Cash on Delivery
                                                                                    </span>

                                                                            <input
                                                                                checked={payment === 'Online'}
                                                                                onChange={handleChange_Radio}
                                                                                type="radio"
                                                                                name='gender'
                                                                                value='Online'
                                                                                id='Online'/>

                                                                            <span
                                                                                style={{fontSize: "15px"}}>
                                                                                        &nbsp;Online Payment
                                                                                    </span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-row mb-3">
                                                                        <div
                                                                            className="form-group col-12 col-sm-12 col-md-12">
                                                                            <button
                                                                                onClick={() => place_Order(grandTotal, payment)}
                                                                                type="button"
                                                                                className="btn btn-secondary">Checkout
                                                                            </button>
                                                                        </div>
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
                        </>
                        :
                        <div className="col-lg-12">
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <img src="/empty-cart.png" style={{height: "300px"}} alt=""/>
                            </div>
                        </div>
                }

                <NewFooter logo="new/img/logos/logo.png"/>
            </div>

            <AfterFooter/>
        </>
    );
}

export default ShoppingCart;