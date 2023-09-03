import React, {FC, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Alert, CircularProgress, Select} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import {MenuNames} from "../../entities/menu/types/menuTypes";
import {useActions} from "../../app/story/hooks/useActions";
import {validateStringField, validateNumberField} from '../../app/utils/validation'
import {useTypedSelector} from "../../app/story/hooks/useTypedSelector";
import {setTimeout} from "timers";
import {validationSchemaMenu} from "./validation-menu";
import {PropsFormMenuEdit} from "./interface";

const FormMenuEdit: FC<PropsFormMenuEdit> = (
    {
        setModalOpen, link, setOpenSnackbar, setSeverity, setAlertMessage, menuCommon
    }) => {

    const [errors, setErrors] = useState({nameLink: '', urlLink: ''});
    const [formValid, setFormValid] = useState(false)
    const [clickedButtonEdit, setClickedButtonEdit] = useState(false)
    const {editLinkMenuAction, getMenuCommonAction, getMenuTopAction} = useActions();
    const {isLoadingLinkEdit, errorLinkEdit, successLinkEdit} = useTypedSelector(state => state.linkEditReducer);
    const [form, setForm] = useState({
        id: link.id, nameLink: link.nameLink, urlLink: link.urlLink, orderLink: link.orderLink,
        parentId: link.parentId, menuId: link.menuId, createdAt: link.createdAt, updatedAt: link.updatedAt
    })

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type} = e.target;

        if (type === 'text') {
            validateStringField({ fieldName: name, value: value, validationSchema: validationSchemaMenu,
                setErrors: setErrors, form: form });
        } else if (type === 'number') {
            validateNumberField({ fieldName: name, value: Number(value), validationSchema: validationSchemaMenu,
                setErrors: setErrors, form: form });
        }

        setErrors({...errors, [name]: ''});
        setForm({...form, [name]: value});
    };

    const handleClose = () => setModalOpen(false);

    const handleAddLink = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        editLinkMenuAction({...form});
        setClickedButtonEdit(true)
        setSeverity('success')
        setAlertMessage('Successfully added!')
        setOpenSnackbar(true);
    }

    const handlerUpdateError = () => {
        setSeverity('error')
        setAlertMessage('Error adding link')
        setOpenSnackbar(true);
        setTimeout(() => {
            setModalOpen(false)
        }, 3000)
        return true
    }

    const handlerSetModalOpen = () => {
        setModalOpen(false)
    }

    useEffect(() => {
        if (errors.nameLink !== '' || errors.urlLink !== '') {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [errors.nameLink, errors.urlLink])

    useEffect(() => {
        if (successLinkEdit) {
            getMenuCommonAction(link.menuId);
        }
        if (link.menuId === 1) {
            getMenuTopAction(link.menuId);
        }
    }, [clickedButtonEdit])

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, minWidth: 120},
            }}
            noValidate
            autoComplete="off"
        >
            {isLoadingLinkEdit ? (
                <CircularProgress/>
            ) : errorLinkEdit ? handlerUpdateError() && (
                <>
                    <Alert severity="error">{errorLinkEdit}</Alert>
                    <div className="flex flex-row-reverse gap-2">
                        < Button onClick={handleClose}>Cancel</Button>
                    </div>
                </>
            ) : clickedButtonEdit ? handlerSetModalOpen()
                : (
                    <div>
                        <FormControl sx={{m: 1, minWidth: 150}}>
                            <h2>Edit link in {MenuNames[link.menuId - 1].name}</h2>
                        </FormControl>
                        <FormControl sx={{m: 1, minWidth: 100}}>
                            <TextField
                                required
                                name="nameLink"
                                label="Name Link"
                                type="text"
                                fullWidth
                                defaultValue="Hello World"
                                value={form.nameLink}
                                onChange={changeHandler}
                                error={!!errors.nameLink}
                                helperText={errors.nameLink}
                            />
                        </FormControl>
                        <FormControl sx={{m: 1, minWidth: 100}}>
                            <TextField
                                required
                                name="urlLink"
                                label="Url Link"
                                type="text"
                                fullWidth
                                defaultValue="Hello World"
                                value={form.urlLink}
                                onChange={changeHandler}
                                error={!!errors.urlLink}
                                helperText={errors.urlLink}
                            />
                        </FormControl>
                        <FormControl sx={{m: 1, minWidth: 100}}>
                            <InputLabel id="orderLink">Order Link</InputLabel>
                            <Select
                                required
                                name="orderLink"
                                type="number"
                                fullWidth
                                value={form.orderLink}
                                label="Order Link"
                                onChange={changeHandler}
                            >
                                {[...Array(13)].map((item, index) => (
                                    <MenuItem key={index} value={index + 1}>{index + 1}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{m: 1, minWidth: 100}}>
                            <InputLabel id="order-link">Parent</InputLabel>
                            <Select
                                required
                                name="parentId"
                                type="number"
                                value={form.parentId}
                                label="Parent"
                                onChange={changeHandler}
                            >
                                {menuCommon.map(link => (
                                    <MenuItem key={link.id} value={link.id}>{link.nameLink}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className="flex flex-row-reverse gap-2">
                            <Button onClick={handleAddLink} disabled={formValid}>Update</Button>
                            <Button onClick={handleClose}>Cancel</Button>
                        </div>
                    </div>
                )}
        </Box>
    );
};

export default FormMenuEdit;