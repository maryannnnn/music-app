import React, {FC, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {Alert, CircularProgress, DialogTitle} from "@mui/material";
import Button from '@mui/material/Button';
import {useActions} from "../../app/story/hooks/useActions";
import {useTypedSelector} from "../../app/story/hooks/useTypedSelector";
import {PropsAlertMenuDelete} from "./interface";

const AlertMenuDelete: FC<PropsAlertMenuDelete> = (
    {
        setModalOpen, link, setSnackbar, menuCommon, setFormLinks
    }) => {

    const [clicked, setClicked] = useState(false)
    const {deleteLinkMenuAction, getMenuCommonAction, getMenuTopAction} = useActions();
    const {
        isLoadingLinkDelete,
        errorLinkDelete,
        successLinkDelete
    } = useTypedSelector(state => state.linkDeleteReducer);
    
    const handleClose = () => setModalOpen(false);

    const handleDeleteLink = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await deleteLinkMenuAction(link.id)
        setModalOpen(false)
        if (successLinkDelete) {
            setSnackbar({openSnackbar: true, severity: 'success', alertMessage: 'Successfully deleted!'})
            await getMenuCommonAction(link.menuId);
            await getMenuTopAction(link.menuId);
        } else if(errorLinkDelete !== '') {
            setSnackbar({openSnackbar: true, severity: 'error', alertMessage: `Error deleted: ${errorLinkDelete}`})
        }
    }
    
    useEffect(() => {
        setFormLinks(menuCommon)
    }, [menuCommon, successLinkDelete])

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
            ) : (
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