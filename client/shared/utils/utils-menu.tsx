import {IMenu} from "../../entities/menu/types/menuTypes";
import MenuItem from '@mui/material/MenuItem';
import Link from "next/link";

export const checkMenuItem = (linkId: number, menuMain: IMenu[]) => {
    const menuUp = menuMain
        .filter(item => item.isVisible && item.parentId === linkId);

    if (menuUp.length > 0) {
        return menuUp;
    } else return null;
}

export const getMenuItems = (menuMain: IMenu[]) => {

    return menuMain
        .sort((a, b) => a.orderLink - b.orderLink)
        .map(item => (
                <MenuItem key={item.id}>
                    <Link href={item.urlLink} alt={item.nameLink}>
                        {item.nameLink}
                    </Link>
                </MenuItem>
            )
        )
};