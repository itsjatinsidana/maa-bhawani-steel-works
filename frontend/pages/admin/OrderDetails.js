import {useEffect, useState} from "react";
import axios from "axios";
import {URL} from "../../components/URL";

function OrderDetails(props) {
    // console.log(props);

    let [orderDetails, setOrderDetails] = useState([]);

    const fetchOrderDetails = (oid) => {
        axios.post(`${URL}admin/order-details`, {
            orderid: oid,
        }).then(res => {
            // console.log(res.data);
            // console.log(res.data.length);

            if (res.status === 200 && res.statusText === "OK") {
                if (res.data.length) {
                    setOrderDetails(res.data);
                }
            }
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        fetchOrderDetails(props.orderID);
    }, [props.orderID]);

    return (
        <>
            <table className='table table-borderless' style={{fontSize:"15px"}}>
                <thead style={{color: "#fff", background: "#007BFF"}}>
                <tr>
                    <th>#</th>
                    <th>Photo</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Discount(in %)</th>
                    <th>Net Price</th>
                    <th>Quantity</th>
                </tr>
                </thead>

                <tbody>

                {
                    orderDetails.map((order, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <img srcSet={URL + order.photo} style={{height:"50px",borderRadius:"5px"}} alt=""/>
                                </td>
                                <td className='text-capitalize'>{order.productname}</td>
                                <td>&#x20b9;{order.price}</td>
                                <td>{order.discount}</td>
                                <td>&#x20b9;{order.netprice}</td>
                                <td>{order.quantity}</td>
                            </tr>
                        )
                    })
                }

                </tbody>
            </table>
        </>
    );
}

export default OrderDetails;