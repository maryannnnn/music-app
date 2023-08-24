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
    const [modalOpen, setModalOpen] = useState(false);
    const [menuId, setMenuId] = useState(0);
    const [isDisable, setIsDisable] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [severity, setSeverity] = useState('');
    const [alertMessage, setAlertMessage] = useState('')
    const {getMenuCommonAction} = useActions();
    const {isLoadingCommonMenu, errorCommonMenu, menuCommon} = useTypedSelector(state => state.menuCommonReducer);

    useEffect(() => {
        getMenuCommonAction(menuId);
        handleIsDisable();
    }, [menuId, modalOpen]);

    const handleModalCreateOpen = () => {
        setModalOpen(true)
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
                        <ModalForm modalOpen={modalOpen} setModalOpen={setModalOpen}>
                            <FormMenuCreate
                                menuId={menuId}
                                setModalOpen={setModalOpen}
                                menuCommon={menuCommon}
                                setOpenSnackbar={setOpenSnackbar}
                                setSeverity={setSeverity}
                                setAlertMessage={setAlertMessage}
                            />
                        </ModalForm>
                    </div>
                    <TableMenuAdmin menuCommon={menuCommon} isLoadingCommonMenu={isLoadingCommonMenu}
                                    errorCommonMenu={errorCommonMenu}/>
                </div>
                <SnackBar openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} severity={severity}
                          alertMessage={alertMessage}/>
            </div>
        </MainLayout>
    )
}

export default Index
