import '../../app/globals.css'
import AdminLayout from "../../app/layouts/layout-admin";
import React, {FC} from "react";

const Index: FC = () => {

    return (
            <AdminLayout>
                <div className="main">
                    <div className="container">
                        <h1 className="t-30b text-gray-100">Admin panel</h1>
                    </div>
                </div>
            </AdminLayout>
    )
}

export default Index
