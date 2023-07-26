import React, {FC} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface PropsSelect {
    menuId: number;
    setMenuId: number;
}

const SelectMenuAdmin: FC<PropsSelect> = ({ menuId, setMenuId }) => {

    const handleChange = (event: SelectChangeEvent) => {
        setMenuId(event.target.value);
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
                    <MenuItem value={0}>
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Menu Top</MenuItem>
                    <MenuItem value={2}>Menu Social</MenuItem>
                    <MenuItem value={3}>Menu Main</MenuItem>
                </Select>
            </FormControl>
            <div>menuId: {menuId}</div>
        </div>
    );
}

export default SelectMenuAdmin;
