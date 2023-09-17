import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {URL} from "../URL";
import Swal from "sweetalert2";

const TopHeaderAdmin = () => {
    let [loggedIn, setLoggedIn] = useState(false);

    // useEffect(() => {
    // }, []);



    let [displayList, setDisplayList] = useState("none");

    // Toggle My Account
    function ToggleList() {
        if (displayList === "none") {
            setDisplayList("block");
        } else {
            setDisplayList("none");
        }
    }

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
            <div className="header-top black-bg">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8 col-12">
                            <div className="header-top-left">
                                <ul>
                                    <li><span>Email: </span>support@sinrato.com</li>
                                    <li>Free Shipping for all Order of &#x20b9;1999</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-4 col-12">
                            <div className="box box-right">
                                <ul>
                                    <li className="settings">
                                        <a onClick={ToggleList} className="ha-toggle" href="#">
                                            Account Settings<span className="lnr lnr-chevron-down"></span>
                                        </a>

                                        <ul className="box-dropdown ha-dropdown" style={{display: displayList}}>
                                            <li><Link to="/admin/change-password">Change Password</Link></li>
                                            <li><Link onClick={logout} to="/admin/logout">Logout</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopHeaderAdmin