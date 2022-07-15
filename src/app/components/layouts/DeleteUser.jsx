import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { userDelete } from '../../api/backend/requestApi';
import { useHistory } from 'react-router-dom';
import { URL_HOME } from '../../shared/constants/urls/urlConstants';


import { signOut } from '../../shared/redux-store/authenticationSlice';
import ErrorMessSmall from '../../shared/components/form-and-error-components/ErrorMessSmall';




const DeleteUser = () => {
    const [errorLog, setErrorLog] = useState(false);
    const [msgError, setMsgError] = useState("");

    const dispatch = useDispatch();

    const history = useHistory();




    const id = useSelector((state) => state.auth.user._id);


    const initialValues = {
        password: ''
    };



    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {

            userDelete(values).then((res) => {
                if (res.data.errors) {
                    setMsgError(res.data.errors)
                }
                
                    if (res.status === 200 && !res.data.errors) {
                        dispatch(signOut());
                        history.push(URL_HOME);

                    }
                
                    
        })
            setErrorLog(true)
            
        }

    });

    const { password } = formik.values;



    return (
        <div>
            {
                <div className="global2">
                    <form className="login" onSubmit={formik.handleSubmit}>
                        <legend className="titre">
                            Suppression du compte
                        </legend>

                        <label htmlFor="email">Mot de passe</label>
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
                            <button type="submit">Suppression</button>
                        </div>
                        {(errorLog && msgError.passwordNotMatch) && <ErrorMessSmall middle message="Le mot de passe ne correspond pas" />}
                    </form>
                </div>
            }
        </div>
    );
};

export default DeleteUser;
