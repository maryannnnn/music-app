import React from "react";
import {IMenu} from "../../entities/menu/types/menuTypes";
import { AlertColor } from '@mui/material/Alert';

export interface PropsFormMenuCreate {
    menuId: number;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    menuCommon: IMenu[];
    setSnackbar: React.Dispatch<React.SetStateAction<{openSnackbar: boolean, severity: AlertColor, alertMessage: string}>>;
    setFormLinks: React.Dispatch<React.SetStateAction<IMenu[]>>;
}