import React, { useState } from 'react';
import { useFormik } from 'formik';
import { register } from '../../api/backend/requestApi';
import validationSchema from '../../utils/Validation';
import SubmitRegisterModal from './modal/SubmitRegisterModal';
import * as yup from 'yup';

const Register = () => {
    // Variable

    const [successSubmitModal, setSuccessSubmitModal] = useState('');
    const closeModal = () => {
        setSuccessSubmitModal('');
    };

    // Formik and YUP

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

    const {
        handleSubmit,
        values,
        touched,
        isValid,
        handleChange,
        handleBlur,
        resetForm,
        errors,
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    function onSubmit(formValues) {
        console.log(formValues);
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
    }
    // Formulaire

    return (
        <div>
            <div className="global">
                <form onSubmit={handleSubmit}>
                    <h1>Inscription</h1>

                    <div className="form">
                        <div className="Information">
                            <label htmlFor="pseudo">Pseudonyme : </label>

                            <input
                                type="text"
                                name="pseudo"
                                id="pseudo"
                                value={values.pseudo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <div>
                                {touched.pseudo && errors.pseudo ? (
                                    <small>{errors.pseudo}</small>
                                ) : (
                                    ''
                                )}
                            </div>

                            <label htmlFor="name">Nom complet : </label>

                            <input
                                type="text"
                                name="name"
                                id="surName"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <div>
                                {touched.name && errors.name ? (
                                    <small>{errors.name}</small>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phoneNumber">Numéro de téléphone : </label>

                            <input
                                type="tel"
                                name="phoneNumber"
                                id="phoneNumber"
                                value={values.phoneNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <div>
                                {touched.phoneNumber && errors.phoneNumber ? (
                                    <small>{errors.phoneNumber}</small>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="adress">Adresse postale : </label>

                            <input
                                type="text"
                                name="adress"
                                id="adress"
                                value={values.adress}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <div>
                                {touched.adress && errors.adress ? (
                                    <small>{errors.adress}</small>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="ville">Ville : </label>

                            <input
                                type="text"
                                name="ville"
                                id="ville"
                                value={values.ville}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <div>
                                {touched.ville && errors.ville ? (
                                    <small>{errors.ville}</small>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="zipcode">Code postale : </label>

                            <input
                                type="text"
                                name="zipcode"
                                id="zipcode"
                                value={values.zipcode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <div>
                                {touched.zipcode && errors.zipcode ? (
                                    <small>{errors.zipcode}</small>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email">Adresse email électronique : </label>

                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <div>
                                {touched.email && errors.email ? (
                                    <small>{errors.email}</small>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password">Mot de passe : </label>

                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Ex : Test123!"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <div>
                                {touched.password && errors.password ? (
                                    <small>{errors.password}</small>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="passwordConfirmation">
                                Confirmation mot de passe :{' '}
                            </label>

                            <input
                                type="password"
                                name="passwordConfirmation"
                                id="passwordConfirmation"
                                value={values.passwordConfirmation}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <div>
                                {touched.passwordConfirmation &&
                                errors.passwordConfirmation ? (
                                    <small>{errors.passwordConfirmation}</small>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
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
