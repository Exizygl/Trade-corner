import React, { useState } from 'react';
import { useFormik } from 'formik';
import { passwordChange } from '../../api/backend/requestApi';
import ErrorMessSmall from './../../shared/components/form-and-error-components/ErrorMessSmall';
import { useParams } from 'react-router-dom';

const PasswordChange = () => {

    var { token } = useParams();

    const [errorLog, setErrorLog] = useState(false);
    const [msgError, setMsgError] = useState("");

    
    const initialValues = {
        password: '',
        passwordRepeat: '',
        emailCrypt: token
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
                    
                    
                }
            })

                    
                    setErrorLog(true)

        },
    });

    const { password , passwordRepeat, emailCrypt } = formik.values;

    return (
        <div>
            <div className="global2">
                <form className="login" onSubmit={formik.handleSubmit}>
                    <legend className="titre">Mot de passe oublié</legend>

                    <input
                        type="hidden"
                        name="emailCrypt"
                        value={emailCrypt}
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
                    {(errorLog && msgError.email) && <ErrorMessSmall middle message="Email incorrect(s)" />}
                   
                </form>
            </div>
        </div>
    );
};

export default PasswordChange;
