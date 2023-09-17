import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import {URL} from "../../components/URL";
import AfterFooterUser from "../../components/AfterFooterUser";

// NEW
import TopHeader from "../../components/new/TopHeader";
import UserNavigation from "../../components/UserNavigation";
import NewFooter from "../../components/new/NewFooter";
import NewNavigation from "../../components/new/Navigation";
import BreadCrumb from "../../components/new/BreadCrumb";
import TopHeaderUser from "../../components/new/TopHeaderUser";

function UserDashboard() {
    let navigate = useNavigate();

    useEffect(async () => {
        document.title = "User Home";
    }, []);

    // Check User Login
    const checkLogin = () => {
        axios.get(`${URL}users/check-login`)
            .then(res => {
                // console.log(res.data);

                if (res.status === 200 && res.statusText === "OK") {
                    if (res.data === 'notLogged') {
                        navigate('/user-login');
                    } else {

                    }
                }
            }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <>
            <header className="header-pos mb-40">
                <TopHeaderUser/>

                <UserNavigation/>
            </header>

            <div className="container">
                <div className="mt-10 mb-10">
                    <div className="col-lg-8 col-md-8 col-sm-10 col-12 mx-auto">
                        <h1 className='jumbotron text-dark text-center'>Welcome User</h1>
                    </div>
                </div>
            </div>

            <NewFooter/>
        </>
    );
}

export default UserDashboard;