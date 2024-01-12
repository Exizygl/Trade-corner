import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import { validationRegister } from '../../utils/Validation';
import { register } from '../../api/backend/requestApi';
import ErrorMessSmall from './../../shared/components/form-and-error-components/ErrorMessSmall';
import { URL_HOME} from './../../shared/constants/urls/urlConstants';

import Modal from './modal/Modal';


const Register = () => {
    // Variable
    const history = useHistory();

    //Gestion modal
    const [showModal, setShowModal] = useState(false);
    const [msgModal, setMsgModal] = useState("");
    const closeModal = () => {
        setShowModal(false);
        history.push(URL_HOME);
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
        
        register(values)
            .then( (res) => {
                if (res.data.message.user) {
                    const user=res.data.message.user;
                    setMsgModal(user.pseudo + ", il ne vous reste plus qu'à activer votre compte via un mail que vous avez reçu dans la messagerie de " + user.email);
                    setShowModal(true);
                }
            })
            .catch((error) => {
                
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
                        <div className="mb-6">
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
                        </div>


                        <div className="mb-6">
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
                        

                        <div className="mb-6">
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

                        <div className="mb-6">
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
                            <div className = "basis-1/2 mb-6">
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

                            <div className = "basis-1/2 mb-6">
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

                        <div className="mb-6">
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

                        <div className="mb-6">
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

                        <div className="mb-6">
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
                    {errorLog && msgError.pseudo && (
                        <ErrorMessSmall middle message="Ce pseudo est déjà pris" />
                    )}
                    {errorLog && msgError.email && (
                        <ErrorMessSmall middle message="Cet email est déjà enregistré" />
                    )}
                </form>
            </div>
            { showModal === true && //Modal visible que si l'enregistrement s'est bien déroulé
            <Modal message={msgModal} 
                    title={"Inscription en cours"}
                    showModal={showModal}
                    closeModal={()=>closeModal}
             />}
        </div>
    );
};

export default Register;
