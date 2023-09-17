import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import {URL} from "./URL";

const AfterFooterUser = () => {
    let navigate = useNavigate();

    // LOGOUT ACTION
    // Logout
    const logout = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`${URL}users/logout`)
                    .then(res => {
                        if (res.status === 200 && res.statusText === "OK") {
                            if (res.data === 'loggedOut') {
                                navigate('/user-login');
                            }
                        }
                    }).catch(err => {
                    console.log(err);
                });
            }
        });
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
                                <li><Link to="/users/dashboard">Home</Link></li>

                                <li>
                                    <Link to="/users/my-orders">My Orders</Link>
                                </li>

                                <li>
                                    <a href="#">Settings</a>
                                    <ul>
                                        <li><Link to="/admin/change-password">Change Password</Link></li>
                                        <li><Link onClick={logout} to="/users/logout">Logout</Link></li>
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

export default AfterFooterUser;