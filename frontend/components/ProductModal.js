import {Link} from "react-router-dom";

function ProductModal() {
    return (
        <>
            {/*Quick View Modal Start*/}
            <div className="modal fade quick-view-modal" id="quickViewModal" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="close-btn" data-dismiss="modal">
                                <a href="#" className="remove">
                                    <i className="fal fa-times"></i>
                                </a>
                            </div>

                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-5">
                                        <div className="shop-detail-image">
                                            <img src="assets/img/shop/detail-1.png" className="img-fluid" alt="img"/>
                                        </div>
                                    </div>

                                    <div className="col-lg-7">
                                        <div className="shop-detail-content">
                                            <h3 className="product-title mb-20">Handmade Golden Ring</h3>
                                            {/*<span className="rating mb-20">*/}
                                            {/*    <span className="text-yellow"><i className="far fa-star"></i></span>*/}
                                            {/*    <span className="text-yellow"><i className="far fa-star"></i></span>*/}
                                            {/*    <span className="text-yellow"><i className="far fa-star"></i></span>*/}
                                            {/*    <span className="text-dark-white"><i className="far fa-star"></i></span>*/}
                                            {/*    <span className="text-dark-white"><i className="far fa-star"></i></span>*/}
                                            {/*    <span className="pro-review">*/}
                                            {/*        <span>1 Reviews</span>*/}
                                            {/*    </span>*/}
                                            {/*</span>*/}

                                            <div className="desc mb-20 pb-20 border-bottom">
                                                <span className="price">$390 <span>$480</span></span>
                                            </div>

                                            <div className="mt-20 mb-20">
                                                <div className="d-inline-block other-info">
                                                    <h6>Availability:
                                                        <span className="text-success ml-2">In Stock</span>
                                                    </h6>
                                                </div>
                                                {/*<div className="ml-2 d-inline-block other-info">*/}
                                                {/*    <h6>SKU:*/}
                                                {/*        <span className="grey ml-2">006-bhg</span>*/}
                                                {/*    </h6>*/}
                                                {/*</div>*/}
                                            </div>

                                            <div className="short-descr mb-20">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                    eiusmod tempor
                                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                    veniam, quis
                                                    nostrud exercitation ullamco laboris nisi ut aliquip</p>
                                            </div>

                                            <div className="quantity-cart d-block d-sm-flex">
                                                <div className="quantity-box">
                                                    <button type="button" className="minus-btn">
                                                        <i className="fal fa-minus"></i>
                                                    </button>
                                                    <input type="text" className="input-qty" name="name" value="1"/>
                                                    <button type="button" className="plus-btn">
                                                        <i className="fal fa-plus"></i>
                                                    </button>
                                                </div>
                                                <div className="cart-btn pl-40">
                                                    <Link to="#" className="main-btn btn-border">Add to Cart</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* //Quick View Modal Start*/}
        </>
    );
}

export default ProductModal;