
import {ValidateNumberFieldParams, ValidateStringFieldParams} from "./interfases";

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
    } catch (validationError) {
        setErrors(prevErrors => ({ ...prevErrors, [fieldName]: validationError.message }));
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
    } catch (validationError) {
        setErrors(prevErrors => ({ ...prevErrors, [fieldName]: validationError.message }));
    }
};
