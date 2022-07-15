import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { URL_HOME, URL_LOGIN } from '../../shared/constants/urls/urlConstants';
import PreviewUserImage from '../layouts/PreviewUserImage';
import { findImageExtension, validImageSize } from '../../shared/components/utils-components/FormData';
import { userInfo, userInfoUpdate, uploadUserImage } from '../../api/backend/requestApi';
import { signOut, updateUser } from '../../shared/redux-store/authenticationSlice';



const ModifyAccount = () => {
    const userId = useSelector((state) => state.auth.user._id);
    const [user, setUser] = useState("");
    const [userImageValue, setUserImageValue] = useState("");
    const [errorSizeImage, setErrorSizeImage] = useState("");
    const [errorExtensionImage, setErrorExtensionImage] = useState("");

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
            typeInput = 'text';
            initialValues.valueName = 'zipcode';
            break;
    }

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            userInfoUpdate(values);
        },
    });

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
                    {typeModification != "avatar" && <form className="login" onSubmit={formik.handleSubmit}>
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
                    </form >}

                    {
                        typeModification === "avatar" && <form id="formImage" className="login" onSubmit={formikImage.handleSubmit} encType="multipart/form-data" method="POST">
                            {user.imageProfilUrl ? <div> <p>Image actuelle</p><img src={`http://localhost:8080/static/` + user.imageProfilUrl} className='m-auto' alt="preview" width={200} height={200} /></div> :
                                <p> Aucune image </p>}
                            <legend className="titre">
                                Modifier votre {typeModification}
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
                                {userImageValue && <div> <p>Image chargé</p> <PreviewUserImage file={userImageValue} /> </div>}
                                {errorSizeImage && <label className='text-red-500'> {errorSizeImage}</label>}
                                {errorExtensionImage && <label className='text-red-500'> {errorExtensionImage}</label>}

                            </div>
                            <div className="submit2">
                                <button type="submit" disabled={(errorSizeImage || errorExtensionImage) ? true : false}>Modifier</button>
                            </div>
                        </form>
                    }
                </div >
            }
        </div >
    );
};

export default ModifyAccount;
