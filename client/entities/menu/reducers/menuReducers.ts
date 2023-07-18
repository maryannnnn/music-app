import {MenuActionEnum, MenuListAction, menuState} from "../types/menuTypes";

const initialState: menuState = {
        menu: [],
        isLoadingMenu: false,
        errorMenu: ''
}

export const menuTopListReducer = (state = initialState, action: MenuListAction): menuState => {
    switch (action.type) {
        case MenuActionEnum.MENU_LIST_REQUEST:
            return {
                ...state, isLoadingMenu: true
            }
        case MenuActionEnum.MENU_LIST_SUCCESS:
            return {
                ...state, menu: action.payload, isLoadingMenu: false
            }
        case MenuActionEnum.MENU_LIST_FAIL:
            return {
                ...state, errorMenu: action.payload, isLoadingMenu: false
            }
        default:
            return state
    }
}