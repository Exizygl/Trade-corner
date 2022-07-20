import React, { useState } from 'react';
import { useFormik } from 'formik';
import { forgottenPassword } from '../../api/backend/requestApi';
import ErrorMessSmall from './../../shared/components/form-and-error-components/ErrorMessSmall';

const ForgottenPassword = () => {

    const [errorLog, setErrorLog] = useState(false);
    const [msgError, setMsgError] = useState("");

    
    const initialValues = {
        email: '',
    };
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {


            forgottenPassword(values).then((res) => {
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

    const { email } = formik.values;

    return (
        <div>
            <div className="global2">
                <form className="login" onSubmit={formik.handleSubmit}>
                    <legend className="titre">Mot de passe oublié</legend>

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

                    <div className="submit2">
                        <button type="submit">Envoie</button>
                    </div>
                    {(errorLog && msgError.email) && <ErrorMessSmall middle message="Email incorrect(s)" />}
                   
                </form>
            </div>
        </div>
    );
};

export default ForgottenPassword;
