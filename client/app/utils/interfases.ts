import * as Yup from 'yup';

export interface ValidateStringFieldParams {
    fieldName: string;
    value: string;
    validationSchema: Yup.ObjectSchema<any>;
    setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    form: {
        nameLink: string;
        urlLink: string;
        orderLink: number;
        parentId: number;
        isVisible: boolean;
        menuId: number;
    };
}

export interface ValidateNumberFieldParams {
    fieldName: string;
    value: number;
    validationSchema: Yup.ObjectSchema<any>;
    setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    form: {
        nameLink: string;
        urlLink: string;
        orderLink: number;
        parentId: number;
        isVisible: boolean;
        menuId: number;
    };
}


export interface ValidateBooleanFieldParams {
    fieldName: string;
    value: boolean;
    validationSchema: Yup.ObjectSchema<any>;
    setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    form: {
        nameLink: string;
        urlLink: string;
        orderLink: number;
        parentId: number;
        isVisible: boolean;
        menuId: number;
    };
}
