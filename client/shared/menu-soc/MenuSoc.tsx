import React, {FC, useEffect} from 'react';
import IconDisplay from "../../app/utils/icons-menu";
import {useActions} from "../../app/story/hooks/useActions";
import {useTypedSelector} from "../../app/story/hooks/useTypedSelector";
import Box from '@mui/material/Box';
import {CircularProgress} from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Link from "next/link";

const MenuSoc: FC = () => {

    const {getMenuSocAction} = useActions();
    const menuId = 3;
    const {isLoadingSocMenu, errorSocMenu, menuSoc} = useTypedSelector(state => state.menuSocReducer);

    useEffect(() => {
        getMenuSocAction(menuId);
    }, [menuId]);

    return (
        <ul className="flex flex-row gap-2 text-white t-14">
            {isLoadingSocMenu ? (
                <Box sx={{display: 'flex'}}>
                    <CircularProgress/>
                </Box>
            ) : errorSocMenu ? (
                <Stack sx={{width: '100%'}} spacing={2}>
                    <Alert severity="error">{errorSocMenu}</Alert>
                </Stack>
            ) : menuSoc.length > 0 ? (
                menuSoc
                    .filter(link => link.isVisible)
                    .sort((a, b) => a.orderLink - b.orderLink)
                    .map(link =>
                        <li className='hover:text-gray-200' key={link.id}>
                            <Link href={link.urlLink} alt={link.nameLink} target="blank">
                                <IconDisplay iconName={link.iconLink}/>
                            </Link>
                        </li>
                    )
            ) : (
                <div className="m-1">no links</div>
            )
            }
        </ul>
    );
};

export default MenuSoc;