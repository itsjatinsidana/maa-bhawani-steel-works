import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {Modal, Button, Table} from "react-bootstrap";
import ReactTooltip from 'react-tooltip';
import {FcFullTrash, FcEditImage} from "react-icons/fc";

import {URL} from "../../../components/URL";
import AdminNavigation from "../../../components/AdminNavigation";
import Footer from "../../../components/Footer";

// MBD
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
import {MDBDataTable} from 'mdbreact';

// MBD

function ManageProductOld() {
    let [category, setCategory] = useState([]);

    // ADD MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // UPDATE MODAL
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    useEffect(() => {
        document.title = "Laramiss | Product";
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
            } else if (size > 100) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Large File Size',
                    text: 'File size must be less than 100 Kb.'
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
        }).then(async res => {
            // console.log(res.data);
            // console.log(res.data.length);

            if (res.data.length > 0) {
                await setProduct(res.data);
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
        // console.log(id);

        let oneSubCategory = product.filter((value) => value.productid === id);
        // console.log(oneSubCategory);

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

            // let action = "edit";

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

    // CSS Style
    let my_CSS = {
        text_box: {
            border: "2px solid white",
            height: "50px"
        },
        file: {
            border: "2px solid white",
            height: "50px",
            padding: "8px 0 8px 15px"
        },
        textArea_height: {
            border: "2px solid white",
            height: "70px",
        },
        radio: {
            height: "15px"
        }
    }

    useEffect( ()=>{
        // let Rows = product.map((value) => {
        product.map(async value => {
            // console.log(value);

            let source = URL + value.photo;
            // let source = await JSON.stringify(URL + value.photo);
            let eventstring = new String();
            eventstring = await source.toString().replace(/["]+/g, '');

            value['photo'] = <img src={eventstring} style={{height: '50px', width: '50px', borderRadius: '50%'}}/>;

            value['delete'] = <>
                <FcFullTrash onClick={() => Delete(value.productid)}
                             style={{fontSize: "1.4rem"}}
                             data-tip="Delete Category"/>
                <ReactTooltip/>
            </>;

            value['edit'] = <>
                <FcEditImage onClick={() => ShowEditModal(value.productid)}
                             style={{fontSize: "1.4rem"}}
                             data-tip="Delete Category"/>
                <ReactTooltip/>
            </>;
        }); // pagination
    },[product]);

    const Data = {
        columns: [
            {
                label: 'Photo',
                field: 'photo',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Product',
                field: 'productname',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Price',
                field: 'price',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Discount',
                field: 'discount',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Description',
                field: 'pdescription',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Delete',
                field: 'delete',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Edit',
                field: 'edit',
                sort: 'asc',
                width: 100
            }
        ],
        rows: product
    }

    return (
        <>
            <AdminNavigation/>

            <section className="restaurant-tab-area pt-115 pb-2">
                <div className="container">
                    <div className="section-title">
                        <div className="section-title-icon mt-5 pt-5">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 version="1.1" width="45" height="45" x="0" y="0"
                                 viewBox="0 0 512 512">
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

                        <div>
                            <h1 className='mb-3 text-center'>Manage Product</h1>

                            <div className={"mb-5 cart-buttons"}>
                                <Button className={"main-btn-2 btn-filled"}
                                        onClick={() => setShow(true)}>Add Product</Button>
                                {/*<Button variant="success" onClick={() => setShow(true)}>Add Product</Button>*/}
                            </div>

                            <div className={"bg-light p-3 mb-5"}>
                                <MDBDataTable
                                    striped
                                    bordered
                                    small
                                    data={Data}
                                    // data={<Data/>}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>

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
                    <form id={"category-form"}>
                        <div className="row">
                            {/* Category */}
                            <div className="col-md-6">
                                <div className="input-group mb-25">
                                    <select
                                        onChange={(e) => GetSubCategory(e)}
                                        name="category" id="category"
                                        style={my_CSS.text_box}>
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
                                <div className="input-group mb-25">
                                    <select onChange={handle_Inputs} name="subcategory" id="subcategory"
                                            style={my_CSS.text_box}>
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
                                <div className="input-group mb-25">
                                    <input onChange={handle_Inputs} type="text"
                                           placeholder="Enter Product Name"
                                           name="product" id="product" style={my_CSS.text_box}/>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="input-group mb-25">
                                    <input onChange={handle_Inputs} type="file"
                                           name="photo" id="photo" style={my_CSS.file}/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-group mb-25">
                                    <input onChange={handle_Inputs} type="text"
                                           placeholder="Enter Price"
                                           name="price" id="price" style={my_CSS.text_box}/>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="input-group mb-25">
                                    <input onChange={handle_Inputs} type="text"
                                           placeholder="Enter Discount"
                                           name="discount" id="discount" style={my_CSS.text_box}/>
                                </div>
                            </div>
                        </div>

                        <div className="input-group mb-25">
                                    <textarea onChange={handle_Inputs}
                                              name="description" id="description"
                                              style={my_CSS.textArea_height} placeholder="Enter Description"/>
                        </div>

                        <button onClick={handle_Add_Product} type="button"
                                className="btn btn-orange btn-block">
                            Add Product</button>
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
                                        name="category" id="category"
                                        style={my_CSS.text_box}>
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
                                        onChange={handle_Inputs2} name="subcategory" id="subcategory"
                                        style={my_CSS.text_box}>
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
                                           name="product" id="product" style={my_CSS.text_box}/>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="input-group mb-20">
                                    <input onChange={handle_Inputs2} type="file"
                                           name="photo" id="photo" style={my_CSS.file}/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-group mb-20">
                                    <input defaultValue={editData.price}
                                           onChange={handle_Inputs2} type="text"
                                           placeholder="Enter Price"
                                           name="price" id="price" style={my_CSS.text_box}/>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="input-group mb-20">
                                    <input defaultValue={editData.discount}
                                           onChange={handle_Inputs2} type="text"
                                           placeholder="Enter Discount"
                                           name="discount" id="discount" style={my_CSS.text_box}/>
                                </div>
                            </div>
                        </div>

                        <div className="input-group mb-20">
                                    <textarea defaultValue={editData.description}
                                              onChange={handle_Inputs2}
                                              name="description" id="description"
                                              style={my_CSS.textArea_height} placeholder="Enter Description"/>
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

export default ManageProductOld;