import {useEffect, useState} from "react";
import axios from "axios";
import {URL} from "../../components/URL";
import {useNavigate} from "react-router-dom";

import {Tabs, Tab} from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.css";

import AdminNavigation from "../../components/AdminNavigation";
import Footer from "../../components/Footer";
import OrderDetails from "./OrderDetails";

// import Swal from "sweetalert2";

import $ from 'jquery';

// import {Link} from "react-router-dom";

function ManageOrders() {
    let navigate = useNavigate();

    let [modal, setModal] = useState(false);

    let [orderid, setOrderID] = useState(null);

    let [formInputs, setFormInputs] = useState({
        company: '',
        trackingID: '',
        trackingURL: '',
        customerName: '',
    });

    let [newOrders, setNewOrders] = useState([]);
    let [shippedOrders, setShippedOrders] = useState([]);
    let [deliveredOrders, setDeliveredOrders] = useState([]);

    // FETCH NEW ORDERS
    const fetchNewOrders = () => {
        axios.post(`${URL}admin/get-orders`, {
            action: 'newOrders'
        }).then(res => {
            // console.log(res.data);
            // console.log(res.data.length);

            if (res.status === 200 && res.statusText === "OK") {
                if (res.data.length) {
                    setNewOrders(res.data);
                }
            }
        }).catch(err => {
            console.log(err);
        });
    }

    // FETCH SHIPPED ORDERS
    const fetchShippedOrders = () => {
        axios.post(`${URL}admin/get-orders`, {
            action: 'shippedOrders'
        }).then(res => {
            // console.log(res.data);
            // console.log(res.data.length);

            if (res.status === 200 && res.statusText === "OK") {
                if (res.data.length) {
                    setShippedOrders(res.data);
                }
            }
        }).catch(err => {
            console.log(err);
        });
    }

    // FETCH DELIVERED ORDERS
    const fetchDeliveredOrders = () => {
        axios.post(`${URL}admin/get-orders`, {
            action: 'deliveredOrders'
        }).then(res => {
            // console.log(res.data);
            // console.log(res.data.length);

            if (res.status === 200 && res.statusText === "OK") {
                if (res.data.length) {
                    setDeliveredOrders(res.data);
                }
            }
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        fetchNewOrders();
        fetchShippedOrders();
        fetchDeliveredOrders();
        document.title = "Laramiss | Manage Orders";
    }, []);

    // CSS Style
    let my_CSS = {
        text_box: {
            border: "2px solid white"
        },
        textArea_height: {
            border: "2px solid white",
            height: "100px"
        },
        radio: {
            height: "15px"
        }
    }

    const getOrderID = (oid) => {
        setOrderID(oid);
        // console.log(oid,orderid);
        document.getElementById('shippingForm').reset();
        document.getElementById('orderNum').innerText = oid;
    }

    const getOrderID_forDelivery = (oid) => {
        setOrderID(oid);
        // console.log(oid,orderid);
        document.getElementById('deliveryForm').reset();
        document.getElementById('deliveryNum').innerText = oid;
    }

    // Handle Form Inputs
    const handleInput = (e) => {
        let key = e.target.name;
        formInputs[key] = e.target.value;
        console.log(formInputs);
        setFormInputs(formInputs);
    }

    // Submit Shipping Details
    const submitShippingDetails = () => {
        const {company, trackingID, trackingURL} = formInputs;

        // console.log(company, trackingID, trackingURL, orderid);

        if (company && trackingID && trackingURL) {
            axios.post(`${URL}admin/manage-orders`, {
                company,
                trackingID,
                trackingURL,
                action: 'ship',
                orderid
            }).then(res => {
                if (res.status === 200 && res.statusText === "OK") {
                    console.log(res.data);

                    $("#shippingModal").hide();
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();

                    if (res.data === 'notLogged') {
                        // $("#shippingModal").hide();
                        // $('body').removeClass('modal-open');
                        // $('.modal-backdrop').remove();

                        navigate('/admin-login');
                    } else {
                        // again FETCH ORDERS
                        fetchNewOrders();
                        fetchShippedOrders();

                        document.getElementById('shippingForm').reset();

                        // setFormInputs({
                        //     company: '',
                        //     trackingID: '',
                        //     trackingURL: '',
                        // });
                    }
                }
            }).catch(err => {
                console.log(err);
            })
        } else {
            alert('All Fields Are Required.');
        }
    }

    // Submit Delivery Details
    const submitDeliveryDetails = () => {
        const {company, trackingID, trackingURL, customerName} = formInputs;

        // console.log(customerName, orderid);

        if (customerName) {
            axios.post(`${URL}admin/manage-orders`, {
                customerName,
                action: 'deliver',
                orderid
            }).then(res => {
                if (res.status === 200 && res.statusText === "OK") {
                    // console.log(res.data);

                    $("#shippingModal").hide();
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();

                    if (res.data === 'notLogged') {
                        // $("#shippingModal").hide();
                        // $('body').removeClass('modal-open');
                        // $('.modal-backdrop').remove();

                        navigate('/admin-login');
                    } else if (res.data === 'delivered') {
                        // again FETCH ORDERS
                        fetchShippedOrders();
                        fetchDeliveredOrders();

                        document.getElementById('deliveryForm').reset();
                    } else {
                    }
                }
            }).catch(err => {
                console.log(err);
            })
        } else {
            alert('All Fields Are Required.');
        }
    }

    const sendOrderID = (id) => {
        // console.log(id);
        setOrderID(id);

        setModal(true);
    }

    return (
        <>
            <AdminNavigation/>

            <section className="restaurant-tab-area pt-115 pb-2">
                <div className="container">
                    <div className="section-title text-center ">
                        <div className="section-title-icon">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 version="1.1" width="45" height="45" x="0" y="0"
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
                        </div>
                        <h1 className='mb-3'>My Orders</h1>

                        <div className={"mb-5"}>
                            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3 bg-light">
                                <Tab eventKey="home" title="New Orders">
                                {/*<Tab eventKey="home" title="New Orders" className={"bg-light"}>*/}
                                    {
                                        newOrders.length === 0
                                            ?
                                            <div className='py-4'>
                                                <img src="../no-orders.png" alt=""/>
                                            </div>
                                            :
                                            <table className='table table-bordered table-dark'>
                                                <thead className='text-white'>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Order Number</th>
                                                    <th>User</th>
                                                    {/*<th>Status</th>*/}
                                                    <th>Date</th>
                                                    <th>Total Amount</th>
                                                    <th>Payment Mode</th>
                                                    <th>Manage</th>
                                                    {/*<th>View Details</th>*/}
                                                </tr>
                                                </thead>

                                                <tbody>

                                                {
                                                    newOrders.map((order, index) => {
                                                        return (
                                                            <tr key={order.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{order.id}</td>
                                                                <td className='text-capitalize font-weight-bold'>{order.username}</td>
                                                                {/*<td>{order.status}</td>*/}
                                                                <td>{order.date.replace('T', ' ').replace('.000Z', ' ')}</td>
                                                                <td>&#x20b9;{order.grandtotal}</td>
                                                                <td>{order.paymentmethod}</td>

                                                                <td>
                                                                    <button onClick={() => getOrderID(order.id)}
                                                                            data-target='#shippingModal' data-toggle='modal'
                                                                            type='button' className='btn btn-info btn-sm'>
                                                                        Ship Order
                                                                    </button>
                                                                </td>

                                                                {/*<td>*/}
                                                                {/*    <button type='button' className='btn btn-warning'>View*/}
                                                                {/*        Details*/}
                                                                {/*    </button>*/}
                                                                {/*</td>*/}
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                    }
                                </Tab>
                                <Tab eventKey="profile" title="Shipped Orders">
                                    {
                                        shippedOrders.length === 0
                                            ?
                                            <div className='py-4'>
                                                <img src="../no-orders.png" alt=""/>
                                            </div>
                                            :
                                            <table className='table table-bordered table-dark'>
                                                <thead className='text-white'>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Order Number</th>
                                                    <th>User</th>
                                                    {/*<th>Status</th>*/}
                                                    <th>Date</th>
                                                    <th>Total Amount</th>
                                                    <th>Payment Mode</th>
                                                    <th>Shipping Details</th>
                                                    <th>Manage</th>
                                                    {/*<th>View Details</th>*/}
                                                </tr>
                                                </thead>

                                                <tbody>

                                                {
                                                    shippedOrders.map((order, index) => {
                                                        return (
                                                            <tr key={order.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{order.id}</td>
                                                                <td className='text-capitalize font-weight-bold'>{order.username}</td>
                                                                <td>{order.date.replace('T', ' ').replace('.000Z', ' ')}</td>
                                                                <td>&#x20b9;{order.grandtotal}</td>
                                                                <td>{order.paymentmethod}</td>

                                                                <td className='bg-light text-dark'>
                                                                    <div>
                                                                        <p><b className='text-info'>Company</b></p>
                                                                        <p>{order.companyname}</p>
                                                                        <hr/>
                                                                    </div>

                                                                    <div>
                                                                        <p><b className='text-info'>Tracking ID</b></p>
                                                                        <p>{order.trackingid}</p>
                                                                        <hr/>
                                                                    </div>

                                                                    <div>
                                                                        <p><b className='text-info'>Tracking URL</b></p>
                                                                        <p>{order.trackingurl}</p>
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <button onClick={() => getOrderID_forDelivery(order.id)}
                                                                            data-target='#deliveryModal' data-toggle='modal'
                                                                            type='button'
                                                                            className='btn btn-success btn-sm'>
                                                                        Deliver Order
                                                                    </button>
                                                                </td>

                                                                {/*<td>*/}
                                                                {/*    <button type='button' className='btn btn-warning'>View*/}
                                                                {/*        Details*/}
                                                                {/*    </button>*/}
                                                                {/*</td>*/}
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                    }
                                </Tab>
                                <Tab eventKey="contact" title="Delivered Orders">
                                    {
                                        deliveredOrders.length > 0
                                            ?
                                            <table className='table table-bordered table-dark'>
                                                <thead className='text-white'>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Order Number</th>
                                                    <th>User</th>
                                                    <th>Date</th>
                                                    <th>Total Amount</th>
                                                    <th>Payment Mode</th>
                                                    <th>Received By</th>
                                                    <th>View Details</th>
                                                </tr>
                                                </thead>

                                                <tbody>

                                                {
                                                    deliveredOrders.map((order, index) => {
                                                        return (
                                                            <tr key={order.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{order.id}</td>
                                                                <td className='text-capitalize font-weight-bold'>{order.username}</td>
                                                                {/*<td>{order.status}</td>*/}
                                                                <td>{order.date.replace('T', ' ').replace('.000Z', ' ')}</td>
                                                                <td>&#x20b9;{order.grandtotal}</td>
                                                                <td>{order.paymentmethod}</td>

                                                                <td><h5 className='text-warning'>{order.personreceived}</h5>
                                                                </td>

                                                                <td>
                                                                    <button onClick={() => sendOrderID(order.id)}
                                                                            data-target="#orderDetailsModal"
                                                                            data-toggle="modal" type='button'
                                                                            className='btn btn-light'>
                                                                        View Details
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                            :
                                            <div className='py-4'>
                                                <img src="../no-orders.png" alt=""/>
                                            </div>
                                    }
                                </Tab>
                            </Tabs>
                        </div>

                        {/*  jQuery Tabs */}
                        <div id="tabs" className='mb-5'>
                            <ul>
                                <li><a href="#tabs-1">New Orders</a></li>
                                <li><a href="#tabs-2">Shipped Orders</a></li>
                                <li><a href="#tabs-3">Delivered Orders</a></li>
                            </ul>

                            {/*  tabs 1  */}
                            <div id="tabs-1">
                                {
                                    newOrders.length === 0
                                        ?
                                        <div className='py-4'>
                                            <img src="../no-orders.png" alt=""/>
                                        </div>
                                        :
                                        <table className='table table-bordered table-dark'>
                                            <thead className='text-white'>
                                            <tr>
                                                <th>#</th>
                                                <th>Order Number</th>
                                                <th>User</th>
                                                {/*<th>Status</th>*/}
                                                <th>Date</th>
                                                <th>Total Amount</th>
                                                <th>Payment Mode</th>
                                                <th>Manage</th>
                                                {/*<th>View Details</th>*/}
                                            </tr>
                                            </thead>

                                            <tbody>

                                            {
                                                newOrders.map((order, index) => {
                                                    return (
                                                        <tr key={order.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{order.id}</td>
                                                            <td className='text-capitalize font-weight-bold'>{order.username}</td>
                                                            {/*<td>{order.status}</td>*/}
                                                            <td>{order.date.replace('T', ' ').replace('.000Z', ' ')}</td>
                                                            <td>&#x20b9;{order.grandtotal}</td>
                                                            <td>{order.paymentmethod}</td>

                                                            <td>
                                                                <button onClick={() => getOrderID(order.id)}
                                                                        data-target='#shippingModal' data-toggle='modal'
                                                                        type='button' className='btn btn-info btn-sm'>
                                                                    Ship Order
                                                                </button>
                                                            </td>

                                                            {/*<td>*/}
                                                            {/*    <button type='button' className='btn btn-warning'>View*/}
                                                            {/*        Details*/}
                                                            {/*    </button>*/}
                                                            {/*</td>*/}
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                }
                            </div>

                            {/*  tabs 2  */}
                            <div id="tabs-2">
                                {
                                    shippedOrders.length === 0
                                        ?
                                        <div className='py-4'>
                                            <img src="../no-orders.png" alt=""/>
                                        </div>
                                        :
                                        <table className='table table-bordered table-dark'>
                                            <thead className='text-white'>
                                            <tr>
                                                <th>#</th>
                                                <th>Order Number</th>
                                                <th>User</th>
                                                {/*<th>Status</th>*/}
                                                <th>Date</th>
                                                <th>Total Amount</th>
                                                <th>Payment Mode</th>
                                                <th>Shipping Details</th>
                                                <th>Manage</th>
                                                {/*<th>View Details</th>*/}
                                            </tr>
                                            </thead>

                                            <tbody>

                                            {
                                                shippedOrders.map((order, index) => {
                                                    return (
                                                        <tr key={order.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{order.id}</td>
                                                            <td className='text-capitalize font-weight-bold'>{order.username}</td>
                                                            <td>{order.date.replace('T', ' ').replace('.000Z', ' ')}</td>
                                                            <td>&#x20b9;{order.grandtotal}</td>
                                                            <td>{order.paymentmethod}</td>

                                                            <td className='bg-light text-dark'>
                                                                <div>
                                                                    <p><b className='text-info'>Company</b></p>
                                                                    <p>{order.companyname}</p>
                                                                    <hr/>
                                                                </div>

                                                                <div>
                                                                    <p><b className='text-info'>Tracking ID</b></p>
                                                                    <p>{order.trackingid}</p>
                                                                    <hr/>
                                                                </div>

                                                                <div>
                                                                    <p><b className='text-info'>Tracking URL</b></p>
                                                                    <p>{order.trackingurl}</p>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <button onClick={() => getOrderID_forDelivery(order.id)}
                                                                        data-target='#deliveryModal' data-toggle='modal'
                                                                        type='button'
                                                                        className='btn btn-success btn-sm'>
                                                                    Deliver Order
                                                                </button>
                                                            </td>

                                                            {/*<td>*/}
                                                            {/*    <button type='button' className='btn btn-warning'>View*/}
                                                            {/*        Details*/}
                                                            {/*    </button>*/}
                                                            {/*</td>*/}
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                }
                            </div>

                            {/*  tabs 3  */}
                            <div id="tabs-3">
                                {
                                    deliveredOrders.length > 0
                                        ?
                                        <table className='table table-bordered table-dark'>
                                            <thead className='text-white'>
                                            <tr>
                                                <th>#</th>
                                                <th>Order Number</th>
                                                <th>User</th>
                                                <th>Date</th>
                                                <th>Total Amount</th>
                                                <th>Payment Mode</th>
                                                <th>Received By</th>
                                                <th>View Details</th>
                                            </tr>
                                            </thead>

                                            <tbody>

                                            {
                                                deliveredOrders.map((order, index) => {
                                                    return (
                                                        <tr key={order.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{order.id}</td>
                                                            <td className='text-capitalize font-weight-bold'>{order.username}</td>
                                                            {/*<td>{order.status}</td>*/}
                                                            <td>{order.date.replace('T', ' ').replace('.000Z', ' ')}</td>
                                                            <td>&#x20b9;{order.grandtotal}</td>
                                                            <td>{order.paymentmethod}</td>

                                                            <td><h5 className='text-warning'>{order.personreceived}</h5>
                                                            </td>

                                                            <td>
                                                                <button onClick={() => sendOrderID(order.id)}
                                                                        data-target="#orderDetailsModal"
                                                                        data-toggle="modal" type='button'
                                                                        className='btn btn-light'>
                                                                    View Details
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                        :
                                        <div className='py-4'>
                                            <img src="../no-orders.png" alt=""/>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>

            {/* SHIPPING MODAL */}
            <div className="modal fade" id="shippingModal">
                {/*<div className="modal fade quick-view-modal" id="myModal">*/}
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header" id='modalHeader'>
                            <h4>Add Shipping Details</h4>

                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" className='text-white'>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className='text-center alert-warning mb-3 p-3'>
                                <h4 className='text-dark'>Order Number : <span id='orderNum'></span></h4>
                            </div>
                            <form id='shippingForm'>
                                <div className="input-group mb-30">
                                    <input onChange={handleInput} type="text"
                                           placeholder="Enter Company Name"
                                           name="company"
                                           id="company" style={my_CSS.text_box}/>
                                </div>

                                <div className="input-group mb-30">
                                    <input onChange={handleInput} type="text"
                                           placeholder="Enter Tracking Number"
                                           name="trackingID"
                                           id="trackingID" style={my_CSS.text_box}/>
                                </div>

                                <div className="input-group mb-30">
                                    <input onChange={handleInput} type="url"
                                           placeholder="Enter Tracking URL"
                                           name="trackingURL"
                                           id="trackingURL" style={my_CSS.text_box}/>
                                </div>

                                <button onClick={submitShippingDetails} type="button"
                                        className="main-btn btn-filled w-100">
                                    SHIP ORDER
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* DELIVERY MODAL */}
            <div className="modal fade" id="deliveryModal">
                {/*<div className="modal fade quick-view-modal" id="myModal">*/}
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header" id='modalHeader'>
                            <h4>Add Delivery Details</h4>

                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" className='text-white'>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className='text-center alert-warning mb-3 p-3'>
                                <h4 className='text-dark'>Order Number : <span id='deliveryNum'></span></h4>
                            </div>
                            <form id='deliveryForm'>
                                <div className="input-group mb-30">
                                    <input onChange={handleInput} type="text"
                                           placeholder="Enter Customer Name"
                                           name="customerName"
                                           id="customerName" style={my_CSS.text_box}/>
                                </div>

                                <button onClick={submitDeliveryDetails} type="button"
                                        className="main-btn btn-filled w-100">
                                    DELIVER ORDER
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            {
                modal &&
                <>
                    {/* ORDER DETAILS MODAL */}
                    <div className="modal fade" id="orderDetailsModal">
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4>Order Details</h4>

                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" className='text-white'>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <OrderDetails orderID={orderid}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default ManageOrders;