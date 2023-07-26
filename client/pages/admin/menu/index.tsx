import '../../../app/globals.css'
import MainLayout from "../../../app/layouts/layout";
import SelectMenuAdmin from '../../../shared/select-menu-admin/SelectMenuAdmin'
import * as React from "react";
import {useActions} from "../../../app/story/hooks/useActions";
import {useTypedSelector} from "../../../app/story/hooks/useTypedSelector";
import {useEffect} from "react";
import TableMenuAdmin from "../../../shared/table-amenu-dmin/TableMenuAdmin";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert/Alert";

const Index = () => {
    const [menuId, setMenuId] = React.useState(0);
    const {getMenuCommonAction} = useActions();
    const {isLoadingCommonMenu, errorCommonMenu, menuCommon} = useTypedSelector(state => state.menuCommonReducer);

    useEffect(() => {
        getMenuCommonAction(menuId);
    }, [menuId]);

    return (
        <MainLayout>
            <div className="main">
                <div className="container">
                    <h1 className="t-30b text-gray-100">Работа с Меню</h1>
                    <div className="m-4">
                        <SelectMenuAdmin menuId={menuId} setMenuId={setMenuId}/>
                        <div>menuId Index: {menuId}</div>
                    </div>
                    <TableMenuAdmin menuCommon={menuCommon} isLoadingCommonMenu={isLoadingCommonMenu} errorCommonMenu={errorCommonMenu}/>
                </div>

            </div>
        </MainLayout>
    )
}

export default Index
