import React, {FC, useEffect, useState, ChangeEvent} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Alert, Checkbox, CircularProgress, FormControlLabel, FormGroup, Select} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import {MenuNames} from "../../entities/menu/types/menuTypes";
import {useActions} from "../../app/story/hooks/useActions";
import {
    validateStringCreateField,
    validateNumberCreateField
} from '../../app/utils/validation'
import {useTypedSelector} from "../../app/story/hooks/useTypedSelector";
import {validationSchemaMenu} from "./validation-menu";
import {PropsFormMenuCreate} from "./interface";
import {selectNumber, selectIcons} from '../../shared/select-options/select-options'
import {SelectChangeEvent} from '@mui/material/Select';
import IconDisplay from "../../app/utils/icons-menu";

const FormMenuCreate: FC<PropsFormMenuCreate> = ({
                                                     menuId, setModalOpen, menuCommon, setSnackbar, setFormLinks
                                                 }) => {

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formValid, setFormValid] = useState(false)
    const {createLinkMenuAction, getMenuCommonAction, getMenuTopAction, getMenuSocAction, getMenuMainAction} = useActions();
    const {isLoadingLinkCreate, errorLinkCreate, successLinkCreate} = useTypedSelector(state => state.linkCreateReducer);
    const [form, setForm] = useState({
        nameLink: 'New Name Link', urlLink: 'New Url Link', orderLink: 0, iconLink: 0,
        parentId: 0, isVisible: true, menuId: menuId
    })
    const [parentList, setParentList] = useState([...menuCommon, {
        id: 0, nameLink: 'None', urlLink: '', orderLink: 0, iconLink: 0,
        parentId: 0, isVisible: true, menuId: 0
    }])

    useEffect(() => {
        if (errors.nameLink !== '' || errors.urlLink !== '') {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [errors.nameLink, errors.urlLink])

    useEffect(() => {
        setFormLinks(menuCommon)
        setParentList([...menuCommon, {
            id: 0, nameLink: 'None', urlLink: '', orderLink: 0, iconLink: 0,
            parentId: 0, isVisible: false, menuId: 0
        }])
    }, [menuCommon])

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>) => {
        const {name, value, checked, type} = e.target as HTMLInputElement;

        if (type === 'text') {
            validateStringCreateField({
                fieldName: name, value: value, validationSchema: validationSchemaMenu,
                setErrors: setErrors, form: form
            });
        } else if (type === 'number') {
            validateNumberCreateField({
                fieldName: name, value: Number(value), validationSchema: validationSchemaMenu,
                setErrors: setErrors, form: form
            });
        }

        setErrors({...errors, [name]: ''});
        if (type === 'checkbox') {
            setForm({...form, [name]: checked});
        } else {
            setForm({...form, [name]: value});
        }
    };

    const handleClose = () => setModalOpen(false);

    const handleAddLink = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await createLinkMenuAction({...form});
        setModalOpen(false)
        if (successLinkCreate) {
            setSnackbar({openSnackbar: true, severity: 'success', alertMessage: 'Successfully added!'})
            await getMenuCommonAction(menuId);
            if (menuId === 1) {
                await getMenuTopAction(menuId);
            }
            if (menuId === 2) {
                await getMenuMainAction(menuId);
            }
            if (menuId === 3) {
                await getMenuSocAction(menuId);
            }
        } else if (errorLinkCreate !== '') {
            setSnackbar({openSnackbar: true, severity: 'error', alertMessage: `Error added: ${errorLinkCreate}`})
        }
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
            ) : (
                <>
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
                            {parentList.sort((a, b) => a.id - b.id).map((item) => (
                                <MenuItem key={item.id} value={item.id}>{item.nameLink}</MenuItem>
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
                        {selectNumber.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.value}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{m: 1, minWidth: 100}}>
                    <InputLabel id="iconLink">Icon Link</InputLabel>
                    <Select
                        required
                        name="iconLink"
                        type="number"
                        fullWidth
                        value={form.iconLink}
                        label="Icon Link"
                        onChange={changeHandler}
                    >
                        {selectIcons.map((item, index) => (
                            <MenuItem key={index} value={item.label}>{item.value}</MenuItem>
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
                </>
            )}
        </Box>
    );
};

export default FormMenuCreate;