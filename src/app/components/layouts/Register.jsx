import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import { register } from '../../api/backend/requestApi';
import { isEmail, isLength, isMatch } from '../../utils/Validation';

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
    };
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            console.log(values);
            register(values);
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
    } = formik.values;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEmpty(name) || isEmpty(password))
            return setUser({ ...user, err: 'Please fill in all fields.', success: '' });

        if (!isEmail(email))
            return setUser({ ...user, err: 'Invalid emails.', success: '' });

        if (isLength(password))
            return setUser({
                ...user,
                err: 'Password must be at least 6 characters.',
                success: '',
            });

        if (!isMatch(password, cf_password))
            return setUser({ ...user, err: 'Password did not match.', success: '' });

        try {
            const res = await axios.post('/user/register', {
                name,
                email,
                password,
            });

            setUser({ ...user, err: '', success: res.data.msg });
        } catch (err) {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: '' });
        }
    };
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

                    <div className="submit">
                        <button type="submit">Créer mon compte</button>
                    </div>
                </form>
                <div className="sign">
                    <p>
                        Vous avez déjà un compte ? Appuyez ici pour{' '}
                        <a href="./login">Se connecter</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
