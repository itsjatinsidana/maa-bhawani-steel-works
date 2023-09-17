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

function ShoppingCartOld() {
    let navigate = useNavigate();

    // RAZORPAY
    const Razorpay = useRazorpay();

    // React Hook Form
    // const {register, handleSubmit, formState: {errors}} = useForm();

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
                // console.log(res.data);

                setProducts(res.data.cart);
                setGrandTotal(res.data.grand_total);
                setProductsFetched(true);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    function ToTop() {
        window.scrollTo(0, 0);
        document.title = "Shopping Cart";
        // document.body.classList.remove("grocino-home");
        // document.body.classList.add("grocino-about");
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
        name: "Grocerino",
        description: "Best Website for Grocery",
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
            alert('All fields are required.');
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
                <header className="header">
                    <TopHeader logo="new/img/logos/white-logo.png"/>

                    <NewNavigation/>
                </header>

                <main className="main">
                    <BreadCrumb title="Shopping Cart"/>

                    <div className="page-content">
                        <div className="container">
                            <div className="mb-10 mt-10">
                                {
                                    products.length > 0 ?
                                        <>
                                            {/* CART SECTION */}
                                            <div className="container">
                                                <table className="table table-borderless">
                                                    <thead style={{color: "#fff", background: "#F46432"}}>
                                                    <tr>
                                                        <th></th>
                                                        <th>Product</th>
                                                        <th>Price</th>
                                                        <th>Discount</th>
                                                        <th>Quantity</th>
                                                        <th>Total</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                    {
                                                        products.map((product) => {
                                                            return (
                                                                <tr key={product.productid}>
                                                                    <td>
                                                                        <button onClick={() => Delete(product.productid)}
                                                                                className="btn text-dark">
                                                                            <i className="fa fa-times"></i>
                                                                        </button>
                                                                    </td>

                                                                    <td>
                                                                        <div className="product-thumbnail">
                                                                            <img srcSet={URL + product.photo}
                                                                                 alt="product_thumbnail"
                                                                                 style={{height: "60px", width: "60px"}}/>
                                                                        </div>
                                                                        <Link to="#" style={{cursor: "default"}}
                                                                              className="text-capitalize">
                                                                            {product.productname}
                                                                        </Link>
                                                                    </td>

                                                                    <td>
                                                    <span className="product-currency">
                                                        <b>&#x20b9;&nbsp;{product.price}</b>
                                                    </span>
                                                                    </td>

                                                                    <td>
                                                    <span className="product-amount">
                                                        <b>&nbsp;{product.discount}%</b>
                                                    </span>
                                                                    </td>

                                                                    <td>
                                                                        <div className="quantity-box">
                                                                            <button
                                                                                onClick={() => decrementQty(product.productid)}
                                                                                type="button" className="btn btn-orange">
                                                                                <i className="fa fa-minus"></i>
                                                                            </button>

                                                                            <input readOnly type="text"
                                                                                   className="input-qty"
                                                                                   name="name"
                                                                                   value={product.quantity}
                                                                                   style={{
                                                                                       width: "35px",
                                                                                       padding: "7px",
                                                                                       margin: "0 5px",
                                                                                       textAlign: "center",
                                                                                       borderRadius: "5px"
                                                                                   }}/>

                                                                            <button
                                                                                onClick={() => incrementQty(product.productid)}
                                                                                type="button" className="btn btn-orange">
                                                                                <i className="fa fa-plus"></i>
                                                                            </button>
                                                                        </div>
                                                                    </td>

                                                                    <td>
                                                                    <span
                                                                        className="product-currency">
                                                                        <b>&#x20b9;</b>
                                                                    </span>
                                                                        <span className="product-amount">
                                                                        <b>&nbsp;{product.net_price * product.quantity}</b>
                                                                    </span>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })
                                                    }

                                                    <tr>
                                                        <td colSpan="5">
                                                            <div className="float-left">
                                                                <Link to='/products'
                                                                      className="btn btn-orange">
                                                                    Continue Shopping
                                                                </Link>
                                                            </div>
                                                        </td>

                                                        <td className="product-price  cw-align has-title text-center">
                                                            <div style={{borderBottom: "2px solid #000"}}>
                                                <span style={{
                                                    fontSize: "1.3rem",
                                                    fontWeight: "bold"
                                                }}>Grand&nbsp;Total</span>
                                                            </div>

                                                            <span className="product-currency"><b>&#x20b9;</b></span>
                                                            <span className="product-amount"><b>&nbsp;{grandTotal}</b></span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>

                                                <hr/>

                                                {/* Billing */}
                                                <div className="row">
                                                    <div className="col-lg-6 jumbotron mb-5">
                                                        <h4 className="mb-30">Billing Details</h4>
                                                        <hr/>

                                                        <form className="form-signin">
                                                            <div className="ui form">
                                                                <div className="row">
                                                                    <div className="col-md-6 mb-3">
                                                                        <div className="ui left icon input field w-100">
                                                                            <select onChange={handle_Inputs} name="city" id="city">
                                                                                <option value="">Select City</option>
                                                                                <option value="Amritsar">Amritsar</option>
                                                                                <option value="Ahmedabad">Ahmedabad</option>
                                                                                <option value="Mumbai">Mumbai</option>
                                                                                <option value="Bangalore">Bangalore</option>
                                                                                <option value="Lucknow">Lucknow</option>
                                                                                <option value="Visakhapatnam">Visakhapatnam</option>
                                                                                <option value="Ludhiana">Ludhiana</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-6 mb-3">
                                                                        <div className="ui left icon input field w-100">
                                                                            <input onChange={handle_Inputs}
                                                                                   type="text"
                                                                                   placeholder="Enter Zipcode"
                                                                                   name="zipcode"
                                                                                   id="zipcode"/>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-md-6 mb-3">
                                                                        <div className="ui left icon input field w-100">
                                                                <textarea onChange={handle_Inputs}
                                                                          placeholder="Enter Address"
                                                                          name="address"
                                                                          id="address"/>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-6 mb-3">
                                                                        <div className="ui left icon input field w-100">
                                                                <textarea onChange={handle_Inputs}
                                                                          placeholder="Enter Remarks (optional)"
                                                                          name="remarks"
                                                                          id="remarks"/>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row mb-3">
                                                                    <div className="col-md-12">
                                                                        <div className="row">
                                                                            <div className="col-3">
                                                                                <label><h5>Payment Method:</h5></label>
                                                                                <br/>
                                                                                <input checked={payment === 'COD'}
                                                                                       onChange={handleChange_Radio}
                                                                                       type="radio" name='gender' value='COD' id='COD'/>

                                                                                <label htmlFor="COD">
                                                                                    <b> &nbsp;COD</b>
                                                                                </label>

                                                                                <br/>

                                                                                <input checked={payment === 'Online'}
                                                                                       onChange={handleChange_Radio} type="radio"
                                                                                       name='gender' value='Online' id='Online'/>

                                                                                <label htmlFor="Online">
                                                                                    <b>&nbsp;Online Payment</b>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="cw-product-promo">
                                                                            <button
                                                                                onClick={() => place_Order(grandTotal, payment)}
                                                                                type="button"
                                                                                className="btn btn-orange">
                                                                                Proceed to Checkout
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                                {/* Billing */}
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className="text-center">
                                                <img src="/empty-cart.png" style={{height: "300px"}} alt=""/>
                                            </div>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </main>

                <NewFooter logo="new/img/logos/logo.png"/>
            </div>

            <AfterFooter/>
        </>
    );
}

export default ShoppingCartOld;