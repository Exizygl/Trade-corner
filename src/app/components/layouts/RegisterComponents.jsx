import React from 'react';
import { useFormik } from 'formik';

const RegisterComponents = () => {
    const initialValues = {
        pseudo: '',
        firstName: '',
        surName: '',
        email: '',
        phoneNumber: '',
        adress: '',
        zipcode: '',
        ville: '',
        password: '',
        passwordConfirmation: '',
        gcu: false,
    };
    const formik = useFormik({
        initialValues,
    });

    const {
        pseudo,
        firstName,
        surName,
        email,
        phoneNumber,
        adress,
        zipcode,
        ville,
        password,
        passwordConfirmation,
        cgu,
    } = formik.values;

    return (
        <div>
            <h2>Inscription</h2>
            <form className="Register">
                <div className="label">
                    <label htmlFor="pseudo">Nom d'utilisateur : </label>
                    <label htmlFor="surName">Nom : </label>
                    <label htmlFor="firstName">Prénom : </label>
                    <label htmlFor="email">Email : </label>
                    <label htmlFor="phoneNumber">Numéro de téléphone : </label>
                    <label htmlFor="adress">Adresse postale : </label>
                    <label htmlFor="zipcode">Code postale : </label>
                    <label htmlFor="ville">Ville : </label>
                    <label htmlFor="password">Mot de passe : </label>
                    <label htmlFor="passwordConfirmation">
                        Mot de passe de confirmation :
                    </label>
                </div>

                <div className="register2">
                    <input
                        type="text"
                        name="pseudo"
                        id="pseudo"
                        value={pseudo}
                        onChange={formik.handleChange}
                    />
                    <input
                        type="text"
                        name="surName"
                        id="surName"
                        value={surName}
                        onChange={formik.handleChange}
                    />
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={formik.handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={formik.handleChange}
                    />
                    <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={formik.handleChange}
                    />
                    <input
                        type="text"
                        name="adress"
                        id="adress"
                        value={adress}
                        onChange={formik.handleChange}
                    />
                    <input
                        type="number"
                        name="number"
                        id="number"
                        value={zipcode}
                        onChange={formik.handleChange}
                    />
                    <input
                        type="text"
                        name="ville"
                        id="ville"
                        value={ville}
                        onChange={formik.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={formik.handleChange}
                    />
                    <input
                        type="password"
                        name="passwordConfirmation"
                        id="passwordConfirmation"
                        value={passwordConfirmation}
                        onChange={formik.handleChange}
                    />
                </div>
            </form>
        </div>
    );
};

export default RegisterComponents;
