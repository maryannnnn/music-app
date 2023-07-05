import {useDispatch} from "react-redux";
import {NextThunkDispatch} from "../index";

export const useTypedDispatch = () => useDispatch<NextThunkDispatch>();
