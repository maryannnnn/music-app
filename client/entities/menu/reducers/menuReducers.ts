import {
    IMenu,
    LinkCreateAction,
    LinkCreateActionEnum,
    linkCreateState,
    LinkDeleteAction,
    LinkDeleteActionEnum,
    linkDeleteState,
    LinkEditAction,
    LinkEditActionEnum,
    linkEditState,
    MenuCommonAction,
    MenuCommonActionEnum,
    menuCommonState,
    menuEditAction,
    menuEditActionEnum,
    menuEditState, MenuSocAction, MenuSocActionEnum, menuSocState,
    MenuTopAction,
    MenuTopActionEnum,
    menuTopState
} from "../types/menuTypes";

const initialLinkCreateState: linkCreateState = {
    isLoadingLinkCreate: false,
    successLinkCreate: true,
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
                ...state, isLoadingLinkCreate: false, successLinkCreate: true
            }
        case LinkCreateActionEnum.LINK_CREATE_FAIL:
            return {
                ...state, errorLinkCreate: action.payload, isLoadingLinkCreate: false
            }
        default:
            return state
    }
}

const initialLinkEditState: linkEditState = {
    isLoadingLinkEdit: false,
    successLinkEdit: true,
    errorLinkEdit: ''
}

export const linkEditReducer = (state = initialLinkEditState, action: LinkEditAction): linkEditState => {
    switch (action.type) {
        case LinkEditActionEnum.LINK_EDIT_REQUEST:
            return {
                ...state, isLoadingLinkEdit: true
            }
        case LinkEditActionEnum.LINK_EDIT_SUCCESS:
            return {
                ...state, isLoadingLinkEdit: false, successLinkEdit: true
            }
        case LinkEditActionEnum.LINK_EDIT_FAIL:
            return {
                ...state, errorLinkEdit: action.payload, isLoadingLinkEdit: false
            }
        default:
            return state
    }
}

const initialMenuEditState: menuEditState = {
    isLoadingMenuEdit: false,
    successMenuEdit: true,
    errorMenuEdit: ''
}

export const menuEditReducer = (state = initialMenuEditState, action: menuEditAction): menuEditState => {
    switch (action.type) {
        case menuEditActionEnum.MENU_EDIT_REQUEST:
            return {
                ...state, isLoadingMenuEdit: true
            }
        case menuEditActionEnum.MENU_EDIT_SUCCESS:
            return {
                ...state, isLoadingMenuEdit: false, successMenuEdit: true
            }
        case menuEditActionEnum.MENU_EDIT_FAIL:
            return {
                ...state, errorMenuEdit: action.payload, isLoadingMenuEdit: false
            }
        default:
            return state
    }
}

const initialLinkDeleteState: linkDeleteState = {
    isLoadingLinkDelete: false,
    successLinkDelete: true,
    errorLinkDelete: ''
}

export const linkDeleteReducer = (state = initialLinkDeleteState, action: LinkDeleteAction): linkDeleteState => {
    switch (action.type) {
        case LinkDeleteActionEnum.LINK_DELETE_REQUEST:
            return {
                ...state, isLoadingLinkDelete: true, successLinkDelete: false, errorLinkDelete: ''
            }
        case LinkDeleteActionEnum.LINK_DELETE_SUCCESS:
            return {
                ...state, isLoadingLinkDelete: false, successLinkDelete: true
            }
        case LinkDeleteActionEnum.LINK_DELETE_FAIL:
            return {
                ...state, errorLinkDelete: action.payload, isLoadingLinkDelete: false
            }
        default:
            return state
    }
}

const initialMenuTopState: menuTopState = {
    menuTop: [] as IMenu[],
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
    menuCommon: [] as IMenu[],
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

const initialMenuSocState: menuSocState = {
    menuSoc: [] as IMenu[],
    isLoadingSocMenu: false,
    errorSocMenu: ''
}

export const menuSocReducer = (state = initialMenuSocState, action: MenuSocAction): menuSocState => {
    switch (action.type) {
        case MenuSocActionEnum.MENU_SOC_REQUEST:
            return {
                ...state, isLoadingSocMenu: true
            }
        case MenuSocActionEnum.MENU_SOC_SUCCESS:
            return {
                ...state, menuSoc: action.payload, isLoadingSocMenu: false
            }
        case MenuSocActionEnum.MENU_SOC_FAIL:
            return {
                ...state, errorSocMenu: action.payload, isLoadingSocMenu: false
            }
        default:
            return state
    }
}
