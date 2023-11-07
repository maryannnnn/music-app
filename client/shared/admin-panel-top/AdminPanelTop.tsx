import React, {FC} from 'react';
import {AppBar} from "../mini-drawer/utils";
import MenuAdminTop from "../menu-admin-top/MenuAdminTop";
import MenuAccount from "../menu-account/MenuAccount";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

interface AdminPanelTopProps {
    open: boolean;
    handleDrawerOpen: any;
}

const AdminPanelTop: FC<AdminPanelTopProps> = ({open, handleDrawerOpen}) => {
    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && {display: 'none'}),
                    }}
                >
                    <MenuIcon/>
                </IconButton>
                <div className='w-screen'>
                    <div className='container flex flex-row justify-between gap-2 items-center h-10'>
                        <div className='basis-3/4 content-start'>
                            <MenuAdminTop/>
                        </div>
                        <div className='basis-1/4 content-end'>
                            <MenuAccount/>
                        </div>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default AdminPanelTop;