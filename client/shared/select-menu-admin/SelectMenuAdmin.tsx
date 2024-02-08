import React, {FC} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {MenuNames} from "../../entities/menu/types/menuTypes";

interface PropsSelect {
    menuId: number;
    setMenuId: React.Dispatch<React.SetStateAction<number>>;
}

const SelectMenuAdmin: FC<PropsSelect> = ({ menuId, setMenuId }) => {

    const handleChange = (event: SelectChangeEvent<number>) => {
        const selectedValue = event.target.value;
        if (typeof selectedValue === 'number') {
            setMenuId(selectedValue);
        }
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Menu</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={menuId}
                    onChange={handleChange}
                    autoWidth
                    label="Menu"
                >
                    {MenuNames.map(item => (
                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectMenuAdmin;
