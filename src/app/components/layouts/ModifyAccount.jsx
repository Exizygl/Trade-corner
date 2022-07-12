import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userInfo, userInfoUpdate } from '../../api/backend/requestApi';
import { useHistory } from 'react-router-dom';
import { URL_HOME, URL_LOGIN } from '../../shared/constants/urls/urlConstants';


import { signOut, updateUser } from '../../shared/redux-store/authenticationSlice';




const ModifyAccount = () => {
    const [errorLog, setErrorLog] = useState(false);
    const [msgError, setMsgError] = useState("");
    const dispatch = useDispatch();

    const history = useHistory();
    const initialValues = {
        valueChange: '',
    };

    var typeInput = '';

    const id = useSelector((state) => state.auth.user._id);

    const { typeModification } = useParams();
    var textLabel = '';
    switch (typeModification) {
        case 'pseudo':
            textLabel = 'Nouveau pseudonyme';
            typeInput = 'text';
            initialValues.valueName = 'pseudo';
            break;

        case 'email':
            textLabel = 'Nouvelle adresse e-mail';
            typeInput = 'email';
            initialValues.valueName = 'email';
            break;

        case 'phone':
            textLabel = 'Nouveau numéro de téléphone';
            typeInput = 'phone';
            initialValues.valueName = 'phoneNumber';
            break;

        case 'name':
            textLabel = 'Nouveau nom';
            typeInput = 'text';
            initialValues.valueName = 'name';
            break;

        case 'password':
            textLabel = 'Confirmation du nouveau mot de passe';
            initialValues.oldPassword = '';
            initialValues.repeatNewPassword = '';
            typeInput = 'password';
            initialValues.valueName = 'password';
            break;

        case 'adress':
            textLabel = 'Nouvelle Ville';
            initialValues.zipcode = '';
            initialValues.ville = '';
            typeInput = 'text';
            initialValues.valueName = 'ville';
            break;

        case 'avatar':
            textLabel = 'Nouvelle avatar';
            typeInput = 'text';
            initialValues.valueName = 'Avatar';
            break;
    }

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {

            userInfoUpdate(values).then(() => {


                userInfo(id).then(
                    function (res) {
                        
                        if (res.data.errors) {
                            setMsgError(res.data.errors)
                        }
                        if (res.status === 200) {

                            dispatch(updateUser(res.data));


                        }
                    })
                    .catch((e) => {
                        console.log("e", e)
                        setErrorLog(true)
                    });




                if (values.valueName == "password" || values.valueName == "email") {
                    dispatch(signOut());
                    history.push(URL_LOGIN);
                } else {
                    history.push(URL_HOME);
                }

            });

        },
    });

    const { valueChange, oldPassword, repeatNewPassword, valueName, zipcode, adress} = formik.values;

    const additionalField = (type) => {

        if (type == 'password') {
            return (
                <div>

                    <label htmlFor="oldPassword">Ancien mot de passe</label>
                    <div>
                        <input
                            type="password"
                            name="oldPassword"
                            value={oldPassword}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>
                    <label htmlFor="repeatNewPassword">
                        Nouveau mot de passe
                    </label>
                    <div>
                        <input
                            type="password"
                            name="repeatNewPassword"
                            value={repeatNewPassword}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>
                </div>
            );

        }

        if (type == 'adress') {
            return (
                <div>

                    <label htmlFor="adress">Nouvelle Adresse</label>
                    <div>
                        <input
                            type="text"
                            name="adress"
                            value={adress}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>
                    <label htmlFor="zipcode">
                        Nouveau code postal
                    </label>
                    <div>
                        <input
                            type="number"
                            name="zipcode"
                            value={zipcode}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>
                </div>
            );

        }
    };

    return (
        <div>
            {
                <div className="global2">
                    <form className="login" onSubmit={formik.handleSubmit}>
                        <legend className="titre">
                            Modifier votre {typeModification}
                        </legend>

                        <input
                            type="hidden"
                            name="valueName"
                            value={valueName}
                            onChange={formik.handleChange}
                            required
                        />
                        {additionalField(typeModification)}
                        <label htmlFor="email">{textLabel}</label>
                        <div>
                            <input
                                type={typeInput}
                                name="valueChange"
                                value={valueChange}
                                onChange={formik.handleChange}
                                required
                            />
                        </div>
                        
                        <div className="submit2">
                            <button type="submit">Modifier</button>
                        </div>
                        {(errorLog && msgError.passwordNotMatch) && <ErrorMessSmall middle message="Les mots de passes sont différents" />}
                        {(errorLog && msgError.password) && <ErrorMessSmall middle message="L'ancien mot de passe ne correspond pas" />}
                        {(errorLog && msgError.email) && <ErrorMessSmall middle message="Email déjà prit" />}
                        {(errorLog && msgError.pseudo) && <ErrorMessSmall middle message="Pseudo déjà prit" />}
                        {(errorLog && msgError.zipcode) && <ErrorMessSmall middle message="Code postal trop long" />}
                    </form>
                </div>
            }
        </div>
    );
};

export default ModifyAccount;
