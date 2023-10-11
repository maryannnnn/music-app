import React from "react";
import {IMenu} from "../../entities/menu/types/menuTypes";

export interface PropsFormMenuCreate {
    menuId: number;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    menuCommon: IMenu[];
    setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
    setSeverity: React.Dispatch<React.SetStateAction<string>>;
    setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
    setFormLinks: React.Dispatch<React.SetStateAction<IMenu[]>>;
}