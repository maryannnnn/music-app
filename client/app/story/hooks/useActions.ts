import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {allAction} from "../action";

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allAction, dispatch);
}