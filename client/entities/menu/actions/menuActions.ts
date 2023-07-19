import {IMenu, MenuActionEnum, MenuTopAction} from "../types/menuTypes";
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

    export const getMenuTopAction = (menuId: number) => async (dispatch: Dispatch<MenuTopAction>) => {
        console.log("getMenuTopAction menuId", menuId)
        dispatch({type: MenuActionEnum.MENU_TOP_REQUEST, payload: menuId});
        try {
            const response = await Axios.get(`/menu?menuId=${menuId}`);
            dispatch({type: MenuActionEnum.MENU_TOP_SUCCESS, payload: response.data});
        } catch (error) {
            dispatch({
                type: MenuActionEnum.MENU_TOP_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }

    }
