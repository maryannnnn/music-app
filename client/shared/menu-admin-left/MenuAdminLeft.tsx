import React, {FC, useEffect} from 'react';
import List from '@mui/material/List';
import {ListItem} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from "@mui/material/ListItemIcon";
import {useActions} from "../../app/story/hooks/useActions";
import {useTypedSelector} from "../../app/story/hooks/useTypedSelector";
import Box from "../menu-admin-top/MenuAdminTop";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import IconDisplay from "../../app/utils/icons-menu";
import Link from "next/link";

interface MenuAdminLeftProps {
    open: boolean;
}

const MenuAdminLeft: FC<MenuAdminLeftProps> = ({open}) => {

    const {getMenuAdminLeftAction} = useActions();
    const menuId = 5;
    const {isLoadingAdminLeftMenu, errorAdminLeftMenu, menuAdminLeft} = useTypedSelector(state => state.menuAdminLeftReducer);


    useEffect(() => {
        getMenuAdminLeftAction(menuId);
    }, [menuId]);

    return (
        <List>
            {
                isLoadingAdminLeftMenu ? (
                    <div style={{ display: 'flex' }}>
                        <CircularProgress />
                    </div>
                ) : errorAdminLeftMenu ? (
                    <Stack sx={{width: '100%'}} spacing={2}>
                        <Alert severity="error">{errorAdminLeftMenu}</Alert>
                    </Stack>
                ) : menuAdminLeft.length > 0 ? (
                    menuAdminLeft
                        .filter(link => link.isVisible)
                        .sort((a, b) => a.orderLink - b.orderLink)
                        .map(link =>
                            <ListItem key={link.id} disablePadding sx={{display: 'block'}}>
                                <Link href={link.urlLink}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <IconDisplay iconLabel={link.iconLink}/>
                                        </ListItemIcon>
                                        <ListItemText sx={{opacity: open ? 1 : 0}}>{link.nameLink}</ListItemText>
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        )
                ) : (
                    <div className="m-1">no links</div>
                )
            }
        </List>
    );
};

export default MenuAdminLeft;