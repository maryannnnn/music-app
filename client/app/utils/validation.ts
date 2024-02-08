import { ValidationError } from 'yup';
import {
    ValidateNumberCreateFieldParams,
    ValidateNumberFieldParams,
    ValidateStringCreateFieldParams,
    ValidateStringFieldParams
} from "./interfases";

export const validateStringField = async (
    {
        fieldName,
        value,
        validationSchema,
        setErrors,
        form
    }: ValidateStringFieldParams): Promise<void> => {
    try {
        await validationSchema.validateAt(fieldName, { ...form, [fieldName]: value });
        setErrors(prevErrors => ({ ...prevErrors, [fieldName]: '' }));
    } catch (validationError: unknown) {
        if (validationError instanceof ValidationError) {
            setErrors(prevErrors => ({ ...prevErrors, [fieldName]: (validationError as ValidationError).message }));
        }
    }
};

export const validateNumberField = async (
    {
        fieldName,
        value,
        validationSchema,
        setErrors,
        form
    }: ValidateNumberFieldParams): Promise<void> => {
    try {
        await validationSchema.validateAt(fieldName, { ...form, [fieldName]: value });
        setErrors(prevErrors => ({ ...prevErrors, [fieldName]: '' }));
    } catch (validationError: unknown) {
        if (validationError instanceof ValidationError) {
            setErrors(prevErrors => ({ ...prevErrors, [fieldName]: (validationError as ValidationError).message }));
        }
    }
};

export const validateStringCreateField = async (
    {
        fieldName,
        value,
        validationSchema,
        setErrors,
        form
    }: ValidateStringCreateFieldParams): Promise<void> => {
    try {
        await validationSchema.validateAt(fieldName, { ...form, [fieldName]: value });
        setErrors(prevErrors => ({ ...prevErrors, [fieldName]: '' }));
    } catch (validationError: unknown) {
        if (validationError instanceof ValidationError) {
            setErrors(prevErrors => ({ ...prevErrors, [fieldName]: (validationError as ValidationError).message }));
        }
    }
};

export const validateNumberCreateField = async (
    {
        fieldName,
        value,
        validationSchema,
        setErrors,
        form
    }: ValidateNumberCreateFieldParams): Promise<void> => {
    try {
        await validationSchema.validateAt(fieldName, { ...form, [fieldName]: value });
        setErrors(prevErrors => ({ ...prevErrors, [fieldName]: '' }));
    } catch (validationError: unknown) {
        if (validationError instanceof ValidationError) {
            setErrors(prevErrors => ({ ...prevErrors, [fieldName]: (validationError as ValidationError).message }));
        }
    }
};

