import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { userDelete } from '../../api/backend/requestApi';
import { useHistory } from 'react-router-dom';
import { URL_HOME } from '../../shared/constants/urls/urlConstants';


import { signOut } from '../../shared/redux-store/authenticationSlice';




const DeleteUser = () => {

    const dispatch = useDispatch();

    const history = useHistory();




    const id = useSelector((state) => state.auth.user._id);


    const initialValues = {
        password: ''
    };



    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
           
            userDelete(values).then(
                function (res){
                if (res.status === 200) {
                    dispatch(signOut());
                    
                }
            }

            )
            history.push(URL_HOME);
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
                    </form>
                </div>
            }
        </div>
    );
};

export default DeleteUser;
