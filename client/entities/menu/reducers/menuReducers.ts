import {
    MenuTopActionEnum,
    MenuTopAction,
    menuCommonState,
    menuTopState,
    MenuCommonActionEnum,
    MenuCommonAction,
    linkCreateState, LinkCreateAction, LinkCreateActionEnum, ILinkNew
} from "../types/menuTypes";

const initialLinkCreateState: linkCreateState = {
    linkCreate: {} as ILinkNew,
    isLoadingLinkCreate: false,
    errorLinkCreate: ''
}

export const linkCreateReducer = (state = initialLinkCreateState, action: LinkCreateAction): linkCreateState => {
    switch (action.type) {
        case LinkCreateActionEnum.LINK_CREATE_REQUEST:
            return {
                ...state, isLoadingLinkCreate: true
            }
        case LinkCreateActionEnum.LINK_CREATE_SUCCESS:
            return {
                ...state, linkCreate: action.payload, isLoadingLinkCreate: false
            }
        case LinkCreateActionEnum.LINK_CREATE_FAIL:
            return {
                ...state, errorLinkCreate: action.payload, isLoadingLinkCreate: false
            }
        default:
            return state
    }
}

const initialMenuTopState: menuTopState = {
        menuTop: [],
        isLoadingTopMenu: false,
        errorTopMenu: ''
}

export const menuTopReducer = (state = initialMenuTopState, action: MenuTopAction): menuTopState => {
    switch (action.type) {
        case MenuTopActionEnum.MENU_TOP_REQUEST:
            return {
                ...state, isLoadingTopMenu: true
            }
        case MenuTopActionEnum.MENU_TOP_SUCCESS:
            return {
                ...state, menuTop: action.payload, isLoadingTopMenu: false
            }
        case MenuTopActionEnum.MENU_TOP_FAIL:
            return {
                ...state, errorTopMenu: action.payload, isLoadingTopMenu: false
            }
        default:
            return state
    }
}

const initialMenuCommonState: menuCommonState = {
    menuCommon: [],
    isLoadingCommonMenu: false,
    errorCommonMenu: ''
}

export const menuCommonReducer = (state = initialMenuCommonState, action: MenuCommonAction): menuCommonState => {
    switch (action.type) {
        case MenuCommonActionEnum.MENU_COMMON_REQUEST:
            return {
                ...state, isLoadingCommonMenu: true
            }
        case MenuCommonActionEnum.MENU_COMMON_SUCCESS:
            return {
                ...state, menuCommon: action.payload, isLoadingCommonMenu: false
            }
        case MenuCommonActionEnum.MENU_COMMON_FAIL:
            return {
                ...state, errorCommonMenu: action.payload, isLoadingCommonMenu: false
            }
        default:
            return state
    }
}