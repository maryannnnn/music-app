import React, {FC, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Alert, Checkbox, CircularProgress, FormControlLabel, FormGroup, Select} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import {MenuNames} from "../../entities/menu/types/menuTypes";
import {useActions} from "../../app/story/hooks/useActions";
import {validateStringField, validateNumberField, validateBooleanField} from '../../app/utils/validation'
import {useTypedSelector} from "../../app/story/hooks/useTypedSelector";
import {setTimeout} from "timers";
import {validationSchemaMenu} from "./validation-menu";
import {PropsFormMenuEdit} from "./interface";
import {selectOptionsNumber} from "../../shared/select-options/select-options";

const FormMenuEdit: FC<PropsFormMenuEdit> = (
    {
        setModalOpen, link, setOpenSnackbar, setSeverity, setAlertMessage, menuCommon, setFormLinks
    }) => {

    const [errors, setErrors] = useState({nameLink: '', urlLink: ''});
    const [formValid, setFormValid] = useState(false)
    const [clickedButtonEdit, setClickedButtonEdit] = useState(false)
    const {editLinkMenuAction, getMenuCommonAction, getMenuTopAction} = useActions();
    const {isLoadingLinkEdit, errorLinkEdit, successLinkEdit} = useTypedSelector(state => state.linkEditReducer);
    const [form, setForm] = useState({
        id: link.id,
        nameLink: link.nameLink,
        urlLink: link.urlLink,
        orderLink: link.orderLink,
        parentId: link.parentId,
        isVisible: link.isVisible,
        menuId: link.menuId,
        createdAt: link.createdAt,
        updatedAt: link.updatedAt
    })

    useEffect(() => {
        if (errors.nameLink !== '' || errors.urlLink !== '') {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [errors.nameLink, errors.urlLink])

    useEffect(() => {
        if (clickedButtonEdit) {
            getMenuCommonAction(link.menuId);
        }
        if (link.menuId === 1) {
            getMenuTopAction(link.menuId);
        }
    }, [clickedButtonEdit])

    useEffect(() => {
        setFormLinks(menuCommon)
    }, [menuCommon])

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, checked, type} = e.target;

        if (type === 'text') {
            validateStringField({
                fieldName: name, value: value, validationSchema: validationSchemaMenu,
                setErrors: setErrors, form: form
            });
        } else if (type === 'number') {
            validateNumberField({
                fieldName: name, value: Number(value), validationSchema: validationSchemaMenu,
                setErrors: setErrors, form: form
            });
        }

        setErrors({...errors, [name]: ''});
        if (type === 'checkbox') {
            setForm({ ...form, [name]: checked });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleClose = () => setModalOpen(false);

    const handleAddLink = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setSeverity('success')
        setAlertMessage('Successfully edited!')
        setOpenSnackbar(true);
        editLinkMenuAction({...form});
        setClickedButtonEdit(true)
    }

    const handlerUpdateError = () => {
        setSeverity('error')
        setAlertMessage('Error edit link')
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
                        <FormGroup>
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
                        </FormGroup>
                        <FormGroup>
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
                        </FormGroup>
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
                                {selectOptionsNumber.map((item, index) => (
                                    <MenuItem key={index} value={item.value}>{item.value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{m: 1, minWidth: 100}}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={form.isVisible}
                                        name="isVisible"
                                        onChange={changeHandler}
                                    />
                                } label="Visible"/>
                                {console.log("form.isVisible", form.isVisible)}
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