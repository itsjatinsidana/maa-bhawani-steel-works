import axios from "axios";
import {useState, useEffect} from "react";
import Swal from "sweetalert2";

// NEW
import TopHeader from "../../components/new/TopHeader";
import UserNavigation from "../../components/UserNavigation";
import NewFooter from "../../components/new/NewFooter";
import BreadCrumb from "../../components/new/BreadCrumb";

import {URL} from "../../components/URL";
import OrderDetails from "../admin/OrderDetails";
import {Tab, Tabs} from "react-bootstrap";
import AfterFooterUser from "../../components/AfterFooterUser";
import TopHeaderUser from "../../components/new/TopHeaderUser";

function MyOrders() {
    let [orders, setOrders] = useState([]);

    const MyOrders = () => {
        axios.get(`${URL}users/my-orders`)
            .then(res => {
                if (res.status === 200 && res.statusText === "OK") {
                    if (res.data.length) {
                        setOrders(res.data);
                    }
                }
            }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        MyOrders();
        document.title = "My Orders | Groceriono";
    }, []);

    let [orderid, setOrderID] = useState(null);

    const sendOrderID = (id) => {
        setOrderID(id);
    }

    // Cancel Order
    function cancelOrder(id) {
        Swal.fire({
            title: 'Are you sure to Cancel Order?',
            // text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`${URL}users/cancel-order`, {
                    id
                }).then(res => {
                    if (res.data === 'cancelled') {
                        MyOrders();
                        Swal.fire({
                            icon: "success",
                            title: "Order Cancelled"
                        });
                    }
                });
            }
        });
    }

    return (
        <>
            <header className="header-pos mb-40">
                <TopHeaderUser/>

                <UserNavigation/>
            </header>

            <BreadCrumb title="My Orders"/>

            <div className="container">
                <div className="mt-10 mb-10">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-10 col-12 mx-auto">

                            {
                                orders.length === 0 ?
                                    <>
                                        <div className='py-4 text-center'>
                                            <img src="../no-orders.png" alt=""/>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="table-responsive">
                                            <table className='table table-borderless' style={{fontSize: "15px"}}>
                                                <thead style={{color: "#000", background: "#FEDC19"}}>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Order&nbsp;Number</th>
                                                    <th>Status</th>
                                                    <th>Date</th>
                                                    <th>Total&nbsp;Amount</th>
                                                    <th>Payment&nbsp;Mode</th>
                                                    <th>View&nbsp;Details</th>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                {
                                                    orders.map((order, index) => {
                                                        return (
                                                            <tr key={order.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{order.id}</td>
                                                                <td>{order.status}</td>
                                                                <td>{order.date.replace('T', ' ').replace('.000Z', ' ')}</td>
                                                                <td>&#x20b9;{order.grandtotal}</td>
                                                                <td>{order.paymentmethod}</td>

                                                                <td>
                                                                    {
                                                                        order.status === 'Placed'
                                                                            ?
                                                                            <button
                                                                                onClick={() => cancelOrder(order.id)}
                                                                                type='button'
                                                                                className='btn btn-danger btn-sm'>
                                                                                Cancel Order
                                                                            </button>
                                                                            :
                                                                            <button onClick={() => sendOrderID(order.id)}
                                                                                    data-target="#orderDetailsModal"
                                                                                    data-toggle="modal"
                                                                                    type='button'
                                                                                    className='btn btn-light btn-sm'>
                                                                                View Details
                                                                            </button>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <NewFooter/>

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
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyOrders;

