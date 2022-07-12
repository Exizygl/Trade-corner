import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userInfo, userInfoUpdate } from '../../api/backend/requestApi';
import { useHistory } from 'react-router-dom';
import { URL_HOME, URL_LOGIN } from '../../shared/constants/urls/urlConstants';


import { signOut, updateUser } from '../../shared/redux-store/authenticationSlice';




const ModifyAccount = () => {

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
            textLabel = 'Nouvelle adresse';
            initialValues.zipcode = '';
            initialValues.ville = '';
            typeInput = 'text';
            initialValues.valueName = 'adress';
            break;

        case 'ville':
            textLabel = 'Nouvelle ville';
            initialValues.zipcode = '';
            initialValues.ville = '';
            typeInput = 'text';
            initialValues.valueName = 'ville';
            break;

        case 'zipcode':
            textLabel = 'Nouveau code postal';
            typeInput = 'number';
            initialValues.valueName = 'zipcode';
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
                        if (res.status === 200) {

                            dispatch(updateUser(res.data));


                        }
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

    const { valueChange, oldPassword, repeatNewPassword, valueName } = formik.values;

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
                    </form>
                </div>
            }
        </div>
    );
};

export default ModifyAccount;
