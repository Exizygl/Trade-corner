import React, { useState } from 'react';
import { useFormik } from 'formik';
import { register } from '../../api/backend/requestApi';
import ErrorMessSmall from './../../shared/components/form-and-error-components/ErrorMessSmall';

import SubmitRegisterModal from './modal/SubmitRegisterModal';
import { validationRegister } from '../../utils/Validation';

const Register = () => {
    // Variable

    const [successSubmitModal, setSuccessSubmitModal] = useState('');
    const closeModal = () => {
        setSuccessSubmitModal('');
    };

    const [errorLog, setErrorLog] = useState(false);
    const [msgError, setMsgError] = useState('');

    // Formik

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

    const { handleSubmit, values, touched, isValid, handleChange, handleBlur, errors } =
        useFormik({
            initialValues,
            validationSchema: validationRegister,
            onSubmit,
        });

    function onSubmit(formValues) {
        console.log(formValues);
        register(values)
            .then((res) => {
                console.log(res);
                if (res.data.message.user) {
                    setSuccessSubmitModal(
                        <SubmitRegisterModal
                            user={res.data.message.user}
                            closeModal={() => closeModal()}
                        />,
                    );
                }
            })
            .catch((error) => {
                console.log(error.response.data);
                if (error.response.data) {
                    setMsgError(error.response.data.errors);
                }
                setErrorLog(true);
            });
    }
    // Formulaire

    return (
        <div className="text-white px-10">
            <h1>Inscription</h1>
            <div className="w-[833px] mx-auto  bg-black py-[20px] px-[120px] text-white">
            <h2 className="text-center">Bonjour !</h2>
                <p className="text-center">Connectez-vous pour découvrir toutes nos fonctionnalitées</p>
                <div className="line basis-1/2 text-center"></div>
                <form onSubmit={handleSubmit}>
                    

                    <div className="form">
                        <div className="">
                            <label htmlFor="pseudo">Pseudonyme : </label>

                            <input
                                type="text"
                                className="input"
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
                                className="input"
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
                                className="input"
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
                                className="input"
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

                        <div className="flex row justify-between gap-10">

                        <div className = "basis-1/2">
                            <label htmlFor="ville">Ville : </label>

                            <input
                                type="text"
                                className="input"
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

                        <div className = "basis-1/2">
                            <label htmlFor="zipcode">Code postal : </label>

                            <input
                                type="text"
                                className="input"
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
                        </div>

                        <div>
                            <label htmlFor="email">Adresse email électronique : </label>

                            <input
                                type="email"
                                className="input"
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
                                className="input"
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
                                className="input"
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

                    <div className="text-center" >
                        <button className="btn-primary mx-auto" type="submit">Créer mon compte</button>
                    </div>
                    {console.log(msgError)}
                    {console.log(errorLog)}
                    {errorLog && msgError.pseudo && (
                        <ErrorMessSmall middle message="Ce pseudo est déjà pris" />
                    )}
                    {errorLog && msgError.email && (
                        <ErrorMessSmall middle message="Cet email est déjà enregistré" />
                    )}
                </form>
            </div>
            {successSubmitModal}
        </div>
    );
};

export default Register;
