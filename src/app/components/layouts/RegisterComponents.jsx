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
        cgu,
    } = formik.values;

    return (
        <div>
            <h2>Inscription</h2>
            <form className="Register">
                <div className="label">
                    <label htmlFor="pseudo">Nom d'utilisateur : </label>
                    <label htmlFor="firstName">Prénom : </label>
                    <label htmlFor="surName">Nom : </label>
                    <label htmlFor="email">Email : </label>
                    <label htmlFor="phoneNumber">Numéro de téléphone : </label>
                    <label htmlFor="adress">Adresse postale : </label>
                    <label htmlFor="zipcode">Code postale : </label>
                    <label htmlFor="ville">Ville : </label>
                    <label htmlFor="password">Mot de passe : </label>
                </div>

                <div className="register2">
                    <input type="text" name="pseudo" id="pseudo" value={pseudo} />
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                    />
                    <input type="text" name="surName" id="surName" value={surName} />
                    <input type="email" name="email" id="email" value={email} />
                    <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={phoneNumber}
                    />
                    <input type="text" name="adress" id="adress" value={adress} />
                    <input type="number" name="number" id="number" value={zipcode} />
                    <input type="text" name="ville" id="ville" value={ville} />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                    />
                </div>
            </form>
        </div>
    );
};

export default RegisterComponents;
