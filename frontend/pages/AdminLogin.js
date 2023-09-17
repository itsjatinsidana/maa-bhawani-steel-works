import axios from "axios";
import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

import {URL} from "../components/URL";

// NEW
import TopHeader from "../components/new/TopHeader";
import NewNavigation from "../components/new/Navigation";
import BreadCrumb from "../components/new/BreadCrumb";
import NewFooter from "../components/new/NewFooter";
import load from "load-script";
import AfterFooter from "../components/AfterFooter";

function UserLogin() {
    let navigate = useNavigate();

    let [formInputs, setFormInputs] = useState({
        username: '',
        password: ''
    });

    useEffect( () => {
        document.title = "Admin Login";
    }, []);

    const handle_Inputs = (e) => {
        let key = e.target.name;
        formInputs[key] = e.target.value;
        setFormInputs(formInputs);
    }

    const login = () => {
        let {username, password} = formInputs;

        if (username &&  password){
            axios.post(`${URL}admin-login`, {
                "username": username,
                "password": password
            }).then(res => {
                if (res.status === 200 && res.statusText === "OK") {
                    // console.log(res.data);

                    if(res.data === 'success'){
                        navigate('/admin/dashboard');
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Invalid Username or Password',
                        })
                    }
                }
            }).catch(err => {
                console.log(err);
            })
        }  else {
            Swal.fire({
                title: 'All Fields Are Required.',
                icon: 'warning',
            });
        }
    }

    let [passwordType, setPasswordType] = useState("password");

    function TogglePassword() {
        if (passwordType === "password") {
            setPasswordType("text")
        } else {
            setPasswordType("password")
        }
    }

    return (
        <>
            <header className="header-pos mb-40">
                <TopHeader/>

                <NewNavigation logo="assets/img/logo/logo-sinrato.png" />
            </header>

            <BreadCrumb title="Admin Login"/>

            <div className="login-wrapper pb-70">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <main id="primary" className="site-main">
                                <div className="user-login">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="section-title text-center">
                                                <h3>Log in to your account</h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div
                                            className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-6 offset-lg-2 offset-xl-3">
                                            <div className="login-form">
                                                <form>
                                                    <div className="form-group row align-items-center mb-4">
                                                        <label htmlFor="email"
                                                               className="col-12 col-sm-12 col-md-4 col-form-label">
                                                            Username *</label>
                                                        <div className="col-12 col-sm-12 col-md-8">
                                                            <input onChange={handle_Inputs}
                                                                   type="text" className="form-control" name="username"
                                                                   placeholder="Username" required/>
                                                        </div>
                                                    </div>

                                                    <div className="form-group row align-items-center mb-4">
                                                        <label htmlFor="c-password"
                                                               className="col-12 col-sm-12 col-md-4 col-form-label">Password
                                                            *</label>
                                                        <div className="col-12 col-sm-12 col-md-8">
                                                            <input onChange={handle_Inputs}
                                                                   type={passwordType} className="form-control"
                                                                   name="password" placeholder="Password" required/>
                                                            <button onClick={TogglePassword} className="pass-show-btn"
                                                                    type="button">Show
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="login-box mt-5 text-center">
                                                        <button type="button" onClick={login}
                                                                className="btn btn-secondary mb-4 mt-4">Sign In
                                                        </button>
                                                    </div>

                                                    {/*<div className="text-center pt-20 top-bordered">*/}
                                                    {/*    <p>*/}
                                                    {/*        No account? <Link to="/user-signup">Create one here</Link>.*/}
                                                    {/*    </p>*/}
                                                    {/*</div>*/}
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>

            <NewFooter/>
        </>
    );
}

export default UserLogin;