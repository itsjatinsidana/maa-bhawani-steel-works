import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {URL} from "../URL";

const TopHeader = () => {
    let [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        checkLogin();
    }, []);

    // Check User Login
    const checkLogin = () => {
        axios.get(`${URL}users/check-login`)
            .then(res => {
                console.log(res.data);
                if (res.status === 200 && res.statusText === "OK") {
                    if (res.data === 'notLogged') {
                        setLoggedIn(false);
                    } else {
                        setLoggedIn(true);
                    }
                }
            }).catch(err => {
            console.log(err);
        });
    }

    let [displayList, setDisplayList] = useState("none");

    // Toggle My Account
    function ToggleList() {
        if (displayList === "none") {
            setDisplayList("block");
        } else {
            setDisplayList("none");
        }
    }

    return (
        <>
            <div className="header-top black-bg">
                <marquee direction="left" style={{fontsize:'15px',background:'black',color:'white'}}>
                    <span>Welcome happy customers </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </marquee>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8 col-12">
                            <div className="header-top-left">
                                <ul>
                                    <li><span>Email: </span>support@maabhawanisteelworks.com</li>
                                    <li>Free Shipping for all Order of &#x20b9;1999</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-4 col-12">
                            <div className="box box-right">
                                <ul>
                                    <li className="settings">
                                        <a onClick={ToggleList} className="ha-toggle" href="#">My Account<span
                                            className="lnr lnr-chevron-down"></span>
                                        </a>

                                        <ul className="box-dropdown ha-dropdown" style={{display: displayList}}>
                                            {
                                                loggedIn ?
                                                    <>
                                                        <li><Link to="/users/dashboard">Dashboard</Link></li>
                                                        <li><Link to="/users/change-password">Change Password</Link></li>
                                                    </>
                                                    :
                                                    <>
                                                        <li><Link to="/user-signup">Register</Link></li>
                                                        <li><Link to="/user-login">Login</Link></li>
                                                    </>

                                            }
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

export default TopHeader