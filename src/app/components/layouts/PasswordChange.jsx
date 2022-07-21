import React, { useState } from 'react';
import { useFormik } from 'formik';
import { passwordChange } from '../../api/backend/requestApi';
import ErrorMessSmall from './../../shared/components/form-and-error-components/ErrorMessSmall';
import { useHistory } from 'react-router-dom';
import { URL_LOGIN } from '../../shared/constants/urls/urlConstants';


const PasswordChange = () => {

    const history = useHistory();

    const [errorLog, setErrorLog] = useState(false);
    const [msgError, setMsgError] = useState("");

    
    const initialValues = {
        password: '',
        passwordRepeat: '',
        email: window.location.href.substr(-64)
    };
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {


            passwordChange(values).then((res) => {
                console.log(res);
                if (res.data.errors) {
                    setMsgError(res.data.errors)
                }
                if (res.status === 200 && !res.data.errors) {
                    history.push(URL_LOGIN);
                    
                    
                }
            })

                    
                    setErrorLog(true)

        },
    });

    const { password , passwordRepeat, email } = formik.values;

    return (
        <div>
            <div className="global2">
                <form className="login" onSubmit={formik.handleSubmit}>
                    <legend className="titre">Mot de passe oublié</legend>

                    <input
                        type="hidden"
                        name="email"
                        value={email}
                        onChange={formik.handleChange}
                        required
                    />

                    <label htmlFor="email">Nouveau mot de passe</label>
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>
                    <label htmlFor="email">Nouveau mot de passe confirmation</label>
                    <div>
                        <input
                            type="password"
                            name="passwordRepeat"
                            value={passwordRepeat}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>

                    <div className="submit2">
                        <button type="submit">Envoie</button>
                    </div>
                    
                    {(errorLog && msgError.email) && <ErrorMessSmall middle message="Lien non valide" />}
                    {(errorLog && msgError.passwordNotMatch) && <ErrorMessSmall middle message="Les mots de passes sont différents" />}
                    {(errorLog && msgError.password) && <ErrorMessSmall middle message="Les mots de passes doit avoir au moins 6 caractères minimun" />}
                   
                </form>
            </div>
        </div>
    );
};

export default PasswordChange;
