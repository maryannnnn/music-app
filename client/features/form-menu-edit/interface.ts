import React from "react";
import {IMenu} from "../../entities/menu/types/menuTypes";
import {AlertColor} from "@mui/material";

export interface PropsFormMenuEdit {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    link: IMenu;
    setSnackbar: React.Dispatch<React.SetStateAction<{openSnackbar: boolean, severity: AlertColor, alertMessage: string}>>;
    menuCommon: IMenu[];
    setFormLinks: React.Dispatch<React.SetStateAction<IMenu[]>>;
}