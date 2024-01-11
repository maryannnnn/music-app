import * as Yup from 'yup';
import {IMenu, ILinkNew} from "../../entities/menu/types/menuTypes";

export interface ValidateStringFieldParams {
    fieldName: string;
    value: string;
    validationSchema: Yup.ObjectSchema<any>;
    setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    form: IMenu | undefined;
}

export interface ValidateNumberFieldParams {
    fieldName: string;
    value: number;
    validationSchema: Yup.ObjectSchema<any>;
    setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    form: IMenu | undefined;
}

export interface ValidateStringCreateFieldParams {
    fieldName: string;
    value: string;
    validationSchema: Yup.ObjectSchema<any>;
    setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    form: ILinkNew | undefined;
}

export interface ValidateNumberCreateFieldParams {
    fieldName: string;
    value: number;
    validationSchema: Yup.ObjectSchema<any>;
    setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    form: ILinkNew | undefined;
}

