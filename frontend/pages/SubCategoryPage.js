import TopHeader from "../components/new/TopHeader";
import NewNavigation from "../components/new/Navigation";
import BreadCrumb from "../components/new/BreadCrumb";
import Footer from "../components/Footer";
import NewFooter from "../components/new/NewFooter";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {URL} from "../components/URL";
import {useNavigate, useParams} from "react-router-dom";
import {CartContext} from "../CartContext";


const SubCategoryPage = () => {
    let navigate = useNavigate();
    let {categoryid} = useParams();

    let {cart, setCart, cartCount, setCartCount} = useContext(CartContext);

    let [loading, setLoading] = useState(true);
    let [loggedIn, setLoggedIn] = useState(false);
    let [subcategorylist, setSubCategoryList] = useState([]);

    function ToTop() {
        window.scrollTo(0, 0);
    }

    function getSubCategoryList(){
        axios.get(`${URL}get-subcategory?categoryid=${categoryid}`)
            .then(res => {
                setSubCategoryList(res.data)
                console.log(res.data)
            }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        // console.log(categoryid)
        ToTop();
        axios.get(`${URL}users/check-login`)
            .then(res => {
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
        getSubCategoryList();
    }, []);


    return (
        <>
            <header className="header-pos mb-40">
                <TopHeader/>

                <NewNavigation logo="../assets/img/logo/logo-sinrato.png" />
            </header>

            <BreadCrumb title="Sub Category"/>

            <div className="main-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="product-shop-main-wrapper mb-50" style={{"border":"0px solid #333"}}>
                                <h1>Sub Category</h1>
                                <hr/>
                                <div className="col-md-12 col-sm-12">
                                    {
                                        subcategorylist.length > 0 ?
                                            subcategorylist.map((row,index)=>{
                                                return(
                                                    <>
                                                        <a href={'/products/' + row.subcategoryid} className="subcategorylink">
                                                            {row.subcategoryname}
                                                        </a>
                                                    </>
                                                );
                                            }) : ""
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <NewFooter/>
        </>
    );
}

export default SubCategoryPage;