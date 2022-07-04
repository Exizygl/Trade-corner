import { useFormik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userInfoUpdate } from '../../api/backend/requestApi';


const ModifyAccount = () => {
    const initialValues = {
        valueChange: '',
    };

    var typeInput = '';
    
    const id = useSelector((state) => state.auth.user.id);

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
            initialValues.valueName = 'phone';
            break;

        case 'name':
            textLabel = 'Nouveau nom';
            typeInput = 'text';
            initialValues.valueName = 'name';
            break;

        case 'password':
            textLabel = 'Nouveau mot de passe';
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
    }

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {

            userInfoUpdate(id, values);
            
        },
    });

    const { valueChange, oldPassword, repeatNewPassword, zipcode, ville, valueName } = formik.values;

    const additionalField = (type) => {
        if (type == 'adress') {
            return (
                <div>
                    <label htmlFor="zipcode">Code postal</label>
                    <div>
                        <input
                            type="text"
                            name="zipcode"
                            value={zipcode}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>
                    <label htmlFor="ville">Ville</label>
                    <div>
                        <input
                            type="text"
                            name="ville"
                            value={ville}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>
                </div>
            );
        } else if (type == 'password') {
            return (
                <div>
                    <label htmlFor="repeatNewPassword">
                        Confirmation du nouveau mot de passe
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
                    <label htmlFor="oldPassword">Anciant mot de passe</label>
                    <div>
                        <input
                            type="password"
                            name="oldPassword"
                            value={oldPassword}
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
                        {additionalField(typeModification)}
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
