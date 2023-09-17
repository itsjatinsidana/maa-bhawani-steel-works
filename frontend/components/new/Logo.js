const Logo = ({src}) => {
    return (
        <>
            <img src={process.env.PUBLIC_URL + src}
                 alt="Grocery Product" className="img-fluid"/>
        </>
    );
}

export default Logo;