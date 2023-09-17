import {useEffect, useState} from "react";
import axios from "axios";
import {URL} from "../../../components/URL";
import Swal from "sweetalert2";
import {Modal, Button, Table} from "react-bootstrap";
import ReactTooltip from 'react-tooltip';
import {FcFullTrash, FcEditImage} from "react-icons/fc";

import TopHeader from "../../../components/new/TopHeader";
import AdminNavigation from "../../../components/AdminNavigation";
import BreadCrumb from "../../../components/new/BreadCrumb";
import NewFooter from "../../../components/new/NewFooter";
import load from "load-script";
import AfterFooterAdmin from "../../../components/AfterFooterAdmin";
import TopHeaderAdmin from "../../../components/new/TopHeaderAdmin";

function ManageCategory() {
    let [formInputs, setFormInputs] = useState({
        category: '',
        description: ''
    });

    let [editData, setEditData] = useState({
        id: '',
        category: '',
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

    useEffect(() => {
        document.title = "Manage Category";
        GetCategory();
    }, []);

    // Fetch Category
    function GetCategory() {
        axios.post(`${URL}admin/manage-category`, {
            "action": "view"
        }).then(res => {
            if (res.data.length > 0) {
                setCategory(res.data);
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

    // Add Category Action
    const handle_AddCategory = () => {
        let {category, description} = formInputs;

        if (category) {
            // if (category && description) {
            axios.post(`${URL}admin/manage-category`, {
                category,
                description: category,
                action: "add"
            }).then(res => {
                    if (res.status === 200 && res.statusText === "OK") {
                        // console.log(res.data);

                        if (res.data === 'added') {
                            GetCategory();

                            Swal.fire({
                                icon: 'success',
                                title: 'Category Added Successfully',
                            });

                            document.getElementById('category-form').reset();

                            setFormInputs({
                                category: '',
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

                axios.post(`${URL}admin/manage-category`, {
                    id,
                    "action": "delete"
                }).then(res => {
                    // console.log(res.data);

                    if (res.data === "deleted") {
                        GetCategory();

                        Swal.fire(
                            'Deleted!',
                            'Category Deleted.',
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
        let oneCategory = category.filter((value) => value.categoryid === id);
        setEditData({
            id: oneCategory[0].categoryid,
            category: oneCategory[0].categoryname,
            description: oneCategory[0].description
        });

        handleShow2();
    }

    // Update Category Action
    const handle_UpdateCategory = () => {
        let {id, category, description} = editData;
        if (category && description) {
            axios.post(`${URL}admin/manage-category`, {
                id,
                category,
                description,
                action: "edit"
            }).then(res => {
                    if (res.status === 200 && res.statusText === "OK") {
                        // console.log(res.data);

                        if (res.data === 'updated') {
                            GetCategory();

                            Swal.fire({
                                icon: 'success',
                                title: 'Category Updated Successfully',
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

            <BreadCrumb title="Manage Category"/>

            <div className="container-fluid">
                <div className={"mb-4"}>
                    <Button className="btn btn-secondary"
                            onClick={() => setShow(true)}>Add New Category</Button>
                </div>
                <>
                    {
                        error ?
                            <div className={"text-center"}>
                                <div className="alert alert-danger">
                                    No Data Found
                                </div>
                            </div>
                            :
                            <form action="#">
                                <Table responsive bordered hover>
                                    <thead style={{color: "#000", background: "#FEDC19"}}>
                                    <tr>
                                        <th style={{width: "10%"}}>#</th>
                                        <th style={{width: "30%"}}>Category Name</th>
                                        <th style={{width: "30%"}}>Description</th>
                                        <th style={{width: "10%"}}>Delete</th>
                                        {/*<th colSpan={2}>Controls</th>*/}
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {
                                        category.map((value, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{value.categoryname}</td>
                                                    <td>{value.description}</td>
                                                    <td>
                                                        <i onClick={() => Delete(value.categoryid)}
                                                           style={{fontSize: "1.2rem"}}
                                                           data-tip="Delete Category"
                                                           className="text-danger fa fa-times-circle"></i>

                                                        {/*<FcFullTrash data-tip="Delete Category"*/}
                                                        {/*             onClick={() => Delete(value.categoryid)}*/}
                                                        {/*             style={{fontSize: "1.5rem"}}/>*/}
                                                        <ReactTooltip/>
                                                    </td>
                                                    {/*<td>*/}
                                                    {/*    <FcEditImage data-tip="Edit Category"*/}
                                                    {/*                 onClick={() => ShowEditModal(value.categoryid)}*/}
                                                    {/*                 style={{fontSize: "1.2rem"}}/>*/}
                                                    {/*    <ReactTooltip/>*/}
                                                    {/*</td>*/}
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </Table>
                            </form>
                    }
                </>
            </div>

            <NewFooter/>

            {/* MODAL - 1 [ ADD ] */}
            <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/*<div className="grocino-form">*/}
                    <form id={"category-form"}>
                        <div className="ui form">
                            <div className="form-group">
                                <input onChange={handle_Inputs} type="text"
                                       placeholder="Enter Category Name"
                                       className="form-control"
                                       name="category"
                                       id="category"/>
                            </div>

                            {/*<div className="form-group">*/}
                            {/*        <textarea onChange={handle_Inputs}*/}
                            {/*                  name="description" id="description"*/}
                            {/*                  className="form-control"*/}
                            {/*                  placeholder="Enter Description" rows="5"/>*/}
                            {/*</div>*/}

                            <div className="form-group">
                                <button className="btn btn-block btn-font py-3 btn-primary"
                                        onClick={handle_AddCategory}
                                        type="button">Add Category
                                </button>
                            </div>
                        </div>
                    </form>
                    {/*</div>*/}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* MODAL - 2 */}
            <Modal
                show={show2}
                onHide={handleClose2}
                aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>Update Category</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form id={"category-form-edit"}>
                        <div className="input-group mb-30">
                            <input onChange={handle_Inputs2} type="text"
                                   placeholder="Enter Category Name"
                                   name="category" id="category"
                                // value={editData.category}
                                   defaultValue={editData.category}/>
                        </div>

                        <div className="input-group mb-30">
                                <textarea onChange={handle_Inputs2}
                                          name="description" id="description"
                                    // value={editData.description}
                                          defaultValue={editData.description}
                                          placeholder="Enter Description"/>
                        </div>

                        <button onClick={handle_UpdateCategory} type="button"
                                className="main-btn btn-filled w-100">
                            UPDATE CATEGORY
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
    )
        ;
}

export default ManageCategory;