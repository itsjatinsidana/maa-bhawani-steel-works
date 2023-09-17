import {useState, useEffect, useContext} from "react";
import {Link, useParams} from "react-router-dom";

import {LoadingScreen} from "../components/ReactLoadingAnimation";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import {URL} from "../components/URL";
import axios from "axios";


function SubProducts() {
    let params = useParams();
    // console.log(params);
    let sub_cat_ID = params.id;


    let [products, setProducts] = useState([]);
    let [loading, setLoading] = useState(true);

    let FetchAPI = async (id) => {
        await axios.post(`${URL}sub-products`, {
            id: id
        }).then(res => {
            // console.log(res);
            // console.log(res.status);
            // console.log(res.data);

            setProducts(res.data);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }).catch(err => {
            console.log(err);
        });
    }

    function ToTop() {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        FetchAPI(sub_cat_ID);
        ToTop();
        document.title = "Laramiss | Products";
    }, [sub_cat_ID]);

    return (
        <>
            <Navigation logo="assets/img/logo/logo-sinrato.png" />

            {/* Products*/}
            <section className="restaurant-tab-area pt-115 pb-85">
                <div className="container">
                    <div className="section-title text-center mb-50">
                        <div className="section-title-icon">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 version="1.1" width="45" height="45" x="0" y="0"
                                 viewBox="0 0 512 512" className="">
                                <path
                                    d="M369.853,250.251l-100-241C267.53,3.65,262.062,0,255.999,0s-11.531,3.65-13.854,9.251l-100,241    c-1.527,3.681-1.527,7.817,0,11.498l100,241c2.323,5.601,7.791,9.251,13.854,9.251s11.531-3.65,13.854-9.251l100-241    C371.381,258.068,371.381,253.932,369.853,250.251z M255.999,457.861L172.239,256l83.76-201.861L339.759,256L255.999,457.861z"
                                    fill="#ffffff"/>
                                <path className="diamond-spark spark-1"
                                      d="M139.606,118.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C145.465,133.748,145.465,124.25,139.606,118.393z"
                                      fill="#ffffff"/>
                                <path className="diamond-spark spark-2"
                                      d="M456.607,55.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394l63-63C462.465,70.748,462.465,61.25,456.607,55.393z"
                                      fill="#ffffff"/>
                                <path className="diamond-spark spark-3"
                                      d="M139.606,372.393c-5.858-5.857-15.356-5.857-21.213,0l-63,63c-5.858,5.858-5.858,15.356,0,21.213    C58.322,459.535,62.16,461,65.999,461s7.678-1.465,10.607-4.394l63-63C145.465,387.748,145.465,378.25,139.606,372.393z"
                                      fill="#ffffff"/>
                                <path className="diamond-spark spark-4"
                                      d="M456.607,435.393l-63-63c-5.858-5.857-15.356-5.857-21.213,0c-5.858,5.858-5.858,15.356,0,21.213l63,63    c2.928,2.929,6.767,4.394,10.606,4.394s7.678-1.465,10.607-4.394C462.465,450.748,462.465,441.25,456.607,435.393z"
                                      fill="#ffffff"/>
                            </svg>
                        </div>

                        {
                            !products.length ?
                                ""
                                :
                                <h2>Products</h2>
                        }
                    </div>


                    <div className="row">
                        {loading ?
                            <>
                                <div style={{height: "200px"}}>
                                    <div style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%,-50%)",
                                    }}>
                                        <LoadingScreen type="spokes" color="#fcd462"/>
                                        <p>loading...</p>
                                    </div>
                                </div>
                            </> :
                            <>
                                {
                                    !products.length ?
                                        <>
                                            <div style={{height: "250px"}}>
                                                <div style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform: "translate(-50%,-50%)",
                                                }}>
                                                    <img src="/product-not-found.png" alt=""/>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        products.map((product) => {
                                            return (
                                                <ProductCard key={product.productid} details={product}/>
                                            );
                                        })
                                }
                            </>
                        }
                    </div>
                </div>
            </section>

            <Footer/>
        </>
    );
}

export default SubProducts;