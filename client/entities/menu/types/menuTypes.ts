
export interface IMenu {
    id: number;
    nameLink: string;
    urlLink: string;
    orderLink: number;
    parentLink: number;
    menuId: number;
}

export interface menuState {
    menu: IMenu[];
    isLoadingMenu: boolean;
    errorMenu: string;
}

export enum MenuActionEnum {
    MENU_LIST_REQUEST = "MENU_LIST_REQUEST",
    MENU_LIST_SUCCESS = " MENU_LIST_SUCCESS",
    MENU_LIST_FAIL = "MENU_LIST_FAIL",
}

export interface menuListRequestAction {
    type: MenuActionEnum.MENU_LIST_REQUEST;
}

export interface menuListSuccessAction {
    type: MenuActionEnum.MENU_LIST_SUCCESS;
    payload: IMenu[];
}

export interface menuListFailAction {
    type: MenuActionEnum.MENU_LIST_FAIL;
    payload: string;
}

export type MenuListAction =
    menuListRequestAction |
    menuListSuccessAction |
    menuListFailAction