const Banner = () => {
    return (
        <>
            <div className="banner-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="hero-slider-active hero-style-2 slick-dot-style slider-arrow-style">
                                <div className="single-slider d-flex align-items-center"
                                     style={{backgroundImage:"url(assets/img/slider/slider1-home4.jpg)"}}>
                                     {/*style="background-image: url(assets/img/slider/slider1-home4.jpg);">*/}
                                    <div className="container-dluid">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="slider-text">
                                                    <h1>Maa Bhawani Steel Works</h1>
                                                    <p className="ml-20">Shop online and in store</p>
                                                    <a className="btn-1 home-btn ml-20" href="/products">shop now</a>
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
        </>
    );
}

export default Banner;