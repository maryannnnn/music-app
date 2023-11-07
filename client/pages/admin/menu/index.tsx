import '../../../app/globals.css'
import AdminLayout from "../../../app/layouts/layout-admin";
import SelectMenuAdmin from '../../../shared/select-menu-admin/SelectMenuAdmin'
import React, {FC, useState} from "react";
import TableMenuAdmin from "../../../shared/table-amenu-dmin/TableMenuAdmin";

const Index: FC = () => {

    const [menuId, setMenuId] = useState(0);

    return (
        <AdminLayout>
            <div className="main">
                <div className="container">
                    <h1 className="t-30b text-gray-100">Page edit Menu</h1>
                    <div className="p-4 flex flex-row gap-x-3.5">
                        <SelectMenuAdmin menuId={menuId} setMenuId={setMenuId}/>
                    </div>
                    <TableMenuAdmin menuId={menuId}/>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Index
