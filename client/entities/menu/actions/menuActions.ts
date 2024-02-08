import {
    IMenu,
    MenuTopActionEnum,
    MenuTopAction,
    MenuCommonActionEnum,
    MenuCommonAction,
    ILinkNew,
    LinkCreateAction,
    LinkCreateActionEnum,
    LinkEditActionEnum,
    LinkEditAction,
    LinkDeleteActionEnum,
    LinkDeleteAction,
    menuEditAction,
    menuEditActionEnum,
    MenuSocActionEnum,
    MenuSocAction,
    MenuAdminLeftAction, MenuAdminLeftActionEnum, MenuMainAction, MenuMainActionEnum
} from "../types/menuTypes";
import {Dispatch} from "react";
import Axios from "axios";

export const menuActions = {

    createLinkMenuAction: (link: ILinkNew) => async (dispatch: Dispatch<LinkCreateAction>) => {
        dispatch({type: LinkCreateActionEnum.LINK_CREATE_REQUEST});
        try {
            const response = await Axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/new`, {...link});
            dispatch({type: LinkCreateActionEnum.LINK_CREATE_SUCCESS, payload: response.data});
        } catch (error: any) {
            dispatch({
                type: LinkCreateActionEnum.LINK_CREATE_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    },

    editLinkMenuAction: (link:IMenu) => async (dispatch: Dispatch<LinkEditAction>) => {
        dispatch({type: LinkEditActionEnum.LINK_EDIT_REQUEST});
        try {
            const response = await Axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/edit`, {...link});
            dispatch({type: LinkEditActionEnum.LINK_EDIT_SUCCESS, payload: response.data});
        } catch (error: any) {
            dispatch({
                type: LinkEditActionEnum.LINK_EDIT_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    },

    deleteLinkMenuAction: (linkId:number) => async (dispatch: Dispatch<LinkDeleteAction>) => {
        dispatch({type: LinkDeleteActionEnum.LINK_DELETE_REQUEST});
        try {
            const response = await Axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/delete/${linkId}`);
            dispatch({type: LinkDeleteActionEnum.LINK_DELETE_SUCCESS, payload: response.data});
        } catch (error: any) {
            dispatch({
                type: LinkDeleteActionEnum.LINK_DELETE_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    },

    getMenuTopAction: (menuId: number) => async (dispatch: Dispatch<MenuTopAction>) => {
        dispatch({type: MenuTopActionEnum.MENU_TOP_REQUEST});
        try {
            const response = await Axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${menuId}`);
            dispatch({type: MenuTopActionEnum.MENU_TOP_SUCCESS, payload: response.data});
        } catch (error: any) {
            dispatch({
                type: MenuTopActionEnum.MENU_TOP_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    },

    getMenuCommonAction: (menuId: number) => async (dispatch: Dispatch<MenuCommonAction>) => {
        dispatch({type: MenuCommonActionEnum.MENU_COMMON_REQUEST});
        try {
            const response = await Axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${menuId}`);
            dispatch({type: MenuCommonActionEnum.MENU_COMMON_SUCCESS, payload: response.data});
        } catch (error: any) {
            dispatch({
                type: MenuCommonActionEnum.MENU_COMMON_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    },

    getMenuSocAction: (menuId: number) => async (dispatch: Dispatch<MenuSocAction>) => {
        dispatch({type: MenuSocActionEnum.MENU_SOC_REQUEST});
        try {
            const response = await Axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${menuId}`);
            dispatch({type: MenuSocActionEnum.MENU_SOC_SUCCESS, payload: response.data});
        } catch (error: any) {
            dispatch({
                type: MenuSocActionEnum.MENU_SOC_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    },

    getMenuAdminLeftAction: (menuId: number) => async (dispatch: Dispatch<MenuAdminLeftAction>) => {
        dispatch({type: MenuAdminLeftActionEnum.MENU_ADMINLEFT_REQUEST});
        try {
            const response = await Axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${menuId}`);
            console.log("response.data", response.data)
            dispatch({type: MenuAdminLeftActionEnum.MENU_ADMINLEFT_SUCCESS, payload: response.data});
        } catch (error: any) {
            dispatch({
                type: MenuAdminLeftActionEnum.MENU_ADMINLEFT_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    },

    getMenuMainAction: (menuId: number) => async (dispatch: Dispatch<MenuMainAction>) => {
        dispatch({type: MenuMainActionEnum.MENU_MAIN_REQUEST});
        try {
            const response = await Axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${menuId}`);
            dispatch({type: MenuMainActionEnum.MENU_MAIN_SUCCESS, payload: response.data});
        } catch (error: any) {
            dispatch({
                type: MenuMainActionEnum.MENU_MAIN_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    },

    editMenuAction: (menu:IMenu[]) => async (dispatch: Dispatch<menuEditAction>) => {
        dispatch({type: menuEditActionEnum.MENU_EDIT_REQUEST});
        try {
            console.log("editMenuAction ", menu)
            const response = await Axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/update`, {...menu});
            dispatch({type: menuEditActionEnum.MENU_EDIT_SUCCESS, payload: response.data});
        } catch (error: any) {
            dispatch({
                type: menuEditActionEnum.MENU_EDIT_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    },
}
