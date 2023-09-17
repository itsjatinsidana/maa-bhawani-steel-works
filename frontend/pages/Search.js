import axios from "axios";
import {useState, useEffect} from "react";
import Swal from "sweetalert2";

// NEW
import TopHeader from "../components/new/TopHeader";
import NewNavigation from "../components/new/Navigation";
import BreadCrumb from "../components/new/BreadCrumb";
import NewFooter from "../components/new/NewFooter";
import load from "load-script";

import {URL} from "../components/URL";
import ProductCard from "../components/ProductCard";

function Search() {
    function ToTop() {
        window.scrollTo(0, 0);
        document.title = "User Login | Groceriono";
        document.body.classList.remove("grocino-home");
        document.body.classList.add("grocino-about");
    }

    useEffect(async () => {
        await ToTop();

        load('new/assets/js/vejcustome.js', function (err, script) {
            if (err) {
                // print useful message
            } else {
                // console.log(script.src);
            }
        });
    }, []);

    // ----------

    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(false);

    let [formInputs, setFormInputs] = useState({
        searchText: ''
    });

    // Handle Inputs
    const handle_Inputs = (e) => {
        let key = e.target.name;
        formInputs[key] = e.target.value;
        setFormInputs(formInputs);
    }

    // Search
    const Search = () => {
        if (formInputs.searchText === "") {
            Swal.fire({icon: "warning", title: "Please enter product name..."});
        } else {
            setLoading(true);
            axios.post(`${URL}search`, {
                "searchText": formInputs.searchText,
            }).then(res => {
                if (res.status === 200 && res.statusText === "OK") {
                    // console.log(res.data);

                    if (res.data.length > 0) {
                        // console.log(res.data);
                        setTimeout(async () => {
                            await setData(res.data);
                            await setLoading(false);
                            await window.scrollTo(0, 220);
                            // await window.scrollTo(0, 300);
                        }, 1000);
                    } else {
                        window.scrollTo(0, 0);
                        setData([]);
                        setLoading(false);
                        Swal.fire({
                            icon: 'warning',
                            title: 'Product Not Found',
                        });
                        document.getElementById('search').reset();
                    }
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    return (
        <>
            <TopHeader/>

            <div className="home-header home-header2">
                <NewNavigation  logo="assets/img/logo/logo-sinrato.png" />
            </div>

            <div className="py-5">
                <div className="container">
                    <div className="row">
                        <BreadCrumb title="Search Your Product"/>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <form id="search" className="form-signin">
                                <div className="ui form">
                                    <div className="ui left icon input field w-100">
                                        <input onChange={handle_Inputs}
                                               type="text"
                                               placeholder="Enter Product Name"
                                               name="searchText"
                                               id="searchText"/>
                                    </div>


                                    <button disabled={loading} onClick={Search} type="button"
                                            className="btn btn-orange btn-block">
                                        {
                                            loading
                                                ?
                                                <span className={"spinner-border"}></span>
                                                :
                                                <>Search</>
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {
                data.length > 0 &&
                <div className="category-section2">
                    <div className="container">
                        <div id="category-filter">
                            <div className="row">
                                <div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <div className="row filter-products">
                                        {
                                            data.map((product) => {
                                                return (
                                                    <ProductCard key={product.productid} details={product}/>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            }

            <NewFooter/>
        </>
    );
}

export default Search;