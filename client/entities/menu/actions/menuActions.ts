import {IMenu, MenuActionEnum} from "../types/menuTypes";
import Axios from "axios";

export const createLinkMenuAction = (menu: IMenu) => async (dispatch) => {
    dispatch({type: MenuActionEnum.MENU_LIST_REQUEST, payload: menu});
    try {
        const response = await Axios.post('/menu', {menu});
        dispatch({ type: MenuActionEnum.MENU_LIST_SUCCESS, payload: response.data });
    } catch (error) {
    dispatch({
        type: MenuActionEnum.MENU_LIST_FAIL,
        payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
    });
}


