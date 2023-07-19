
export interface IMenu {
    id: number;
    nameLink: string;
    urlLink: string;
    orderLink: number;
    parentLink: number;
    menuId: number;
}

export interface menuTopState {
    menu: IMenu[];
    isLoadingMenu: boolean;
    errorMenu: string;
}

export enum MenuActionEnum {
    MENU_TOP_REQUEST = "MENU_TOP_REQUEST",
    MENU_TOP_SUCCESS = " MENU_TOP_SUCCESS",
    MENU_TOP_FAIL = "MENU_TOP_FAIL",
}

export interface menuTopRequestAction {
    type: MenuActionEnum.MENU_TOP_REQUEST;
}

export interface menuTopSuccessAction {
    type: MenuActionEnum.MENU_TOP_SUCCESS;
    payload: IMenu[];
}

export interface menuTopFailAction {
    type: MenuActionEnum.MENU_TOP_FAIL;
    payload: string;
}

export type MenuTopAction =
    menuTopRequestAction |
    menuTopSuccessAction |
    menuTopFailAction