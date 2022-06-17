import React from 'react';
import { useFormik } from 'formik';

const Login = () => {
    const initialValues = {
        email: '',
        password: '',
    };
    const formik = useFormik({
        initialValues,
    });

    const { email, password } = formik.values;

    return (
        <div>
            <div className="global2">
                <form className="login">
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
            </div>
        </div>
    );
};

export default Login;
