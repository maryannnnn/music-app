import {IMenu} from "../../entities/menu/types/menuTypes";
import MenuItem from '@mui/material/MenuItem';
import Link from "next/link";

export const checkMenuItem = (linkId: number, menuMain: IMenu[]): boolean => {
    const menuUp = menuMain
        .filter(item => item.isVisible && item.parentId === linkId);

    if(menuUp.length > 0) {
        return true;
    } else return false;
}

export const getMenuItems = (linkId: number, menuMain: IMenu[]) => {

    return menuMain
        .filter(item => item.isVisible && item.parentId === linkId)
        .sort((a, b) => a.orderLink - b.orderLink)
        .map(item => (
                <MenuItem key={item.id}>
                    <Link href={item.urlLink}>
                        {item.nameLink}
                    </Link>
                </MenuItem>
            )
        )
};