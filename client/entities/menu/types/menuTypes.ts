
export interface IMenu {
    id: number;
    nameLink: string;
    urlLink: string;
    orderLink: number;
    parentId: number;
    menuId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface menuTopState {
    menuTop: IMenu[];
    isLoadingTopMenu: boolean;
    errorTopMenu: string;
}

export enum MenuTopActionEnum {
    MENU_TOP_REQUEST = "MENU_TOP_REQUEST",
    MENU_TOP_SUCCESS = " MENU_TOP_SUCCESS",
    MENU_TOP_FAIL = "MENU_TOP_FAIL",
}

export interface menuTopRequestAction {
    type: MenuTopActionEnum.MENU_TOP_REQUEST;
}

export interface menuTopSuccessAction {
    type: MenuTopActionEnum.MENU_TOP_SUCCESS;
    payload: IMenu[];
}

export interface menuTopFailAction {
    type: MenuTopActionEnum.MENU_TOP_FAIL;
    payload: string;
}

export type MenuTopAction =
    menuTopRequestAction |
    menuTopSuccessAction |
    menuTopFailAction


export interface menuCommonState {
    menuCommon: IMenu[];
    isLoadingCommonMenu: boolean;
    errorCommonMenu: string;
}

export enum MenuCommonActionEnum {
    MENU_COMMON_REQUEST = "MENU_COMMON_REQUEST",
    MENU_COMMON_SUCCESS = "MENU_COMMON_SUCCESS",
    MENU_COMMON_FAIL = "MENU_COMMON_FAIL",
}

export interface menuCommonRequestAction {
    type: MenuCommonActionEnum.MENU_COMMON_REQUEST;
}

export interface menuCommonSuccessAction {
    type: MenuCommonActionEnum.MENU_COMMON_SUCCESS;
    payload: IMenu[];
}

export interface menuCommonFailAction {
    type: MenuCommonActionEnum.MENU_COMMON_FAIL;
    payload: string;
}

export type MenuCommonAction =
    menuCommonRequestAction |
    menuCommonSuccessAction |
    menuCommonFailAction