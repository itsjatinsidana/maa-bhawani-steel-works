import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import {URL} from "./URL";

const AfterFooterAdmin = () => {
    let navigate = useNavigate();

    // LOGOUT ACTION
    const logout = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure to logout?',
            // text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`${URL}admin/logout`).then(res => {
                    // console.log(res.data);

                    if (res.status === 200 && res.statusText === "OK") {
                        if (res.data === 'loggedOut') {
                            navigate('/admin-login');
                        }
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        })
    }

    return (
        <>
            <div className="mobile-menu-wrapper">
                <div className="mobile-menu-overlay"></div>
                <a href="#" className="mobile-menu-close"><i className="close-icon"></i></a>

                <div className="mobile-menu-container scrollable">
                    <div className="tab-content">
                        <div className="" id="main-menu">
                            <ul className="mobile-menu">
                                <li><Link to="/admin/dashboard">Home</Link></li>

                                <li>
                                    <a href="#">Manage</a>
                                    <ul>
                                        <li><Link to="/admin/manage-category">Manage Category</Link></li>
                                        <li><Link to="/admin/manage-sub-category">Manage Sub-Category</Link></li>
                                        <li><Link to="/admin/manage-product">Manage Products</Link></li>
                                    </ul>
                                </li>

                                <li>
                                    <Link to="/admin/orders">Orders</Link>
                                </li>

                                <li>
                                    <a href="#">Settings</a>
                                    <ul>
                                        <li><Link to="/admin/change-password">Change Password</Link></li>
                                        <li><Link onClick={logout} to="/admin/logout">Logout</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AfterFooterAdmin;