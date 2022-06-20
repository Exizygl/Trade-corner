import React from 'react';
import { useFormik } from 'formik';
import { register } from '../../api/backend/requestApi'

const Register = () => {
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
        gcu: false,
    };
    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            console.log(values);
            register(values)
          },
    });

    const {
        pseudo,
        name,
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
            <div className="global">
                <form onSubmit={formik.handleSubmit}>
                    <legend className="titre">Inscription</legend>
                    <div>
                        <label htmlFor="pseudo">Pseudonyme : </label>
                        <input
                            type="text"
                            name="pseudo"
                            id="pseudo"
                            value={pseudo}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>

                    <div className="Information">
                        <label htmlFor="name">Nom complet : </label>
                        <input
                            type="text"
                            name="name"
                            id="surName"
                            value={name}
                            onChange={formik.handleChange}
                            required
                        />

                        <label htmlFor="phoneNumber">Numéro de téléphone : </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="adress">Adresse postale : </label>
                        <input
                            type="text"
                            name="adress"
                            id="adress"
                            value={adress}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="ville">Ville : </label>
                        <input
                            type="text"
                            name="ville"
                            id="ville"
                            value={ville}
                            onChange={formik.handleChange}
                            required
                        />
                        <label htmlFor="zipcode">Code postale : </label>
                        <input
                            type="number"
                            name="zipcode"
                            id="zipcode"
                            value={zipcode}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Adresse email électronique : </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Mot de passe : </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={formik.handleChange}
                            required
                        />

                        <label htmlFor="passwordConfirmation">
                            Confirmation de mot de passe :{' '}
                        </label>
                        <input
                            type="password"
                            name="passwordConfirmation"
                            id="passwordConfirmation"
                            value={passwordConfirmation}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="cgu"
                            id="cgu"
                            value={cgu}
                            onClick={formik.handleChange}
                            required
                        />
                        <label className="cgu" htmlFor="cgu">
                            J'accepte{' '}
                            <a href="#" _target="blank">
                                les conditions d'utilisations.
                            </a>{' '}
                        </label>
                    </div>

                    <div className="submit">
                        <button type="submit">Créer mon compte</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
