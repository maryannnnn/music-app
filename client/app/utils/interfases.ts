import * as Yup from 'yup';

export interface ValidateStringFieldParams {
    fieldName: string;
    value: number;
    validationSchema: Yup.ObjectSchema<any>;
    setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    form: {
        nameLink: string;
        urlLink: string;
        orderLink: number;
        parentId: number;
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
        menuId: number;
    };
}
