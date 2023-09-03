import React from "react";
import {IMenu} from "../../entities/menu/types/menuTypes";

export interface PropsAlertMenuDelete {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    link: IMenu;
    setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
    setSeverity: React.Dispatch<React.SetStateAction<string>>;
    setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
}