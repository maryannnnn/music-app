import * as Yup from "yup";

export const validationSchemaMenu = Yup.object({
    nameLink: Yup.string().required('Required').min(4, 'must be at least 4 characters long')
        .max(16, 'must be less than 16 characters'),
    urlLink: Yup.string().required('Required').min(4, 'must be at least 4 characters long')
        .max(16, 'must be less than 16 characters'),
});