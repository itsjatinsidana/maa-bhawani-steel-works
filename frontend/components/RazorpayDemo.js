// Import the package
import useRazorpay from 'react-razorpay';

// import {useEffect} from "react";

function RazorpayDemo() {
    const Razorpay = useRazorpay();

    let options = {
        key: "rzp_test_A3RM3Asww6uWvF",
        currency: 'INR',
        amount: 0,
        name: "Payment Testing",
        description: "Test Wallet Transaction",
        image: "https://i.pinimg.com/originals/c1/92/9d/c1929d3492c2f64ab65b43808c072043.jpg",
        handler: function (response) {
            let payment_id = response.razorpay_payment_id;
            if(payment_id !== '') {
                alert(response.razorpay_payment_id);
                alert('Payment Done.');
            } else {
                alert('Payment Failed.');
            }

            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature);
        },
        prefill: {
            name: "",
            // email: "",
            email: "user@yahoo.in",
            contact: "1234567890",
            // contact: "",
        },
        theme: {
            "color": "#3399cc"
        }
    };

    let handle_Razorpay = (price) => {
        options.amount = price * 100;

        let rzp = new Razorpay(options);
        rzp.open();
    }

    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="card">
                            <img src="/logo512.png" alt=""/>

                            <div className="card-body text-center">
                                <h2 className='text-dark'>React</h2>
                                <h5 className='text-dark'>&#x20b9; 5000</h5>

                                <button
                                    onClick={() => handle_Razorpay(5000)}
                                    type='button'
                                    className='btn btn-outline-success mt-3 px-5'>Pay
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="card">
                            <img src="/logo512.png" alt=""/>

                            <div className="card-body text-center">
                                <h2 className='text-dark'>React</h2>
                                <h5 className='text-dark'>&#x20b9; 6000</h5>

                                <button
                                    onClick={() => handle_Razorpay(6000)}
                                    type='button'
                                    className='btn btn-outline-success mt-3 px-5'>Pay
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="card">
                            <img src="/logo512.png" alt=""/>

                            <div className="card-body text-center">
                                <h2 className='text-dark'>React</h2>
                                <h5 className='text-dark'>&#x20b9; 7000</h5>

                                <button
                                    onClick={() => handle_Razorpay(7000)}
                                    type='button'
                                    className='btn btn-outline-success mt-3 px-5'>Pay
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="card">
                            <img src="/logo512.png" alt=""/>

                            <div className="card-body text-center">
                                <h2 className='text-dark'>React</h2>
                                <h5 className='text-dark'>&#x20b9; 8000</h5>

                                <button
                                    onClick={() => handle_Razorpay(8000)}
                                    type='button'
                                    className='btn btn-outline-success mt-3 px-5'>Pay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default RazorpayDemo;