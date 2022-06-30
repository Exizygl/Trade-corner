import * as Yup from 'yup';

export const schemaFormLogin = Yup.object().shape({
    email: Yup.string().required('Required input'),
    password: Yup.string().required('Required input'),
});

export const schemaFormRegister = Yup.object().shape({
    email: Yup.string().required('Required input'),
    password: Yup.string().required('Required input'),
    pseudo: Yup.string().required('Required input'),
});

export const schemaFormProfil = Yup.object().shape({
    pseudo: Yup.string().required('Required input'),
    file: Yup.string().required('Required input')
});