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
        <div className="text-white px-10 ">
            <h1>Connexion</h1>
            <div className="w-[833px] mx-auto  bg-black py-[20px] px-[120px] text-white">
                <h2 className="text-center">Bonjour !</h2>
                <p className="text-center">Connectez-vous pour découvrir toutes nos fonctionnalitées</p>
                <div className="line basis-1/2 text-center"></div>
                <form onSubmit={formik.handleSubmit}>
                    {/* <legend className="titre">Connexion</legend> */}

                    <label htmlFor="email">Adresse email électronique</label>
                    <div>
                        <input
                            type="email"
                            className="input mb-6"
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
                            className="input mb-6"
                            name="password"
                            value={password}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>
                    <p className='text-right'>
                        <a href="./forgotten-password" className="underline">Mot de passe oublié ?</a>
                    </p>
                    {(errorLog && msgError.password) && <ErrorMessSmall middle message="Login/Password incorrect(s)" />}
                    {(errorLog && msgError.email) && <ErrorMessSmall middle message="Login/Email incorrect(s)" />}
                    {(errorLog && msgError.isValid) && <ErrorMessSmall middle message="Login/Valider le mail de confirmation" />}
               
                    <div className="text-center my-5">
                        <button type="submit" className="btn-primary">Se connecter</button>
                    </div>
                    
                     </form>
                <div className="text-center">
                    <p>
                        Pas de compte ? Appuyez ici pour{' '}
                        <a href="./register" className="underline">S'enregistrer</a>
                    </p>
                    
                </div>
            </div>
        </div>
    );
};

export default Login;
