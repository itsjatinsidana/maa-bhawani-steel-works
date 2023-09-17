import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {Modal, Button, Table} from "react-bootstrap";
import ReactTooltip from 'react-tooltip';
import {FcFullTrash, FcEditImage} from "react-icons/fc";

import {URL} from "../../../components/URL";

import TopHeader from "../../../components/new/TopHeader";
import AdminNavigation from "../../../components/AdminNavigation";
import BreadCrumb from "../../../components/new/BreadCrumb";
import NewFooter from "../../../components/new/NewFooter";
import load from "load-script";
import AfterFooterAdmin from "../../../components/AfterFooterAdmin";
import TopHeaderAdmin from "../../../components/new/TopHeaderAdmin";

function ManageProduct() {
    let [category, setCategory] = useState([]);

    // ADD MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // UPDATE MODAL
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    function ToTop() {
        window.scrollTo(0, 0);
        document.title = "Manage Product";
        document.body.classList.remove("home");
        // document.body.classList.add("about-us");
    }

    useEffect(async () => {
        await ToTop();

        GetCategory();
        GetProduct();
    }, []);

    // Fetch Category on Component Mount...
    function GetCategory() {
        axios.post(`${URL}admin/manage-category`, {
            "action": "view"
        }).then(res => {
            // console.log(res.data.length);

            if (res.data.length > 0) {
                setCategory(res.data);
            }
            // else {
            //     setError(true);
            // }
        });
    }

    let [subcategory, setSubcategory] = useState([]);

    // Fetch Sub-Category onChange of Categories...
    function GetSubCategory(e) {
        // console.log(e.target.value);
        let id = e.target.value;

        axios.post(`${URL}admin/manage-product`, {
            id,
            "action": "subcategory"
        }).then(res => {
            // console.log(res.data);
            // console.log(res.data.length);

            if (res.data.length > 0) {
                setSubcategory(res.data);
            } else {
                setSubcategory([]);
            }
        });
    }

    let [formInputs, setFormInputs] = useState({
        subcategory: '',
        product: '',
        price: 0,
        discount: 0,
        description: ''
    });

    let [photo, setPhoto] = useState(null);

    // Handle Add Form Inputs...
    const handle_Inputs = (e) => {
        // console.log(e.target.type);

        if (e.target.type === "file") {
            setPhoto(null);

            let name = e.target.files[0].name.toLowerCase();
            let extension = name.endsWith("png") || name.endsWith("jpg") || name.endsWith("jpeg");
            // console.log(extension);

            let size = parseFloat(e.target.files[0].size / 1024).toFixed(1);
            // console.log(size);

            if (!extension) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Invalid Image Format',
                    text: 'Choose png or jpg image.'
                });
                // setPhotoError1(true);
                document.getElementById('photo').value = "";
            } else if (size > 500) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Large File Size',
                    text: 'File size must be less than 500 Kb.'
                });
                // setPhotoError2(true);
                document.getElementById('photo').value = "";
            } else {
                setPhoto(e.target.files[0])
                // setPhoto({selectedFile: e.target.files[0]})
            }
        } else {
            let key = e.target.name;
            formInputs[key] = e.target.value;
        }

        // console.log(formInputs);
        setFormInputs(formInputs);
    }

    // Add Product Action
    const handle_Add_Product = () => {
        let {subcategory, product, price, discount, description} = formInputs;

        if (subcategory && product && price && discount && photo !== null && description) {
            let action = "add";
            let formData = new FormData();
            formData.append("subcategory", subcategory);
            formData.append("product", product);
            formData.append("price", price);
            formData.append("discount", discount);
            formData.append("photo", photo);
            formData.append("description", description);
            formData.append("action", action);

            axios.post(`${URL}admin/manage-product`, formData).then(res => {
                    if (res.status === 200 && res.statusText === "OK") {
                        // console.log(res.data);

                        if (res.data === 'added') {
                            GetProduct();

                            Swal.fire({
                                icon: 'success',
                                title: 'Product Added Successfully',
                            });

                            document.getElementById('category-form').reset();

                            setFormInputs({
                                subcategory: '',
                                product: '',
                                price: '',
                                discount: '',
                                description: ''
                            });

                            setPhoto(null);
                            // setPhoto({selectedFile: null});
                        } else {
                            Swal.fire({
                                title: "Error Occurred",
                                icon: 'error',
                                text: 'Product Not Added.',
                            });
                        }
                    }
                }
            ).catch(err => {
                console.log(err);
            })
        } else {
            Swal.fire({
                title: 'All Fields Are Required.',
                icon: 'warning',
                // text: 'All Fields Are Required.',
            });
        }
    }

    let [product, setProduct] = useState([]);
    let [error, setError] = useState(false);

    // Fetch Product on Component Mount...
    function GetProduct() {
        axios.post(`${URL}admin/manage-product`, {
            "action": "view"
        }).then(res => {
            // console.log(res.data);
            // console.log(res.data.length);

            if (res.data.length > 0) {
                setProduct(res.data);
            } else {
                setError(true);
            }
        });
    }

    // Delete
    const Delete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(id);

                axios.post(`${URL}admin/manage-product`, {
                    id,
                    "action": "delete"
                }).then(res => {
                    // console.log(res.data);

                    if (res.data === "deleted") {
                        GetProduct();

                        Swal.fire(
                            'Deleted!',
                            'Product Deleted.',
                            'success'
                        )
                    } else {
                        Swal.fire(
                            'Foreign Key Error!',
                            'Record exist in child table.',
                            'error'
                        )
                    }
                });
            }
        })
    }

    let [editData, setEditData] = useState({
        category: '',
        subcategory: '',
        id: '',
        product: '',
        price: 0,
        discount: 0,
        description: ''
    });

    let [photoEdit, setPhotoEdit] = useState(null);
    let [photoDisplay, setPhotoDisplay] = useState(null);

    // Handle Edit Form Inputs...
    const handle_Inputs2 = (e) => {
        if (e.target.type === "file") {
            setPhotoEdit(null);

            let name = e.target.files[0].name.toLowerCase();
            let extension = name.endsWith("png") || name.endsWith("jpg") || name.endsWith("jpeg");
            // console.log(extension);

            let size = parseFloat(e.target.files[0].size / 1024).toFixed(1);
            // console.log(size);

            if (!extension) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Invalid Image Format',
                    text: 'Choose png or jpg image.'
                });
                // setPhotoError1(true);
                document.getElementById('photo').value = "";
            } else if (size > 100) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Large File Size',
                    text: 'File size must be less than 100 Kb.'
                });
                // setPhotoError2(true);
                document.getElementById('photo').value = "";
            } else {
                setPhotoEdit(e.target.files[0])
            }
        } else {
            let key = e.target.name;
            editData[key] = e.target.value;
        }

        console.log(editData);
        setEditData(editData);
    }

    // Show Edit Modal
    const ShowEditModal = (id) => {

        let oneSubCategory = product.filter((value) => value.productid === id);

        // Get Sub-Category
        axios.post(`${URL}admin/manage-product`, {
            id: oneSubCategory[0].categoryid,
            "action": "subcategory"
        }).then(res => {
            if (res.data.length > 0) {
                setSubcategory(res.data);
            } else {
                setSubcategory([]);
            }
        });


        setEditData({
            category: oneSubCategory[0].categoryid,
            subcategory: oneSubCategory[0].subcategoryid,
            id: oneSubCategory[0].productid,
            product: oneSubCategory[0].productname,
            price: oneSubCategory[0].price,
            discount: oneSubCategory[0].discount,
            description: oneSubCategory[0].pdescription,
        });

        setPhotoDisplay(oneSubCategory[0].photo);

        handleShow2();
    }

    // Update Category Action
    const handle_Update_Product = () => {
        let {category, subcategory, id, product, price, discount, description} = editData;

        if (subcategory && product && price && discount && description) {
            console.log(subcategory, id, product, price, discount, description);

            let form_Data = new FormData();
            form_Data.append("subcategory", subcategory);
            form_Data.append("id", id);
            form_Data.append("product", product);
            form_Data.append("price", price);
            form_Data.append("discount", discount);
            form_Data.append("photo", photoEdit);
            form_Data.append("description", description);
            form_Data.append("action", "edit");

            axios.post(`${URL}admin/manage-product`, form_Data)
                .then(res => {
                        if (res.status === 200 && res.statusText === "OK") {
                            // console.log(res.data);

                            if (res.data === 'updated') {
                                GetProduct();

                                Swal.fire({
                                    icon: 'success',
                                    text: 'Product Updated Successfully',
                                });
                            } else {
                                Swal.fire({
                                    title: "Error Occurred",
                                    icon: 'error',
                                    text: 'Product Not Added.',
                                });
                            }
                        }
                    }
                ).catch(err => {
                console.log(err);
            });
        } else {
            Swal.fire({
                title: 'All Fields Are Required.',
                icon: 'warning',
                // text: 'All Fields Are Required.',
            });
        }
    }

    return (
        <>
            <header className="header-pos mb-40">
                <TopHeaderAdmin/>

                <AdminNavigation logo="../new/img/logos/logo.png"/>
            </header>

            <BreadCrumb title="Manage Products"/>

            <div className="container-fluid">
                <div className={"mb-4"}>
                    <Button className="btn btn-secondary"
                            onClick={() => setShow(true)}>Add New Product</Button>
                </div>

                <>
                    {
                        error || product.length === 0 ?
                            <div className={"text-center"}>
                                {/*<img src="../noData.jpg" style={{height: "350px"}} alt=""/>*/}
                                <div className="alert alert-danger">
                                    No Data Found
                                </div>
                            </div>
                            :
                            <Table responsive bordered hover>
                                <thead style={{color: "#000", background: "#FEDC19"}}>
                                <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Discount</th>
                                    <th>Description</th>
                                    <th>Delete</th>
                                    {/*<th colSpan={2}>Controls</th>*/}
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    product.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>

                                                <td>
                                                    <h5>
                                                        <img srcSet={URL + value.photo}
                                                             style={{
                                                                 width: '75px',
                                                                 height: '75px',
                                                                 borderRadius:"10px"
                                                             }}
                                                             alt=""/>

                                                        <br/>
                                                        {value.productname}
                                                    </h5>
                                                </td>

                                                <td>&#x20b9;{value.price}</td>
                                                <td>{value.discount}%</td>
                                                <td>{value.pdescription}</td>
                                                <td>
                                                    <i onClick={() => Delete(value.productid)}
                                                       style={{fontSize: "1.2rem"}}
                                                       data-tip="Delete Product"
                                                       className="text-danger fa fa-times-circle"></i>

                                                    {/*<FcFullTrash data-tip="Delete Product"*/}
                                                    {/*             onClick={() => Delete(value.productid)}*/}
                                                    {/*             style={{fontSize: "1.5rem"}}/>*/}
                                                    <ReactTooltip/>
                                                </td>
                                                {/*<td>*/}
                                                {/*    <FcEditImage data-tip="Edit Category"*/}
                                                {/*                 onClick={() => ShowEditModal(value.productid)}*/}
                                                {/*                 style={{fontSize: "1.2rem"}}/>*/}
                                                {/*    <ReactTooltip/>*/}
                                                {/*</td>*/}
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </Table>
                    }
                </>
            </div>

            <NewFooter/>

            {/* ADD MODAL - 1 */}
            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                // aria-labelledby="contained-modal-title-vcenter"
                aria-labelledby="example-modal-sizes-title-lg"
                centered>
                <Modal.Header>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form id={"category-form"} className="form-signin">
                        <div className="ui form">
                            <div className="row">
                                {/* Category */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <select
                                            onChange={(e) => GetSubCategory(e)}
                                            name="category" id="category" className="form-control">
                                            <option value="">Select Category</option>
                                            {
                                                category.map((value, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={value.categoryid}>
                                                            {value.categoryname}
                                                        </option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                {/* Sub-Category */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <select onChange={handle_Inputs} name="subcategory" id="subcategory"
                                                className="form-control">
                                            <option value="">Select Sub-Category</option>
                                            {
                                                subcategory.map((value, index) => {
                                                    return (
                                                        <option key={index}
                                                                value={value.subcategoryid}>{value.subcategoryname}</option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input onChange={handle_Inputs} type="text"
                                               placeholder="Enter Product Name"
                                               className="form-control"
                                               name="product" id="product"/>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input onChange={handle_Inputs} type="file" className="form-control"
                                               name="photo" id="photo"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input onChange={handle_Inputs} type="text"
                                               placeholder="Enter Price" className="form-control"
                                               name="price" id="price"/>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input onChange={handle_Inputs} type="text"
                                               placeholder="Enter Discount" className="form-control"
                                               name="discount" id="discount"/>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                    <textarea onChange={handle_Inputs}
                                              name="description" id="description"
                                              className="form-control"
                                              placeholder="Enter Description"/>
                            </div>

                            <div className="form-group">
                                <button onClick={handle_Add_Product} type="button"
                                        className="btn btn-block btn-font py-3 btn-primary">
                                    Add Product
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* UPDATE MODAL - 2 */}
            <Modal
                size="lg"
                show={show2}
                onHide={handleClose2}
                aria-labelledby="example-modal-sizes-title-lg"
                // aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form id={"category-form-edit"}>
                        {/* Image */}
                        <div className={"text-center mb-3"}>
                            <img srcSet={URL + photoDisplay} style={{height: '90px', borderRadius: '50%'}} alt=""/>
                        </div>

                        <div className="row">
                            {/* Category */}
                            <div className="col-md-6">
                                <div className="input-group mb-20">
                                    <select
                                        defaultValue={editData.category}
                                        onChange={(e) => GetSubCategory(e)}
                                        name="category" id="category">
                                        <option value="">Select Category</option>
                                        {
                                            category.map((value, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={value.categoryid}>
                                                        {value.categoryname}
                                                    </option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            {/* Sub-Category */}
                            <div className="col-md-6">
                                <div className="input-group mb-20">
                                    <select
                                        onChange={handle_Inputs2} name="subcategory" id="subcategory">
                                        <option value="">Select Sub-Category</option>
                                        {
                                            subcategory.map((value, index) => {
                                                return (
                                                    <option selected={editData.subcategory === value.subcategoryid}
                                                            key={index} value={value.subcategoryid}>
                                                        {value.subcategoryname}
                                                    </option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-group mb-20">
                                    <input defaultValue={editData.product} onChange={handle_Inputs2} type="text"
                                           placeholder="Enter Product Name"
                                           name="product" id="product"/>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="input-group mb-20">
                                    <input onChange={handle_Inputs2} type="file"
                                           name="photo" id="photo"/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-group mb-20">
                                    <input defaultValue={editData.price}
                                           onChange={handle_Inputs2} type="text"
                                           placeholder="Enter Price"
                                           name="price" id="price"/>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="input-group mb-20">
                                    <input defaultValue={editData.discount}
                                           onChange={handle_Inputs2} type="text"
                                           placeholder="Enter Discount"
                                           name="discount" id="discount"/>
                                </div>
                            </div>
                        </div>

                        <div className="input-group mb-20">
                                    <textarea defaultValue={editData.description}
                                              onChange={handle_Inputs2}
                                              name="description" id="description"
                                              placeholder="Enter Description"/>
                        </div>

                        <button onClick={handle_Update_Product} type="button"
                                className="main-btn btn-filled w-100">
                            UPDATE PRODUCT
                        </button>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ManageProduct;