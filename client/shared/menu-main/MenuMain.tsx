import React, {FC, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import {useActions} from "../../app/story/hooks/useActions";
import {useTypedSelector} from "../../app/story/hooks/useTypedSelector";
import {CircularProgress} from "@mui/material";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import IconDisplay from "../../app/utils/icons-menu";
import Fade from '@mui/material/Fade';
import {checkMenuItem, getMenuItems} from "../utils/utils-menu";

interface MenuStates {
    [key: number]: HTMLElement | null;
}

const MenuMain: FC = () => {
    const {getMenuMainAction} = useActions();
    const menuId = 2;
    const {isLoadingMainMenu, errorMainMenu, menuMain} = useTypedSelector(state => state.menuMainReducer);

    useEffect(() => {
        getMenuMainAction(menuId);
    }, [menuId]);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [menuStates, setMenuStates] = useState<MenuStates>({});

    const handleClick = (linkId: number, event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuStates({
            ...menuStates,
            [linkId]: event.currentTarget,
        });
    };

    const handleClose = (linkId: number) => {
        setMenuStates({
            ...menuStates,
            [linkId]: null,
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                '& > *': {
                    m: 1,
                },
            }}
        >
            <ButtonGroup
                variant="contained"
                size="large"
                color="secondary"
                aria-label="outlined large button group"
            >
                {isLoadingMainMenu ? (
                    <Box sx={{display: 'flex'}}>
                        <CircularProgress/>
                    </Box>
                ) : errorMainMenu ? (
                    <Stack sx={{width: '100%'}} spacing={2}>
                        <Alert severity="error">{errorMainMenu}</Alert>
                    </Stack>
                ) : menuMain.length > 0 ? (
                    menuMain
                        .filter(link => link.isVisible && link.parentId === 0)
                        .sort((a, b) => a.orderLink - b.orderLink)
                        .map(link =>
                            <div key={link.id}>
                                <Button
                                    startIcon={<IconDisplay iconLabel={link.iconLink}/>}
                                    id="basic-menu"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={(event) => handleClick(link.id, event)}
                                >
                                    {checkMenuItem(link.id, menuMain) ? link.nameLink : (
                                        <Link href={link.urlLink}>
                                            {link.nameLink}
                                        </Link>
                                        )
                                    }
                                </Button>
                                {checkMenuItem(link.id, menuMain) && (
                                    <Menu
                                        id="fade-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'fade-button',
                                        }}
                                        anchorEl={menuStates[link.id]}
                                        open={Boolean(menuStates[link.id])}
                                        onClose={() => handleClose(link.id)}
                                        TransitionComponent={Fade}
                                    >
                                        {getMenuItems(link.id, menuMain)}
                                    </Menu>
                                )}
                            </div>
                        )
                ) : (
                    <div className="m-1">no links</div>
                )
                }
            </ButtonGroup>
        </Box>
    )
}

export default MenuMain