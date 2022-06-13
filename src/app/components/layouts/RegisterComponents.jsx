import React from 'react';
import { useFormik } from 'formik';

const RegisterComponents = () => {
    const initialValues = {
        pseudo: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordConfirmation: '',
    };
    const formik = useFormik({});
    console.log(formik);
    return <div></div>;
};

export default RegisterComponents;
