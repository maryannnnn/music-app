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
import {validateStringField, validateNumberField} from '../../app/utils/validation'
import {useTypedSelector} from "../../app/story/hooks/useTypedSelector";
import {setTimeout} from "timers";
import {validationSchemaMenu} from "./validation-menu";
import {PropsFormMenuCreate} from "./interface";
import {selectOptionsNumber} from '../../shared/select-options/select-options'

const FormMenuCreate: FC<PropsFormMenuCreate> = (
    {
        menuId, setModalOpen, menuCommon, setOpenSnackbar, setSeverity, setAlertMessage, setFormLinks
    }) => {

    const [errors, setErrors] = useState({nameLink: '', urlLink: ''});
    const [formValid, setFormValid] = useState(false)
    const [clickedButtonAdd, setClickedButtonAdd] = useState(false)
    const {createLinkMenuAction, getMenuCommonAction, getMenuTopAction} = useActions();
    const {isLoadingLinkCreate, errorLinkCreate, successLinkCreate} = useTypedSelector(state => state.linkCreateReducer);
    const [form, setForm] = useState({
        nameLink: 'New Name Link', urlLink: 'New Url Link', orderLink: 0,
        parentId: 0, isVisible: true, menuId: menuId
    })

    useEffect(() => {
        if (errors.nameLink !== '' || errors.urlLink !== '') {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [errors.nameLink, errors.urlLink])

    useEffect(() => {
        if (clickedButtonAdd) {
            getMenuCommonAction(menuId);
        }
        if (menuId === 1) {
            getMenuTopAction(menuId);
        }
    }, [clickedButtonAdd])

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
        setAlertMessage('Successfully added!')
        setOpenSnackbar(true);
        createLinkMenuAction({...form});
        setClickedButtonAdd(true)
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

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, minWidth: 120},
            }}
            noValidate
            autoComplete="off"
        >
            {isLoadingLinkCreate ? (
                <CircularProgress/>
            ) : errorLinkCreate ? handlerUpdateError() && (
                <>
                    <Alert severity="error">{errorLinkCreate}</Alert>
                    < div className="flex flex-row-reverse gap-2">
                        < Button onClick={handleClose}>Cancel</Button>
                    </div>
                </>
            ) : clickedButtonAdd ? handlerSetModalOpen()
                : (
                    <div>
                        <FormControl sx={{m: 1, minWidth: 150}}>
                            <h2>Add link to {MenuNames[menuId - 1].name}</h2>
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
                                    {menuCommon ? menuCommon.map(link => (
                                        <MenuItem key={link.id} value={link.id}>{link.nameLink}</MenuItem>
                                        )) : (
                                        <h4>No elements</h4>
                                        )
                                    }
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
                                        defaultChecked
                                        name="isVisible"
                                        checked={form.isVisible}
                                        onChange={changeHandler}
                                    />
                                } label="Visible"/>
                        </FormControl>
                        <div className="flex flex-row-reverse gap-2">
                            <Button onClick={handleAddLink} disabled={formValid}>Add</Button>
                            <Button onClick={handleClose}>Cancel</Button>
                        </div>
                    </div>
                )}
        </Box>
    );
};

export default FormMenuCreate;