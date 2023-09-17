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

function ManageSubCategory() {
    let [formInputs, setFormInputs] = useState({
        category: '',
        subcategory: '',
        description: ''
    });

    let [editData, setEditData] = useState({
        id: '',
        category: '',
        subcategory: '',
        description: ''
    });

    let [category, setCategory] = useState([]);
    let [error, setError] = useState(false);
    // let [error, setError] = useState(true);

    // REACT BOOTSTRAP MODAL - 1
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // REACT BOOTSTRAP MODAL - 2
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    function ToTop() {
        window.scrollTo(0, 0);
        document.title = "Manage Sub-Category";
        document.body.classList.remove("home");
        document.body.classList.add("about-us");
    }

    useEffect(async () => {
        await ToTop();

        GetCategory();
        GetSubCategory();
    }, []);

    // Fetch Category
    function GetCategory() {
        axios.post(`${URL}admin/manage-category`, {
            "action": "view"
        }).then(res => {
            // console.log(res.data.length);

            if (res.data.length > 0) {
                setCategory(res.data);
            } else {
                setError(true);
            }
        });
    }

    let [subcategory, setSubcategory] = useState([]);

    // Fetch Sub-Category
    function GetSubCategory() {
        axios.post(`${URL}admin/manage-sub-category`, {
            "action": "view"
        }).then(res => {
            if (res.data.length > 0) {
                setSubcategory(res.data);
            } else {
                setError(true);
            }
        });
    }

    const handle_Inputs = (e) => {
        let key = e.target.name;
        formInputs[key] = e.target.value;
        setFormInputs(formInputs);
    }

    const handle_Inputs2 = (e) => {
        let key = e.target.name;
        editData[key] = e.target.value;
        setEditData(editData);
    }

    // Add Sub-Category Action
    const handle_Add_SubCategory = () => {
        let {category, subcategory, description} = formInputs;

        if (category && subcategory) {
            axios.post(`${URL}admin/manage-sub-category`, {
                category,
                subcategory,
                description: subcategory,
                action: "add"
            }).then(res => {
                    if (res.status === 200 && res.statusText === "OK") {
                        // console.log(res.data);

                        if (res.data === 'added') {
                            // GetCategory();
                            GetSubCategory();

                            Swal.fire({
                                icon: 'success',
                                title: 'Sub-Category Added Successfully',
                            });

                            document.getElementById('category-form').reset();

                            setFormInputs({
                                category: '',
                                subcategory: '',
                                description: ''
                            });
                        } else {
                            Swal.fire({
                                title: "Error Occurred",
                                icon: 'error',
                                text: 'Category Not Added.',
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

                axios.post(`${URL}admin/manage-sub-category`, {
                    id,
                    "action": "delete"
                }).then(res => {
                    // console.log(res.data);

                    if (res.data === "deleted") {
                        // GetCategory();
                        GetSubCategory();

                        Swal.fire(
                            'Deleted!',
                            'Sub-Category Deleted.',
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

    // Show Edit Modal
    const ShowEditModal = (id) => {
        // console.log(id);
        let oneSubCategory = subcategory.filter((value) => value.subcategoryid === id);
        // console.log(oneSubCategory);

        setEditData({
            id: id,
            category: oneSubCategory[0].categoryid,
            subcategory: oneSubCategory[0].subcategoryname,
            description: oneSubCategory[0].sdescription
        });

        handleShow2();
    }

    // Update Category Action
    const handle_Update_SubCategory = () => {
        let {id, category, subcategory, description} = editData;
        // console.log(id, category, subcategory, description);

        if (category && description) {
            axios.post(`${URL}admin/manage-sub-category`, {
                id,
                category,
                subcategory,
                description,
                action: "edit"
            }).then(res => {
                    if (res.status === 200 && res.statusText === "OK") {
                        // console.log(res.data);

                        if (res.data === 'updated') {
                            GetSubCategory();

                            Swal.fire({
                                icon: 'success',
                                text: 'Sub-Category Updated Successfully',
                            });
                        } else {
                            Swal.fire({
                                title: "Error Occurred",
                                icon: 'error',
                                text: 'Sub-Category Not Added.',
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

            <BreadCrumb title="Manage Sub-Category"/>

            <div className="container-fluid">
                <div className={"mb-4"}>
                    <Button className="btn btn-secondary"
                            onClick={() => setShow(true)}>Add New Sub-Category</Button>
                </div>

                <>
                    {
                        error || subcategory.length === 0 ?
                            <div className={"text-center"}>
                                <div className="alert alert-danger">
                                    No Data Found
                                </div>
                            </div>
                            :
                            <Table responsive bordered hover>
                                <thead style={{color: "#000", background: "#FEDC19"}}>
                                <tr>
                                    <th>#</th>
                                    <th>Category</th>
                                    <th>Sub-Category Name</th>
                                    <th>Description</th>
                                    <th>Delete</th>
                                    {/*<th colSpan={2}>Controls</th>*/}
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    subcategory.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{value.categoryname}</td>
                                                <td>{value.subcategoryname}</td>
                                                <td>{value.sdescription}</td>
                                                <td>
                                                    <i onClick={() => Delete(value.subcategoryid)}
                                                       style={{fontSize: "1.2rem"}}
                                                       data-tip="Delete Sub-Category"
                                                       className="text-danger fa fa-times-circle"></i>

                                                    {/*<FcFullTrash data-tip="DeleteSub- Category"*/}
                                                    {/*             onClick={() => Delete(value.subcategoryid)}*/}
                                                    {/*             style={{fontSize: "1.5rem"}}/>*/}
                                                    <ReactTooltip/>
                                                </td>
                                                {/*<td>*/}
                                                {/*    <FcEditImage data-tip="Edit Category"*/}
                                                {/*                 onClick={() => ShowEditModal(value.subcategoryid)}*/}
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
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>Add Sub-Category</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form id={"category-form"} className="form-signin">
                        <div className="ui form">
                            <div className="form-group">
                                <select onChange={handle_Inputs} name="category" id="category" className="form-control">
                                    <option value="">Select Category</option>
                                    {
                                        category.map((value, index) => {
                                            return (
                                                <option key={index}
                                                        value={value.categoryid}>{value.categoryname}</option>
                                            );
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <input onChange={handle_Inputs} type="text"
                                       placeholder="Enter Sub-Category Name"
                                       name="subcategory" id="subcategory" className="form-control"/>
                            </div>

                            {/*<div className="form-group">*/}
                            {/*        <textarea onChange={handle_Inputs}*/}
                            {/*                  name="description" id="description"*/}
                            {/*                  placeholder="Enter Description" className="form-control"/>*/}
                            {/*</div>*/}

                            <div className="form-group">
                                <button onClick={handle_Add_SubCategory} type="button"
                                        className="btn btn-block btn-font py-3 btn-primary">
                                    Add Sub-Category
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
                show={show2}
                onHide={handleClose2}
                aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>Update Sub-Category</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form id={"category-form-edit"}>
                        <div className="input-group mb-30">
                            <select defaultValue={editData.category} onChange={handle_Inputs2}
                                    name="category" id="category">
                                <option value="">Select Category</option>
                                {
                                    category.map((value, index) => {
                                        return (
                                            <option key={index} value={value.categoryid}>{value.categoryname}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>

                        <div className="input-group mb-30">
                            <input onChange={handle_Inputs2} type="text"
                                   placeholder="Enter Sub-Category Name"
                                   name="subcategory" id="subcategory"
                                   defaultValue={editData.subcategory}/>
                        </div>

                        <div className="input-group mb-30">
                                <textarea onChange={handle_Inputs2}
                                          name="description" id="description"
                                    // value={editData.description}
                                          defaultValue={editData.description}
                                          placeholder="Enter Description"/>
                        </div>

                        <button onClick={handle_Update_SubCategory} type="button"
                                className="main-btn btn-filled w-100">
                            UPDATE SUB-CATEGORY
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

export default ManageSubCategory;