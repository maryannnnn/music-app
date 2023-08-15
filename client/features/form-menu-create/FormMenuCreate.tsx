import React, {FC, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Select} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import {IMenu, MenuNames} from "../../entities/menu/types/menuTypes";
import {useActions} from "../../app/story/hooks/useActions";
import * as Yup from 'yup';
import {validateStringField, validateNumberField} from '../../app/utils/validation'
import {clearTimeout, setTimeout} from "timers";

interface PropsFormMenuCreate {
    menuId: number;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    menuCommon: IMenu[];
    setIsSuccessfullyAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormMenuCreate: FC<PropsFormMenuCreate> = ({menuId, setModalOpen, menuCommon, setIsSuccessfullyAdded}) => {

    const validationSchema = Yup.object({
        nameLink: Yup.string().required('Required').min(4, 'must be at least 4 characters long')
            .max(16, 'must be less than 16 characters'),
        urlLink: Yup.string().required('Required').min(4, 'must be at least 4 characters long')
            .max(16, 'must be less than 16 characters'),
    });

    const [form, setForm] = useState({
        nameLink: 'New Name Link',
        urlLink: 'New Url Link',
        orderLink: 0,
        parentId: 0,
        menuId: menuId
    })

    const [errors, setErrors] = useState({nameLink: '', urlLink: ''});
    const [formValid, setFormValid] = useState(false)
    const {createLinkMenuAction} = useActions();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

            const {name, value, type} = e.target;

            if (type === 'text') {
                validateStringField({
                    fieldName: name,
                    value: value,
                    validationSchema: validationSchema,
                    setErrors: setErrors,
                    form: form
                });
            } else if (type === 'number') {
                validateNumberField({
                    fieldName: name,
                    value: Number(value),
                    validationSchema: validationSchema,
                    setErrors: setErrors,
                    form: form
                });
            }

            setErrors({...errors, [name]: ''});
            setForm({...form, [name]: value});
    };

    const handleClose = () => setModalOpen(false);

    const handleAddLink = (e) => {
        e.preventDefault()
        createLinkMenuAction({...form});
        setIsSuccessfullyAdded(true);
        setModalOpen(false);
    }

    useEffect(() => {
        if (errors.nameLink !== '' || errors.urlLink !== '') {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [errors.nameLink, errors.urlLink])

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, minWidth: 120},
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <FormControl sx={{m: 1, minWidth: 150}}>
                    <h2>Add link to {MenuNames[menuId - 1].name}</h2>
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
                    {console.log("form.nameLink: ", form.nameLink)}
                    {console.log("errors.nameLink: ", errors.nameLink)}
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
                    {console.log("form.urlLink: ", form.urlLink)}
                    {console.log("errors.urlLink: ", errors.urlLink)}
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
                    {console.log("form.orderLink: ", form.orderLink)}
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
                    {console.log("form.parentId: ", form.parentId)}
                </FormControl>
                <div className="flex flex-row-reverse gap-2">
                    <Button onClick={handleAddLink} disabled={formValid}>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </div>

            </div>
        </Box>
    );
};

export default FormMenuCreate;