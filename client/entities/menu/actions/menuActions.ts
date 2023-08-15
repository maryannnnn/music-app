import {
    IMenu,
    MenuTopActionEnum,
    MenuTopAction,
    MenuCommonActionEnum,
    MenuCommonAction,
    ILinkNew, LinkCreateAction, LinkCreateActionEnum
} from "../types/menuTypes";
import {Dispatch} from "react";
import Axios from "axios";

  export const menuActions = {

    createLinkMenuAction: (link: ILinkNew) => async (dispatch: Dispatch<LinkCreateAction>) => {
        dispatch({type: LinkCreateActionEnum.LINK_CREATE_REQUEST, payload: link});
        try {
            console.log("link: ", link)
            const response = await Axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/new`, {...link});
            console.log("response.data: ", response.data)
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
    }

  }
