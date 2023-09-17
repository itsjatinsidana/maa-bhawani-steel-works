import {useEffect} from "react";

import AdminNavigation from "../../components/AdminNavigation";
import NewFooter from "../../components/new/NewFooter";
import TopHeaderAdmin from "../../components/new/TopHeaderAdmin";

function AdminDashboard() {
    useEffect(() => {
        document.title = "Admin Dashboard";
    }, []);

    return (
        <>
            <header className="header-pos mb-40">
                <TopHeaderAdmin/>

                <AdminNavigation logo="../new/img/logos/logo.png"/>
            </header>

            <div className="container">
                <div className="mt-10 mb-10">
                    <div className="col-lg-8 col-md-8 col-sm-10 col-12 mx-auto">
                        <h1 className='jumbotron text-dark text-center'>Welcome Admin</h1>
                    </div>
                </div>
            </div>

            <NewFooter/>
        </>
    );
}

export default AdminDashboard;