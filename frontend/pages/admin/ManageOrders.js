import {useEffect, useState} from "react";
import axios from "axios";
import {URL} from "../../components/URL";
import {useNavigate} from "react-router-dom";

import {Tabs, Tab, Modal, Button, Table} from "react-bootstrap";
import load from "load-script";

import TopHeader from "../../components/new/TopHeader";
import AdminNavigation from "../../components/AdminNavigation";
import BreadCrumb from "../../components/new/BreadCrumb";
import NewFooter from "../../components/new/NewFooter";

import OrderDetails from "./OrderDetails";

import Swal from "sweetalert2";
import {FcFullTrash} from "react-icons/fc";
import ReactTooltip from "react-tooltip";
import AfterFooterAdmin from "../../components/AfterFooterAdmin";
import TopHeaderAdmin from "../../components/new/TopHeaderAdmin";

function ManageOrders() {
    let navigate = useNavigate();

    // REACT BOOTSTRAP MODAL - 1
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // REACT BOOTSTRAP MODAL - 2
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

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
    let [cancelledOrders, setCancelledOrders] = useState([]);

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

    // FETCH CANCELLED ORDERS
    const fetchCancelledOrders = () => {
        axios.post(`${URL}admin/get-orders`, {
            action: 'cancelledOrders'
        }).then(res => {
            // console.log(res.data);
            // console.log(res.data.length);

            if (res.status === 200 && res.statusText === "OK") {
                if (res.data.length > 0) {
                    setCancelledOrders(res.data);
                }
            }
        }).catch(err => {
            console.log(err);
        });
    }

    function ToTop() {
        window.scrollTo(0, 0);
        document.title = "Manage Orders";
    }

    useEffect(async () => {
        await ToTop();

        load('../new/assets/js/vejcustome.js', function (err, script) {
            if (err) {
                // print useful message
            } else {
                // console.log(script.src);
            }
        });

        fetchNewOrders();
        fetchShippedOrders();
        fetchDeliveredOrders();
        fetchCancelledOrders();
    }, []);

    const getOrderID = (oid) => {
        setShow(true);
        setOrderID(oid);
    }

    const getOrderID_forDelivery = (oid) => {
        setShow2(true);
        setOrderID(oid);
    }

    // Handle Form Inputs
    const handleInput = (e) => {
        let key = e.target.name;
        formInputs[key] = e.target.value;
        setFormInputs(formInputs);
    }

    // Submit Shipping Details
    const submitShippingDetails = () => {
        const {company, trackingID, trackingURL} = formInputs;

        if (company && trackingID && trackingURL) {
            axios.post(`${URL}admin/manage-orders`, {
                company,
                trackingID,
                trackingURL,
                action: 'ship',
                orderid
            }).then(res => {
                if (res.status === 200 && res.statusText === "OK") {
                    // console.log(res.data);

                    setShow(false);

                    // $("#shippingModal").hide();
                    // $('body').removeClass('modal-open');
                    // $('.modal-backdrop').remove();

                    if (res.data === 'notLogged') {
                        navigate('/admin-login');
                    } else {
                        if (newOrders.length === 1) {
                            setNewOrders([]);
                        }

                        Swal.fire({
                            title: "Order Shipped",
                            icon: "success"
                        })

                        // again FETCH ORDERS
                        fetchNewOrders();
                        fetchShippedOrders();

                        document.getElementById('shippingForm').reset();

                        setFormInputs({
                            company: '',
                            trackingID: '',
                            trackingURL: '',
                            customerName: '',
                        });
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

                    setShow2(false);

                    // $("#shippingModal").hide();
                    // $('body').removeClass('modal-open');
                    // $('.modal-backdrop').remove();

                    if (res.data === 'notLogged') {
                        navigate('/admin-login');
                    } else if (res.data === 'delivered') {
                        if (shippedOrders.length === 1) {
                            setShippedOrders([]);
                        }

                        Swal.fire({
                            title: "Order Delivered Successfully",
                            icon: "success"
                        })

                        // again FETCH ORDERS
                        fetchShippedOrders();
                        fetchDeliveredOrders();

                        document.getElementById('deliveryForm').reset();

                        setFormInputs({
                            company: '',
                            trackingID: '',
                            trackingURL: '',
                            customerName: '',
                        });
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
        setOrderID(id);
        setModal(true);
    }

    return (
        <>
            <header className="header-pos mb-40">
                <TopHeaderAdmin/>

                <AdminNavigation logo="../new/img/logos/logo.png"/>
            </header>

            <BreadCrumb title="Manage Orders"/>

            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-10 col-12 mx-auto">
                        {/* REACT BOOTSTRAP TABS */}
                        <Tabs defaultActiveKey="new" id="uncontrolled-tab-example" className="mb-3 bg-light">
                            {/* TAB-1 [New] */}
                            <Tab eventKey="new" title="New Orders" style={{color: "#fff"}}>
                                {
                                    newOrders.length === 0
                                        ?
                                        <div className='py-4 text-center'>
                                            <img src="../no-orders.png"
                                                 // style={{boxShadow: "2px 3px 5px rgba(0,0,0,0.4)"}}
                                                 alt=""/>
                                        </div>
                                        :
                                        <table className='table table-borderless' style={{fontSize: "15px"}}>
                                            <thead style={{color: "#000", background: "#FEDC19"}}>
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

                                            <tbody className="text-dark">

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
                                                                    // data-target='#shippingModal'
                                                                    // data-toggle='modal'
                                                                        type='button'
                                                                        className='btn btn-info btn-sm'>
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

                            {/* TAB-2 [Shipped] */}
                            <Tab eventKey="shipped" title="Shipped Orders">
                                {
                                    shippedOrders.length === 0
                                        ?
                                        <div className='py-4 text-center'>
                                            <img src="../no-orders.png"
                                                 // style={{boxShadow: "2px 3px 5px rgba(0,0,0,0.4)"}}
                                                 alt=""/>
                                        </div>
                                        :
                                        <table className='table table-borderless' style={{fontSize: "15px"}}>
                                            <thead style={{color: "#000", background: "#FEDC19"}}>
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
                                                                <div style={{display: "flex"}}>
                                                                    <p><b>Company</b>&nbsp;-&nbsp;</p>
                                                                    <p>{order.companyname}</p>
                                                                    <hr/>
                                                                </div>

                                                                <div style={{display: "flex"}}>
                                                                    <p><b>Tracking ID</b>&nbsp;-&nbsp;</p>
                                                                    <p>{order.trackingid}</p>
                                                                    <hr/>
                                                                </div>

                                                                <div style={{display: "flex"}}>
                                                                    <p><b>Tracking URL</b>&nbsp;-&nbsp;</p>
                                                                    <p>{order.trackingurl}</p>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <button
                                                                    onClick={() => getOrderID_forDelivery(order.id)}
                                                                    // data-target='#deliveryModal' data-toggle='modal'
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

                            {/* TAB-3 [Delivered] */}
                            <Tab eventKey="delivered" title="Delivered Orders">
                                {
                                    deliveredOrders.length > 0
                                        ?
                                        <table style={{fontSize: "15px"}} className='table table-borderless'>
                                            <thead style={{color: "#000", background: "#FEDC19"}}>
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

                                                            <td><h5
                                                                className='text-warning'>{order.personreceived}</h5>
                                                            </td>

                                                            <td>
                                                                <button onClick={() => sendOrderID(order.id)}
                                                                        data-target="#orderDetailsModal"
                                                                        data-toggle="modal" type='button'
                                                                        className='btn btn-dark btn-sm'>
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
                                        <div className='py-4 text-center'>
                                            <img src="../no-orders.png"
                                                 // style={{boxShadow: "2px 3px 5px rgba(0,0,0,0.4)"}}
                                                 alt=""/>
                                        </div>
                                }
                            </Tab>

                            {/* TAB-4 [Cancelled] */}
                            <Tab eventKey="cancel" title="Cancelled Orders">
                                {
                                    cancelledOrders.length > 0
                                        ?
                                        <table style={{fontSize: "15px"}} className='table table-borderless'>
                                            <thead style={{color: "#000", background: "#FEDC19"}}>
                                            <tr>
                                                <th>#</th>
                                                <th>Order Number</th>
                                                <th>User</th>
                                                <th>Date</th>
                                                <th>Total Amount</th>
                                                <th>Payment Mode</th>
                                                <th>View Details</th>
                                            </tr>
                                            </thead>

                                            <tbody>

                                            {
                                                cancelledOrders.map((order, index) => {
                                                    return (
                                                        <tr key={order.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{order.id}</td>
                                                            <td className='text-capitalize font-weight-bold'>{order.username}</td>
                                                            <td>{order.date.replace('T', ' ').replace('.000Z', ' ')}</td>
                                                            <td>&#x20b9;{order.grandtotal}</td>
                                                            <td>{order.paymentmethod}</td>
                                                            <td>
                                                                <button onClick={() => sendOrderID(order.id)}
                                                                        data-target="#orderDetailsModal"
                                                                        data-toggle="modal" type='button'
                                                                        className='btn btn-dark btn-sm'>
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
                                        <div className='py-4 text-center'>
                                            <img src="../no-orders.png"
                                                 // style={{boxShadow: "2px 3px 5px rgba(0,0,0,0.4)"}}
                                                 alt=""/>
                                        </div>
                                }
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>

            <NewFooter/>

            {/* REACT BOOTSTRAP MODAL - SHIPPING */}
            <Modal
                show={show}
                onHide={handleClose}
                // backdrop="static"
                // keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title>Add Shipping Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='text-center alert-info mb-3 p-3'>
                        <h4 className='text-dark'>Order Number : <span id='orderNum'>{orderid}</span></h4>
                    </div>

                    <form id='shippingForm' className="form-signin">
                        <div className="ui form">
                            <div className="form-group">
                                <input onChange={handleInput} type="text"
                                       placeholder="Enter Company Name"
                                       name="company" className="form-control"
                                       id="company"/>
                            </div>

                            <div className="form-group">
                                <input onChange={handleInput} type="text"
                                       placeholder="Enter Tracking Number"
                                       name="trackingID" className="form-control"
                                       id="trackingID"/>
                            </div>

                            <div className="form-group">
                                <input onChange={handleInput} type="url"
                                       placeholder="Enter Tracking URL"
                                       name="trackingURL" className="form-control"
                                       id="trackingURL"/>
                            </div>

                            <button onClick={submitShippingDetails} type="button"
                                    className="btn btn-block btn-font py-3 btn-primary">
                                SHIP ORDER
                            </button>
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* REACT BOOTSTRAP MODAL - DELIVERY */}
            <Modal
                show={show2}
                onHide={handleClose2}
                // backdrop="static"
                // keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title>Add Delivery Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='text-center alert-warning mb-3 p-3'>
                        <h4 className='text-dark'>Order Number : <span id='orderNum'>{orderid}</span></h4>
                    </div>
                    <form id='deliveryForm' className="form-signin">
                        <div className="ui form">
                            <div className="form-group">
                                <input onChange={handleInput} type="text"
                                       placeholder="Enter Customer Name"
                                       name="customerName" className="form-control"
                                       id="customerName"/>
                            </div>

                            <button onClick={submitDeliveryDetails} type="button"
                                    className="btn btn-block btn-font py-3 btn-primary">
                                DELIVER ORDER
                            </button>
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


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
                                        <span aria-hidden="true" className='text-dark'>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <OrderDetails orderID={orderid}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                            aria-label="Close">
                                        Close
                                    </button>
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