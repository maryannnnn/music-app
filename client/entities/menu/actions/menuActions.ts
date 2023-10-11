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
    LinkDeleteActionEnum, LinkDeleteAction, menuEditAction, menuEditActionEnum
} from "../types/menuTypes";
import {Dispatch} from "react";
import Axios from "axios";

export const menuActions = {

    createLinkMenuAction: (link: ILinkNew) => async (dispatch: Dispatch<LinkCreateAction>) => {
        dispatch({type: LinkCreateActionEnum.LINK_CREATE_REQUEST, payload: link});
        try {
            const response = await Axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/new`, {...link});
            dispatch({type: LinkCreateActionEnum.LINK_CREATE_SUCCESS, payload: response.data});
        } catch (error) {
            dispatch({
                type: LinkCreateActionEnum.LINK_CREATE_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    },

    editLinkMenuAction: (link:IMenu) => async (dispatch: Dispatch<LinkEditAction>) => {
        dispatch({type: LinkEditActionEnum.LINK_EDIT_REQUEST, payload: link});
        try {
            const response = await Axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/edit`, {...link});
            dispatch({type: LinkEditActionEnum.LINK_EDIT_SUCCESS, payload: response.data});
        } catch (error) {
            dispatch({
                type: LinkEditActionEnum.LINK_EDIT_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    },

    deleteLinkMenuAction: (linkId:number) => async (dispatch: Dispatch<LinkDeleteAction>) => {
        dispatch({type: LinkDeleteActionEnum.LINK_DELETE_REQUEST, payload: linkId});
        try {
            const response = await Axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/delete/${linkId}`);
            dispatch({type: LinkDeleteActionEnum.LINK_DELETE_SUCCESS, payload: response.data});
        } catch (error) {
            dispatch({
                type: LinkDeleteActionEnum.LINK_DELETE_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    },

    getMenuTopAction: (menuId: number) => async (dispatch: Dispatch<MenuTopAction>) => {
        dispatch({type: MenuTopActionEnum.MENU_TOP_REQUEST, payload: menuId});
        try {
            const response = await Axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${menuId}`);
            dispatch({type: MenuTopActionEnum.MENU_TOP_SUCCESS, payload: response.data});
        } catch (error) {
            dispatch({
                type: MenuTopActionEnum.MENU_TOP_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    },

    getMenuCommonAction: (menuId: number) => async (dispatch: Dispatch<MenuCommonAction>) => {
        dispatch({type: MenuCommonActionEnum.MENU_COMMON_REQUEST, payload: menuId});
        try {
            const response = await Axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${menuId}`);
            dispatch({type: MenuCommonActionEnum.MENU_COMMON_SUCCESS, payload: response.data});
        } catch (error) {
            dispatch({
                type: MenuCommonActionEnum.MENU_COMMON_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    },

    editMenuAction: (menu:IMenu[]) => async (dispatch: Dispatch<menuEditAction>) => {
        dispatch({type: menuEditActionEnum.MENU_EDIT_REQUEST, payload: menu});
        try {
            console.log("editMenuAction ", menu)
            const response = await Axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/update`, {...menu});
            dispatch({type: menuEditActionEnum.MENU_EDIT_SUCCESS, payload: response.data});
        } catch (error) {
            dispatch({
                type: menuEditActionEnum.MENU_EDIT_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    },
}
