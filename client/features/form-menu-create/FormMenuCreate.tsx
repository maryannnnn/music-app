import React, {FC, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Select} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import {IMenu, MenuNames} from "../../entities/menu/types/menuTypes";

interface PropsFormMenuCreate {
    menuId: number;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    menuCommon: IMenu[];
}

const FormMenuCreate: FC<PropsFormMenuCreate> = ({menuId, setModalOpen, menuCommon}) => {
    const [form, setForm] = useState({nameLink: '', urlLink: '', orderLink: 0, parentId: 0, menuId: menuId})

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleClose = () => setModalOpen(false);

    const handleAddLink = (e) => {
        e.preventDefault()
        console.log("form: ", {...form})
        setModalOpen(false);
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
            <div>
                <FormControl sx={{m: 1, minWidth: 150}}>
                    <h2>Add link to {MenuNames[menuId-1].name}</h2>
                </FormControl>
                <FormControl sx={{m: 1, minWidth: 100}}>
                    <TextField
                        required
                        name="nameLink"
                        label="Name Link"
                        type="text"
                        fullWidth
                        value={form.nameLink}
                        onChange={changeHandler}
                    />
                    {console.log("form.nameLink: ", form.nameLink)}
                </FormControl>
                <FormControl sx={{m: 1, minWidth: 100}}>
                    <TextField
                        required
                        name="urlLink"
                        label="Url Link"
                        type="text"
                        fullWidth
                        value={form.urlLink}
                        onChange={changeHandler}
                    />
                    {console.log("form.urlLink: ", form.urlLink)}
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
                    <Button onClick={handleAddLink}>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </div>

            </div>
        </Box>
    );
};

export default FormMenuCreate;