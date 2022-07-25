import React, { useState } from 'react';
import { useFormik } from 'formik';
import { register } from '../../api/backend/requestApi';
import validationSchema from '../../utils/Validation';
import SubmitRegisterModal from './modal/SubmitRegisterModal';
import * as yup from 'yup';

const Register = () => {
    const [successSubmitModal, setSuccessSubmitModal] = useState('');

    const closeModal = () => {
        setSuccessSubmitModal('');
    };

    const initialValues = {
        pseudo: '',
        name: '',
        email: '',
        phoneNumber: '',
        adress: '',
        zipcode: '',
        ville: '',
        password: '',
        passwordConfirmation: '',
    };

    // Rules regex

    const passwordRules = /^(?=.$\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    // ValidationSchema FORMIK YUP

    const basicSchema = yup.object().shape({
        email: yup
            .string()
            .email('Veuillez rentrer un email valide')
            .required('Adress mail requis'),
        password: yup
            .string()
            .min(8)
            .matches(passwordRules, {
                message: 'Veuillez créer un mot de passe plus fort !',
            })
            .required('Mot de passe requis'),
        passwordConfirmation: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Le mot de passe doit correspondre')
            .required('Mot de passe de confirmation requis'),

        phoneNumber: yup.string().matches(phoneRegExp, 'Numéro de téléphone non valide'),
    });

    const BacsicForm = () => {
        const { values, error, handleBlur, handleChange, handleSubmit } = useFormik({
            initialValues,
            validationSchema: basicSchema,
            onSubmit: (values) => {
                register(values)
                    .then((res) => {
                        if (res.data.message.user) {
                            setSuccessSubmitModal(
                                <SubmitRegisterModal
                                    user={res.data.message.user}
                                    closeModal={() => closeModal()}
                                />,
                            );
                        }
                    })
                    .catch(() => console.log('erreur register'));
            },
        });
    };

    // console.log(error);

    // const formik = useFormik({
    //     initialValues,
    //     validationSchema: basicSchema,
    //     onSubmit: (values) => {
    //         register(values)
    //             .then((res) => {
    //                 if (res.data.message.user) {
    //                     setSuccessSubmitModal(
    //                         <SubmitRegisterModal
    //                             user={res.data.message.user}
    //                             closeModal={() => closeModal()}
    //                         />,
    //                     );
    //                 }
    //             })
    //             .catch(() => console.log('erreur register'));
    //     },
    // });

    // const {
    //     pseudo,
    //     name,
    //     email,
    //     phoneNumber,
    //     adress,
    //     zipcode,
    //     ville,
    //     password,
    //     passwordConfirmation,
    // } = formik.values;

    return (
        <div>
            <div className="global">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <legend className="titre">Inscription</legend>
                    <div>
                        <label htmlFor="pseudo">Pseudonyme : </label>
                        <input
                            type="text"
                            name="pseudo"
                            id="pseudo"
                            value={values.pseudo}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="Information">
                        <label htmlFor="name">Nom complet : </label>
                        <input
                            type="text"
                            name="name"
                            id="surName"
                            value={values.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="phoneNumber">Numéro de téléphone : </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            pattern="[0-9]{2}.[0-9]{2}.[0-9]{2}.[0-9]{2}.[0-9]{2}"
                            minlength="9"
                            maxlength="14"
                            placeholder="00.00.00.00.00"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="adress">Adresse postale : </label>
                        <input
                            type="text"
                            name="adress"
                            id="adress"
                            value={values.adress}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="ville">Ville : </label>
                        <input
                            type="text"
                            name="ville"
                            id="ville"
                            value={values.ville}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="zipcode">Code postale : </label>
                        <input
                            type="number"
                            name="zipcode"
                            id="zipcode"
                            value={values.zipcode}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Adresse email électronique : </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Mot de passe : </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="passwordConfirmation">
                            Confirmation de mot de passe :{' '}
                        </label>
                        <input
                            type="password"
                            name="passwordConfirmation"
                            id="passwordConfirmation"
                            value={values.passwordConfirmation}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="submit">
                        <button type="submit">Créer mon compte</button>
                    </div>
                </form>
            </div>
            {successSubmitModal}
        </div>
    );
};

export default Register;
