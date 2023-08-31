import React from "react";
import {ILinkEdit, IMenu} from "../../entities/menu/types/menuTypes";

export interface PropsFormMenuEdit {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    link: IMenu;
    setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
    setSeverity: React.Dispatch<React.SetStateAction<string>>;
    setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
    menuCommon: IMenu[];
}