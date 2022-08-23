import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { userDelete } from '../../api/backend/requestApi';
import { useHistory, Link } from 'react-router-dom';
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
                <div className="w-2/3 bg-black text-white text-center m-auto py-6 px-10">
                    <form className="" onSubmit={formik.handleSubmit}>
                        <legend className="mb-6">
                            <h2>Suppression du compte</h2>
                        </legend>
                        <p>Vous vous apprêtez à supprimer votre Compte.<br/>
                     Etes vous sûr de vouloir continuer ? <br/><br/></p>

                        <label htmlFor="email" className="mb-6">Entrez votre mot de passe</label>
                        <div>
                            <input
                                type="password"
                                className="input mb-6 w-1/2 mx-auto"
                                name="password"
                                value={password}
                                onChange={formik.handleChange}
                                required
                            />
                        </div>
                            <button type="submit" className = "btn-red mr-6">Supprimer</button>
                            <Link to={`/user`}><button className="btn-primary">Annuler</button></Link>
                        {(errorLog && msgError.passwordNotMatch) && <ErrorMessSmall middle message="Le mot de passe ne correspond pas" />}
                    </form>
                </div>
            }
        </div>
    );
};

export default DeleteUser;
