import { useFormik } from 'formik';
import React from 'react';
import { useParams } from 'react-router-dom';

const ModifyAccount = () => {
    const initialValues = {
        valueChange: '',
    };

    var typeInput = '';

    const { typeModification } = useParams();
    var textLabel = '';
    switch (typeModification) {
        case 'pseudo':
            textLabel = 'Nouveau pseudonyme';
            typeInput = 'text';
            break;

        case 'email':
            textLabel = 'Nouvelle adresse e-mail';
            typeInput = 'email';
            break;

        case 'phone':
            textLabel = 'Nouveau numéro de téléphone';
            typeInput = 'phone';
            break;

        case 'name':
            textLabel = 'Nouveau nom';
            typeInput = 'text';
            break;

        case 'password':
            textLabel = 'Nouveau mot de passe';
            initialValues.oldPassword = '';
            initialValues.repeatNewPassword = '';
            typeInput = 'password';
            break;

        case 'adress':
            textLabel = 'Nouvelle adresse';
            initialValues.zipcode = '';
            initialValues.ville = '';
            typeInput = 'text';
            break;
    }

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            console.log(values.valueChange);
            if (values.oldPassword) {
                console.log(values.oldPassword);
            }
        },
    });

    const { valueChange, oldPassword, repeatNewPassword, zipcode, ville } = formik.values;

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
                            <button type="submit">Se connecter</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
};

export default ModifyAccount;
