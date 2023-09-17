import {useState, useEffect} from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

// Public - Components
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDescription from "./pages/ProductDescription";
import ShoppingCart from "./pages/ShoppingCart";
import Contact from "./pages/Contact";
import SubProducts from "./pages/SubProducts";
import RazorpayDemo from "./components/RazorpayDemo";
import FormValidation from "./components/FormValidation";
import {URL} from "./components/URL";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import Search from "./pages/Search";
import CascadingDropdownMenu from "./CascadingDropdownMenu";

// User - Components
import UserDashboard from "./pages/user/UserDashboard";
import UserChangePassword from "./pages/user/ChangePassword"
import MyOrders from "./pages/user/MyOrders";

// Admin - Components
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCategory from "./pages/admin/manage/ManageCategory";
import ManageSubCategory from "./pages/admin/manage/ManageSubCategory";
import ManageProduct from "./pages/admin/manage/ManageProduct";
import ManageProductOld from "./pages/admin/manage/ManageProductOld";
import ManageOrders from "./pages/admin/ManageOrders";
import ChangePassword from "./pages/admin/ChangePassword";

// Context
import {CartContext} from "./CartContext";
import axios from "axios";
import SubCategoryPage from "./pages/SubCategoryPage";
import ProductsBySubCategory from "./pages/ProductsBySubCategory";

function App() {
    let [cart, setCart] = useState({});

    let [cartCount, setCartCount] = useState(0);

    let Fetch_CartCount = () => {
        axios.post(`${URL}add-to-cart`, {
            action: 'cartCount'
        }).then(res => {
            // console.log(res);

            if (res.status === 200 && res.statusText === "OK") {
                // console.log(res.data);

                if (res.data.count) {
                    setCartCount(res.data.count)
                }
            }
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        Fetch_CartCount();
    }, []);

    return (
        <Router>
            <CartContext.Provider value={{cart, setCart, cartCount, setCartCount}}>
                <Routes>
                    {/*  PUBLIC ROUTES  */}
                    <Route path="/" element={<Home name="Home"/>}/>
                    <Route path="/home" element={<Home name="Home"/>}/>
                    <Route path="/cascade" element={<CascadingDropdownMenu/>}/>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/products/:subcategoryid" element={<ProductsBySubCategory/>}/>
                    <Route path="/product-description/:id" element={<ProductDescription/>}/>
                    <Route path="/sub-products/:id" element={<SubProducts/>}/>
                    <Route path="/cart" element={<ShoppingCart/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/razor" element={<RazorpayDemo/>}/>
                    <Route path="/form" element={<FormValidation/>}/>
                    <Route path="/user-login" element={<UserLogin/>}/>
                    <Route path="/user-signup" element={<UserSignup/>}/>
                    <Route path="/admin-login" element={<AdminLogin/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/subcategorypage/:categoryid" element={<SubCategoryPage/>}/>

                    {/*  USER ROUTES  */}
                    {/*<Route path="/dashboard" element={<UserDashboard/>}/>*/}
                    <Route path="/users/dashboard" element={<UserDashboard/>}/>
                    <Route path="/users/change-password" element={<UserChangePassword/>}/>
                    <Route path="/users/my-orders" element={<MyOrders/>}/>

                    {/*  ADMIN ROUTES  */}
                    <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
                    <Route path="/admin/manage-category" element={<ManageCategory/>}/>
                    <Route path="/admin/manage-sub-category" element={<ManageSubCategory/>}/>
                    <Route path="/admin/manage-product" element={<ManageProduct/>}/>
                    <Route path="/admin/manage-product-old" element={<ManageProductOld/>}/>
                    <Route path="/admin/manage-orders" element={<ManageOrders/>}/>
                    <Route path="/admin/change-password" element={<ChangePassword/>}/>
                </Routes>
            </CartContext.Provider>
        </Router>
    );
}

export default App;
