import * as Yup from "yup";

export const validationSchemaMenu = Yup.object({
    nameLink: Yup.string().required('Required').min(4, 'must be at least 4 characters long')
        .max(100, 'must be less than 20 characters'),
    urlLink: Yup.string().required('Required').min(1, 'must be at least 4 characters long')
        .max(100, 'must be less than 100 characters'),
});