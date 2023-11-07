import React, {FC, useEffect} from 'react';
import Link from 'next/link';
import {useTypedSelector} from "../../app/story/hooks/useTypedSelector";
import {useActions} from "../../app/story/hooks/useActions";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const MenuAdminTop: FC = () => {
    const {getMenuTopAction} = useActions();
    const menuId = 1;
    const {isLoadingTopMenu, errorTopMenu, menuTop} = useTypedSelector(state => state.menuTopReducer);

    useEffect(() => {
        getMenuTopAction(menuId);
    }, [menuId]);

    return (
        <ul className="flex flex-row gap-2 text-white t-14">
            {isLoadingTopMenu ? (
                <Box sx={{display: 'flex'}}>
                    <CircularProgress/>
                </Box>
            ) : errorTopMenu ? (
                <Stack sx={{width: '100%'}} spacing={2}>
                    <Alert severity="error">{errorTopMenu}</Alert>
                </Stack>
            ) : menuTop.length > 0 ? (
                menuTop
                .filter(link => link.isVisible)
                .sort((a, b) => a.orderLink - b.orderLink)
                .map(link =>
                    <li className='hover:text-gray-200' key={link.id}>
                        <Link href={link.urlLink} alt={link.nameLink}>
                            {link.nameLink}
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

export default MenuAdminTop;