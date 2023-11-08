import React, {FC} from 'react';
import MenuAdminLeft from "../menu-admin-left/MenuAdminLeft";

interface AdminPanelLeftProps {
    open: boolean;
}

const AdminPanelLeft: FC<AdminPanelLeftProps> = ({open}) => {
    return (
        <>
            <MenuAdminLeft open={open}/>
        </>
    );
};

export default AdminPanelLeft;