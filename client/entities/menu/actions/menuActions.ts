import {IMenu, MenuTopActionEnum, MenuTopAction, MenuCommonActionEnum, MenuCommonAction} from "../types/menuTypes";
import {Dispatch} from "react";
import Axios from "axios";


// export const createLinkMenuAction = (menu: IMenu) => async (dispatch) => {
//     dispatch({type: MenuActionEnum.MENU_LIST_REQUEST, payload: menu});
//     try {
//         const response = await Axios.post('/menu', {menu});
//         dispatch({ type: MenuActionEnum.MENU_LIST_SUCCESS, payload: response.data });
//     } catch (error) {
//     dispatch({
//         type: MenuActionEnum.MENU_LIST_FAIL,
//         payload: error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message,
//     });
// }
//
  export const menuActions = {
    getMenuTopAction: (menuId: number) => async (dispatch: Dispatch<MenuTopAction>) => {
        console.log("getMenuTopAction menuId: ", menuId)
        dispatch({type: MenuTopActionEnum.MENU_TOP_REQUEST, payload: menuId});
        try {
            const response = await Axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${menuId}`);
            console.log("getMenuTopAction response.data: ", response.data)
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
              console.log("getMenuCommonAction: ", response.data)
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
