import React, {FC, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {Alert, CircularProgress, DialogTitle} from "@mui/material";
import Button from '@mui/material/Button';
import {useActions} from "../../app/story/hooks/useActions";
import {useTypedSelector} from "../../app/story/hooks/useTypedSelector";
import {setTimeout} from "timers";
import {PropsAlertMenuDelete} from "./interface";

const AlertMenuDelete: FC<PropsAlertMenuDelete> = (
    {
        setModalOpen, link, setOpenSnackbar, setSeverity, setAlertMessage, menuCommon, setFormLinks
    }) => {

    const [clickedButtonDelete, setClickedButtonDelete] = useState(false)
    const {deleteLinkMenuAction, getMenuCommonAction, getMenuTopAction} = useActions();
    const {
        isLoadingLinkDelete,
        errorLinkDelete,
        successLinkDelete
    } = useTypedSelector(state => state.linkDeleteReducer);

    useEffect(() => {
        if (successLinkDelete) {
            getMenuCommonAction(link.menuId);
        }
        if (link.menuId === 1) {
            getMenuTopAction(link.menuId);
        }
    }, [clickedButtonDelete])

    useEffect(() => {
        setFormLinks(menuCommon)
    }, [menuCommon])

    const handleClose = () => setModalOpen(false);

    const handleDeleteLink = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        deleteLinkMenuAction(link.id)
        setClickedButtonDelete(true)
        setSeverity('success')
        setAlertMessage('Successfully deleted!')
        setOpenSnackbar(true);
    }

    const handlerUpdateError = () => {
        setSeverity('error')
        setAlertMessage('Error delete link')
        setOpenSnackbar(true);
        setTimeout(() => {
            setModalOpen(false)
        }, 3000)
        return true
    }

    const handlerSetModalOpen = () => {
        setModalOpen(false)
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, minWidth: 120},
            }}
            noValidate
            autoComplete="off"
        >
            {isLoadingLinkDelete ? (
                <CircularProgress/>
            ) : errorLinkDelete ? handlerUpdateError() && (
                <>
                    <Alert severity="error">{errorLinkDelete}</Alert>
                    <div className="flex flex-row-reverse gap-2">
                        <Button onClick={handleClose}>Cancel</Button>
                    </div>
                </>
            ) : clickedButtonDelete ? handlerSetModalOpen()
                : (
                    <>
                        <DialogTitle id="alert-dialog-title">
                            {"Do you want to remove the link?"}
                        </DialogTitle>
                        <div className="flex flex-row-reverse gap-2">
                            <Button onClick={handleDeleteLink}>Delete</Button>
                            <Button onClick={handleClose}>Cancel</Button>
                        </div>
                    </>
                )}
        </Box>
    );
};

export default AlertMenuDelete;