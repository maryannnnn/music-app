import React from "react";
import {IMenu} from "../../entities/menu/types/menuTypes";

export interface PropsFormMenuEdit {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    link: IMenu;
    setSnackbar: React.Dispatch<React.SetStateAction<{}>>;
    menuCommon: IMenu[];
    setFormLinks: React.Dispatch<React.SetStateAction<IMenu[]>>;
}