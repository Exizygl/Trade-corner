import React, { useState } from 'react';
import { useFormik } from 'formik';
import { register } from '../../api/backend/requestApi';
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

    const { handleSubmit } = useFormik({
        initialValues,
        // validationSchema,
        onSubmit,
    });

    function onSubmit(formValues) {
        console.log(formValues);
    }
    // Formulaire

    return (
        <div className="global">
            <form onSubmit={handleSubmit}>
                <div>
                    <h1>Inscription</h1>
                </div>

                <div>
                    <label htmlFor="pseudo">Pseudonyme : </label>
                    <input type="text" name="pseudo" id="pseudo" />
                </div>

                <div className="Information">
                    <label htmlFor="name">Nom complet : </label>
                    <input type="text" name="name" id="surName" />

                    <label htmlFor="phoneNumber">Numéro de téléphone : </label>
                    <input type="tel" name="phoneNumber" id="phoneNumber" />
                </div>

                <div>
                    <label htmlFor="adress">Adresse postale : </label>
                    <input type="text" name="adress" id="adress" />
                </div>

                <div>
                    <label htmlFor="ville">Ville : </label>
                    <input type="text" name="ville" id="ville" />
                    <label htmlFor="zipcode">Code postale : </label>
                    <input type="number" name="zipcode" id="zipcode" />
                </div>

                <div>
                    <label htmlFor="email">Adresse email électronique : </label>
                    <input type="email" name="email" id="email" />
                </div>

                <div>
                    <label htmlFor="password">Mot de passe : </label>
                    <input type="password" name="password" id="password" />

                    <label htmlFor="passwordConfirmation">
                        Confirmation de mot de passe :{' '}
                    </label>
                    <input
                        type="password"
                        name="passwordConfirmation"
                        id="passwordConfirmation"
                    />
                </div>

                <div className="submit">
                    <button type="submit">Créer mon compte</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
