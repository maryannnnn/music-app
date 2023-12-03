import React, {FC, useState, ReactNode} from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Drawer, DrawerHeader} from "./utils";
import AdminPanelTop from "../admin-panel-top/AdminPanelTop";
import AdminPanelLeft from "../admin-panel-left/AdminPanelLeft";

interface MiniDrawerProps {
    children: ReactNode;
}

const MiniDrawer: FC<MiniDrawerProps> = ({children}) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AdminPanelTop open={open} handleDrawerOpen={handleDrawerOpen}/>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <AdminPanelLeft open={open}/>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>
                {children}
            </Box>
        </Box>
    );
}

export default MiniDrawer
