import React from "react";
import {IMenu} from "../../entities/menu/types/menuTypes";

export interface PropsFormMenuEdit {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    link: IMenu;
    setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
    setSeverity: React.Dispatch<React.SetStateAction<string>>;
    setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
    menuCommon: IMenu[];
    setFormLinks: React.Dispatch<React.SetStateAction<IMenu[]>>;
}