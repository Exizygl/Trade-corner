import React, { useState } from 'react';
import { useFormik } from 'formik';
import { forgottenPassword } from '../../api/backend/requestApi';
import ErrorMessSmall from './../../shared/components/form-and-error-components/ErrorMessSmall';
import SubmitForgottenPasswordModal from './modal/SubmitForgottenPasswordModal';


const ForgottenPassword = () => {

    const [errorLog, setErrorLog] = useState(false);
    const [msgError, setMsgError] = useState("");

    const [successSubmitModal, setSuccessSubmitModal] = useState('');

    const closeModal = () => {
        setSuccessSubmitModal('');
    };
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
                    setSuccessSubmitModal(
                        <SubmitForgottenPasswordModal
                            
                            closeModal={() => closeModal()}
                        />,
                    );
                    
                }
            })

                    
                    setErrorLog(true)

        },
    });

    const { email } = formik.values;

    return (
        <div>
            <div className="m-auto w-1/2 text-center text-white">
                <form className="" onSubmit={formik.handleSubmit}>
                    <legend className="mb-10"><h2>Mot de passe oublié</h2></legend>
                    <label htmlFor="email">Adresse email électronique</label>
                    <input
                        type="email"
                        className="input w-1/2 mx-auto mb-5"
                        name="email"
                        value={email}
                        onChange={formik.handleChange}
                        required
                    />
                    <button type="submit" className="btn-primary">Envoie</button>

                    {(errorLog && msgError.email) && <ErrorMessSmall middle message="Email incorrect(s)" />}
                   
                </form>
            </div>
            {successSubmitModal}
        </div>
    );
};

export default ForgottenPassword;
