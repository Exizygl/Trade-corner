import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { userInfo, userInfoUpdate, uploadUserImage } from '../../../api/backend/requestApi';

import PreviewUserImage from '../../layouts/PreviewUserImage';
import { signOut, updateUser } from '../../../shared/redux-store/authenticationSlice';
import { URL_HOME, URL_LOGIN } from '../../../shared/constants/urls/urlConstants';
import { findImageExtension, validImageSize } from '../../../shared/components/utils-components/FormData';
import ErrorMessSmall from '../../../shared/components/form-and-error-components/ErrorMessSmall';



const ModifyAccountByAdmin = () => {
    const userId = useSelector((state) => state.auth.user._id);
    const [user, setUser] = useState("");
    const [userImageValue, setUserImageValue] = useState("");
    const [errorSizeImage, setErrorSizeImage] = useState("");
    const [errorExtensionImage, setErrorExtensionImage] = useState("");

    // state pour la gestion d'erreur
    const [errorLog, setErrorLog] = useState(false);
    const [msgError, setMsgError] = useState("");
    const dispatch = useDispatch();

    const history = useHistory();

    const callGetUser = (userId) => {
        userInfo(userId)
            .then((res) => {
                if (res.status === 200 && res.data) {
                    setUser(res.data)
                }
            })
            .catch((e) => console.log(e));
    }

    useEffect(() => {
        callGetUser(userId)
    }, [])


    const initialValues = {
        valueChange: '',
    };

    var typeInput = '';


    //récupération du parramètre et modification de la page en fonction
    const { typeModification, id} = useParams();
    
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

    }

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {

            userInfoUpdate(values).then((res) => {

                //récupèration des erreurs
                if (res.data.errors) {
                    setMsgError(res.data.errors)
                }

                //Modification et redirection
                if (res.status === 200 && !res.data.errors) {
                    userInfo(userId).then(

                        function (res) {

                            dispatch(updateUser(res.data));

                            if (values.valueName == "password" || values.valueName == "email") {
                                dispatch(signOut());
                                history.push(URL_LOGIN);
                            } else {
                                history.push(URL_HOME);
                            }


                        })



                }



            })

            setErrorLog(true)


        },
    });

    const { valueChange, oldPassword, repeatNewPassword, valueName, zipcode, adress } = formik.values;

    const formikImage = useFormik({
        initialValues: { avatar: '' },
        onSubmit: (values) => {
            handleImageUser(values);
        },
    });

    const handleImageUser = (values) => {

        const formData = new FormData()

        formData.append('avatar', values.avatar)

        const imageUser = formData.get('avatar')
        uploadUserImage(formData)
            .then((res) => {
                callGetUser(userId)
                console.log(res)
            })
    }

    const loadImage = (e) => {

        const extension = findImageExtension(e.currentTarget.files[0].name)
        if (!extension) {
            setErrorExtensionImage(`L'extension d'image doit être jpg, jpeg ou png`)
        } else setErrorExtensionImage("");

        const imageSize = validImageSize(e.currentTarget.files[0].size)
        if (!imageSize) {
            setErrorSizeImage(`Le poids de l'image ne doit pas dépasser 200 Ko`)
        } else setErrorSizeImage("");

        if (extension && imageSize) {
            formikImage.setFieldValue('avatar', e.currentTarget.files[0])
        }
        setUserImageValue(e.currentTarget.files[0])

    }


    // Champ additionnels pour la modification de mot de passe et adresse
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

            <div className="global2">
                {typeModification != "avatar" && <form className="login" onSubmit={formik.handleSubmit}>
                    {/* <h1>modification par un admin</h1> */}
                    <legend className="titre">
                        Modifier le {typeModification}
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
                }

                {
                    typeModification === "avatar" && <form id="formImage" className="login" onSubmit={formikImage.handleSubmit} encType="multipart/form-data" method="POST">
                        {user.imageProfilUrl ? <div> <p>Image actuelle</p><img src={`http://localhost:8080/static/` + user.imageProfilUrl} className='m-auto' alt="preview" width={200} height={200} /></div> :
                            <p> Aucune image </p>}
                        <legend className="titre">
                            Modifier le champ  {typeModification}
                        </legend>


                        <label htmlFor="email">Avatar</label>
                        <div>
                            <input
                                id="avatar"
                                type="file"
                                name="avatar"
                                accept='images/*'
                                onChange={(e) => loadImage(e)}
                                required
                            />
                            {userImageValue && <div> <p>Image chargée</p> <PreviewUserImage file={userImageValue} /> </div>}
                            {errorSizeImage && <label className='text-red-500'> {errorSizeImage}</label>}
                            {errorExtensionImage && <label className='text-red-500'> {errorExtensionImage}</label>}

                        </div>
                        <div className="submit2">
                            <button type="submit" disabled={(errorSizeImage || errorExtensionImage) ? true : false}>Modifier</button>
                        </div>
                    </form>
                }
            </div>

        </div >
    );
};

export default ModifyAccountByAdmin;
