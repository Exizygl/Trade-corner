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
            <div className="bg-black text-white text-center w-2/3 m-auto p-6 px-[120px]">
                <form className="" onSubmit={formik.handleSubmit}>
                    <legend className="mb-6"><h2>Mot de passe oublié</h2></legend>

                    <input
                        type="hidden"
                        className="input"
                        name="email"
                        value={email}
                        onChange={formik.handleChange}
                        required
                    />

                    <label htmlFor="email">Nouveau mot de passe</label>
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
                    <label htmlFor="email">Nouveau mot de passe confirmation</label>
                    <div>
                        <input
                            type="password"
                            className="input mb-6"
                            name="passwordRepeat"
                            value={passwordRepeat}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>

                    
                        <button className="btn-primary" type="submit">Envoie</button>
                    
                    
                    {(errorLog && msgError.email) && <ErrorMessSmall middle message="Lien non valide" />}
                    {(errorLog && msgError.passwordNotMatch) && <ErrorMessSmall middle message="Les mots de passes sont différents" />}
                    {(errorLog && msgError.password) && <ErrorMessSmall middle message="Le mot de passe doit avoir 6 caractères minimum" />}
                   
                </form>
            </div>
        </div>
    );
};

export default PasswordChange;
