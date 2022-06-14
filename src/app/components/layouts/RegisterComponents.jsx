import React from 'react';
import { useFormik } from 'formik';

const RegisterComponents = () => {
    const initialValues = {
        pseudo: '',
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

    const { pseudo, email, phoneNumber, adress, zipcode, ville, password, cgu } =
        formik.values;

    return (
        <div>
            <h1>Inscription</h1>
            <form className="Register">
                <div>
                    <label htmlFor="pseudo">Nom d'utilisateur : </label>
                    <input type="text" name="pseudo" id="pseudo" value={pseudo} />
                </div>

                <div>
                    <label htmlFor="email">Email : </label>
                    <input type="email" name="email" id="email" value={email} />
                </div>

                <div>
                    <label htmlFor="phoneNumber">Numéro de téléphone</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={phoneNumber}
                    />
                </div>

                <div>
                    <label htmlFor="adress">Adresse postale : </label>
                    <input type="text" name="adress" id="adress" value={adress} />
                </div>

                <div>
                    <div>
                        <label htmlFor="zipcode">Code postale : </label>
                        <input type="number" name="number" id="number" value={zipcode} />
                    </div>
                    <div>
                        <label htmlFor="ville">Ville : </label>
                        <input type="text" name="ville" id="ville" value={ville} />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="password">Mot de passe : </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                        />
                    </div>

                    <div>
                        <input type="checkbox" name="cgu" id="cgu" value={cgu} />
                        <label htmlFor="cgu"></label>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterComponents;
