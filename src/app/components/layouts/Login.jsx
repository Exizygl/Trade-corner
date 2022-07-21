import React, { useState } from 'react';
import { useFormik } from 'formik';
import { authenticate } from '../../api/backend/requestApi';
import ErrorMessSmall from './../../shared/components/form-and-error-components/ErrorMessSmall';
import { useDispatch } from 'react-redux';
import { signIn } from '../../shared/redux-store/authenticationSlice';
import { isAuthenticated } from '../../shared/services/accountServices';
import { useHistory } from 'react-router-dom';
import { URL_HOME } from './../../shared/constants/urls/urlConstants';

const Login = () => {

    const [errorLog, setErrorLog] = useState(false);
    const [msgError, setMsgError] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();
    const initialValues = {
        email: '',
        password: '',
    };
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {


            authenticate(values).then((res) => {
                console.log(res);
                if (res.data.errors) {
                    setMsgError(res.data.errors)
                }
                if (res.status === 200 && res.data.message.user.id_token) {
                    dispatch(signIn(res.data.message.user));
                    if (isAuthenticated()) {
                        history.push(URL_HOME)
                    };
                }
            })
                .catch((e) => {
                    console.log("e", e)
                    setErrorLog(true)
                });
        },
    });

    const { email, password } = formik.values;

    return (
        <div>
            <div className="global2">
                <form className="login" onSubmit={formik.handleSubmit}>
                    <legend className="titre">Connexion</legend>

                    <label htmlFor="email">Adresse email électronique</label>
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>

                    <label htmlFor="password">Mot de passe</label>
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>

                    <div className="submit2">
                        <button type="submit">Se connecter</button>
                    </div>
                    {(errorLog && msgError.password) && <ErrorMessSmall middle message="Login/Password incorrect(s)" />}
                    {(errorLog && msgError.email) && <ErrorMessSmall middle message="Login/Email incorrect(s)" />}
                    {(errorLog && msgError.isValid) && <ErrorMessSmall middle message="Login/Valider le mail de confirmation" />}
                </form>
                <div className="sign">
                    <p>
                        Pas de compte ? Appuyez ici pour{' '}
                        <a href="./register">S'enregistrer</a>
                    </p>
                    <p>
                        <a href="./forgotten-password">Mot de passe oublié</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
