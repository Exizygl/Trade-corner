import React from 'react';
import { useFormik } from 'formik';
import { authenticate } from '../../api/backend/requestApi';
import { useDispatch } from 'react-redux';
import { signIn } from '../../shared/redux-store/authenticationSlice';
import { isAuthenticated } from '../../shared/services/accountServices';
import { useHistory } from 'react-router-dom';
import { URL_HOME } from './../../shared/constants/urls/urlConstants';

const Login = () => {
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

                if (res.data.errors) {
                    console.log("res.data =>", res.data.errors)
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
                </form>
                <div className="sign">
                    <p>
                        Pas de compte ? Appuyez ici pour{' '}
                        <a href="./register">S'enregistrer</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
