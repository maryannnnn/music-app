import React from "react";
import {IMenu} from "../../entities/menu/types/menuTypes";

export interface PropsFormMenuCreate {
    menuId: number;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    menuCommon: IMenu[];
    setSnackbar: React.Dispatch<React.SetStateAction<{}>>;
    setFormLinks: React.Dispatch<React.SetStateAction<IMenu[]>>;
}