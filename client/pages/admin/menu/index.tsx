import '../../../app/globals.css'
import MainLayout from "../../../app/layouts/layout";
import SelectMenuAdmin from '../../../shared/select-menu-admin/SelectMenuAdmin'
import {useActions} from "../../../app/story/hooks/useActions";
import {useTypedSelector} from "../../../app/story/hooks/useTypedSelector";
import React, {FC, useEffect, useState} from "react";
import TableMenuAdmin from "../../../shared/table-amenu-dmin/TableMenuAdmin";
import Button from "@mui/material/Button";
import ModalForm from "../../../shared/modal/Modal";
import FormMenuCreate from "../../../features/form-menu-create/FormMenuCreate";
import SnackBar from "../../../shared/snack-bar/SnackBar";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Index: FC = () => {
    const [modalOpenCreate, setModalOpenCreate] = useState(false);
    const [menuId, setMenuId] = useState(0);
    const [isDisable, setIsDisable] = useState(false);
    const [openSnackbarCreate, setOpenSnackbarCreate] = useState(false);
    const [severityCreate, setSeverityCreate] = useState('');
    const [alertMessageCreate, setAlertMessageCreate] = useState('')
    const {getMenuCommonAction} = useActions();
    const {isLoadingCommonMenu, errorCommonMenu, menuCommon} = useTypedSelector(state => state.menuCommonReducer);

    useEffect(() => {
        getMenuCommonAction(menuId);
        handleIsDisable();
    }, [menuId, modalOpenCreate]);

    const handleModalCreateOpen = () => {
        setModalOpenCreate(true)
    }

    const handleIsDisable = () => {
        if (menuId === 0) {
            setIsDisable(true)
        } else setIsDisable(false)
    }

    return (
        <MainLayout>
            <div className="main">
                <div className="container">
                    <h1 className="t-30b text-gray-100">Page edit Menu</h1>
                    <div className="p-4 flex flex-row gap-x-3.5">
                        <SelectMenuAdmin menuId={menuId} setMenuId={setMenuId}/>
                        <Button variant="text" onClick={handleModalCreateOpen} disabled={isDisable}
                                startIcon={<AddCircleIcon/>}>Add link</Button>
                        <ModalForm modalOpen={modalOpenCreate} setModalOpen={setModalOpenCreate}>
                            <FormMenuCreate
                                menuId={menuId}
                                setModalOpen={setModalOpenCreate}
                                menuCommon={menuCommon}
                                setOpenSnackbar={setOpenSnackbarCreate}
                                setSeverity={setSeverityCreate}
                                setAlertMessage={setAlertMessageCreate}
                            />
                        </ModalForm>
                    </div>
                    <TableMenuAdmin menuCommon={menuCommon} isLoadingCommonMenu={isLoadingCommonMenu}
                                    errorCommonMenu={errorCommonMenu}/>
                </div>
                <SnackBar openSnackbar={openSnackbarCreate} setOpenSnackbar={setOpenSnackbarCreate} severity={severityCreate}
                          alertMessage={alertMessageCreate}/>
            </div>
        </MainLayout>
    )
}

export default Index
