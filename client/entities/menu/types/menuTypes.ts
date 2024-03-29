
export interface IMenu {
    id: number;
    nameLink: string;
    urlLink: string;
    orderLink: number;
    iconLink: number;
    parentId: number;
    isVisible: boolean;
    menuId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ILinkNew {
    nameLink: string;
    urlLink: string;
    orderLink: number;
    iconLink: number;
    parentId: number;
    isVisible: boolean;
    menuId: number;
}

export const MenuNames = [
    {id: 0, name: "None"},
    {id: 1, name: "Menu Top"},
    {id: 2, name: "Menu Main"},
    {id: 3, name: "Menu Soc"},
    {id: 4, name:"Menu Admin Top"},
    {id: 5, name:"Menu Admin left"},
    {id: 6, name:"Menu Account"},

]

///////////////////////////////////////////////
////Menu Top

export interface menuTopState {
    menuTop: IMenu[];
    isLoadingTopMenu: boolean;
    errorTopMenu: string;
}

export enum MenuTopActionEnum {
    MENU_TOP_REQUEST = "MENU_TOP_REQUEST",
    MENU_TOP_SUCCESS = "MENU_TOP_SUCCESS",
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

//////////////////////////////////////////////////
////Menu Common

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

//////////////////////////////////////////////
///// Link Create

export interface linkCreateState {
    isLoadingLinkCreate: boolean;
    successLinkCreate: boolean;
    errorLinkCreate: string;
}

export enum LinkCreateActionEnum {
    LINK_CREATE_REQUEST = "LINK_CREATE_REQUEST",
    LINK_CREATE_SUCCESS = "LINK_CREATE_SUCCESS",
    LINK_CREATE_FAIL = "LINK_CREATE_FAIL",
}

export interface linkCreateRequestAction {
    type: LinkCreateActionEnum.LINK_CREATE_REQUEST;
}

export interface linkCreateSuccessAction {
    type: LinkCreateActionEnum.LINK_CREATE_SUCCESS;
    payload: ILinkNew;
}

export interface linkCreateFailAction {
    type: LinkCreateActionEnum.LINK_CREATE_FAIL;
    payload: string;
}

export type LinkCreateAction =
    linkCreateRequestAction |
    linkCreateSuccessAction |
    linkCreateFailAction

//////////////////////////////////////////////////////
/////// Link Edit

export interface linkEditState {
    isLoadingLinkEdit: boolean;
    successLinkEdit: boolean;
    errorLinkEdit: string;
}

export enum LinkEditActionEnum {
    LINK_EDIT_REQUEST = "LINK_EDIT_REQUEST",
    LINK_EDIT_SUCCESS = "LINK_EDIT_SUCCESS",
    LINK_EDIT_FAIL = "LINK_EDIT_FAIL",
}

export interface linkEditRequestAction {
    type: LinkEditActionEnum.LINK_EDIT_REQUEST;
}

export interface linkEditSuccessAction {
    type: LinkEditActionEnum.LINK_EDIT_SUCCESS;
    payload: IMenu;
}

export interface linkEditFailAction {
    type: LinkEditActionEnum.LINK_EDIT_FAIL;
    payload: string;
}

export type LinkEditAction =
    linkEditRequestAction |
    linkEditSuccessAction |
    linkEditFailAction

//////////////////////////////////////////////////////
/////// Link Delete

export interface linkDeleteState {
    isLoadingLinkDelete: boolean;
    successLinkDelete: boolean;
    errorLinkDelete: string;
}

export enum LinkDeleteActionEnum {
    LINK_DELETE_REQUEST = "LINK_DELETE_REQUEST",
    LINK_DELETE_SUCCESS = "LINK_DELETE_SUCCESS",
    LINK_DELETE_FAIL = "LINK_DELETE_FAIL",
}

export interface linkDeleteRequestAction {
    type: LinkDeleteActionEnum.LINK_DELETE_REQUEST;
}

export interface linkDeleteSuccessAction {
    type: LinkDeleteActionEnum.LINK_DELETE_SUCCESS;
    payload: number;
}

export interface linkDeleteFailAction {
    type: LinkDeleteActionEnum.LINK_DELETE_FAIL;
    payload: string;
}

export type LinkDeleteAction =
    linkDeleteRequestAction |
    linkDeleteSuccessAction |
    linkDeleteFailAction 

//////////////////////////////////////////////////////
/////// Menu Edit

export interface menuEditState {
    isLoadingMenuEdit: boolean;
    successMenuEdit: boolean;
    errorMenuEdit: string;
}

export enum menuEditActionEnum {
    MENU_EDIT_REQUEST = "MENU_EDIT_REQUEST",
    MENU_EDIT_SUCCESS = "MENU_EDIT_SUCCESS",
    MENU_EDIT_FAIL = "MENU_EDIT_FAIL",
}

export interface menuEditRequestAction {
    type: menuEditActionEnum.MENU_EDIT_REQUEST;
}

export interface menuEditSuccessAction {
    type: menuEditActionEnum.MENU_EDIT_SUCCESS;
    payload: IMenu[];
}

export interface menuEditFailAction {
    type: menuEditActionEnum.MENU_EDIT_FAIL;
    payload: string;
}

export type menuEditAction =
    menuEditRequestAction |
    menuEditSuccessAction |
    menuEditFailAction

///////////////////////////////////////////////
////Menu Soc

export interface menuSocState {
    menuSoc: IMenu[];
    isLoadingSocMenu: boolean;
    errorSocMenu: string;
}

export enum MenuSocActionEnum {
    MENU_SOC_REQUEST = "MENU_SOC_REQUEST",
    MENU_SOC_SUCCESS = "MENU_SOC_SUCCESS",
    MENU_SOC_FAIL = "MENU_SOC_FAIL",
}

export interface menuSocRequestAction {
    type: MenuSocActionEnum.MENU_SOC_REQUEST;
}

export interface menuSocSuccessAction {
    type: MenuSocActionEnum.MENU_SOC_SUCCESS;
    payload: IMenu[];
}

export interface menuSocFailAction {
    type: MenuSocActionEnum.MENU_SOC_FAIL;
    payload: string;
}

export type MenuSocAction =
    menuSocRequestAction |
    menuSocSuccessAction |
    menuSocFailAction

///////////////////////////////////////////////
////Menu Admin Left

export interface menuAdminLeftState {
    menuAdminLeft: IMenu[];
    isLoadingAdminLeftMenu: boolean;
    errorAdminLeftMenu: string;
}

export enum MenuAdminLeftActionEnum {
    MENU_ADMINLEFT_REQUEST = "MENU_ADMINLEFT_REQUEST",
    MENU_ADMINLEFT_SUCCESS = "MENU_ADMINLEFT_SUCCESS",
    MENU_ADMINLEFT_FAIL = "MENU_ADMINLEFT_FAIL",
}

export interface menuAdminLeftRequestAction {
    type: MenuAdminLeftActionEnum.MENU_ADMINLEFT_REQUEST;
}

export interface menuAdminLeftSuccessAction {
    type: MenuAdminLeftActionEnum.MENU_ADMINLEFT_SUCCESS;
    payload: IMenu[];
}

export interface menuAdminLeftFailAction {
    type: MenuAdminLeftActionEnum.MENU_ADMINLEFT_FAIL;
    payload: string;
}

export type MenuAdminLeftAction =
    menuAdminLeftRequestAction |
    menuAdminLeftSuccessAction |
    menuAdminLeftFailAction

///////////////////////////////////////////////
////Menu Main

export interface menuMainState {
    menuMain: IMenu[];
    isLoadingMainMenu: boolean;
    errorMainMenu: string;
}

export enum MenuMainActionEnum {
    MENU_MAIN_REQUEST = "MENU_MAIN_REQUEST",
    MENU_MAIN_SUCCESS = "MENU_MAIN_SUCCESS",
    MENU_MAIN_FAIL = "MENU_MAIN_FAIL",
}

export interface menuMainRequestAction {
    type: MenuMainActionEnum.MENU_MAIN_REQUEST;
}

export interface menuMainSuccessAction {
    type: MenuMainActionEnum.MENU_MAIN_SUCCESS;
    payload: IMenu[];
}

export interface menuMainFailAction {
    type: MenuMainActionEnum.MENU_MAIN_FAIL;
    payload: string;
}

export type MenuMainAction =
    menuMainRequestAction |
    menuMainSuccessAction |
    menuMainFailAction

