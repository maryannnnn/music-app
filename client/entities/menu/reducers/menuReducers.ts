import {MenuActionEnum, MenuTopAction, menuTopState} from "../types/menuTypes";

const initialMenuTopState: menuTopState = {
        menu: [],
        isLoadingMenu: false,
        errorMenu: ''
}

export const menuTopReducer = (state = initialMenuTopState, action: MenuTopAction): menuTopState => {
    switch (action.type) {
        case MenuActionEnum.MENU_TOP_REQUEST:
            return {
                ...state, isLoadingMenu: true
            }
        case MenuActionEnum.MENU_TOP_SUCCESS:
            return {
                ...state, menu: action.payload, isLoadingMenu: false
            }
        case MenuActionEnum.MENU_TOP_FAIL:
            return {
                ...state, errorMenu: action.payload, isLoadingMenu: false
            }
        default:
            return state
    }
}