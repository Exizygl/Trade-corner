import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';

import { userInfo, updateUserById, uploadUserImageById } from '../../../api/backend/requestApi';

import PreviewUserImage from '../../layouts/PreviewUserImage';
import { URL_ADMIN_LISTUSERS, URL_USER_BYID } from '../../../shared/constants/urls/urlConstants';
import { findImageExtension, validImageSize } from '../../../shared/components/utils-components/FormData';
import ErrorMessSmall from '../../../shared/components/form-and-error-components/ErrorMessSmall';




const ModifyAccountByAdmin = () => {
    const userId = useSelector((state) => state.auth.user._id);
    const roles = useSelector((state)=>state.adm.roles);

    const [userToModify, setUserToModify] = useState(""); // utile pour la modification d'avatar
    const [userImageValue, setUserImageValue] = useState("");
    const [errorSizeImage, setErrorSizeImage] = useState("");
    const [errorExtensionImage, setErrorExtensionImage] = useState("");

    //récupération du parramètre et modification de la page en fonction
    const { typeModification, id} = useParams();

    // state pour la gestion d'erreur
    const [errorLog, setErrorLog] = useState(false);
    const [msgError, setMsgError] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    //state de la view
    const callGetUser = (id) => {
        userInfo(id)
            .then((res) => {
                if (res.status === 200 && res.data) {
                    setUserToModify(res.data)
                }
            })
            .catch((e) => console.log(e));
    }

    useEffect(() => {
        callGetUser(id);        
    }, [])


//<-----Initialisation des valeurs ----->

    const initialValues = {
        valueChange: '',
        userToUpdate: id,
        userId: userId,
    };

//<----- valueName en fonction du type de modification ---->

    var typeInput = '';
    var textLabel = '';

    switch (typeModification) {
        case 'pseudo':
            textLabel = 'Nouveau pseudonyme';
            typeInput = 'text';
            initialValues.valueName = 'pseudo';
            break;

        case 'role':
            textLabel = 'Nouveau role';
            initialValues.valueName = 'role';
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

    // <----- gestion du formulaire ----->
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {

            updateUserById(values).then((res) => {

                //récupèration des erreurs

                if (res.status === 201) {
                    alert(JSON.stringify(res.data.error))
                }
                if (res.data.errors) {
                    setMsgError(res.data.errors); 
                }

                //Modification et redirection
                if (res.status === 200 && !res.data.errors) {
                    userInfo(userId).then(

                        function (res) {
                            if (values.valueName == "password" || values.valueName == "email")
                             {  alert("le " + values.valueName + " de l'utilisateur a bien été changé. Veuillez lui transmettre son nouveau " + values.valuesName);
                                history.push(URL_ADMIN_LISTUSERS);

                            } else { 
                                alert ("Modification pris en compte"),
                                history.push(URL_USER_BYID+id);
                            }
                        })
                }
            })
            setErrorLog(true)
        },
    });

    const { valueChange, repeatNewPassword, valueName, zipcode, adress} = formik.values;

    // <----- gestion du formulaire avatar ----->

    const formikImage = useFormik({
        initialValues: { userToUpdate: id,
            avatar: '' },
        onSubmit: (values) => {
            handleImageUser(values);
        },
    });

    const handleImageUser = (values) => {
        const formData = new FormData()
        formData.append('avatar', values.avatar);
        formData.append('userToUpdate',id);
 
        uploadUserImageById(formData)
            .then((res) => {
                callGetUser(id);
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
                    <label htmlFor="repeatNewPassword">
                        Nouveau mot de passe
                    </label>
                    <div>
                        <input
                            type="password"
                            className="input mb-6"
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
                            className='input'
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
                            className='input'
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
            <div className="bg-black text-white text-center w-2/3 m-auto p-6">

                {typeModification === "avatar" && <form id="formImage" className="flex text-align-center flex-col" onSubmit={formikImage.handleSubmit} encType="multipart/form-data" method="POST">
                            {userToModify.imageProfilUrl ? <div> <p>Image actuelle</p><img src={`http://localhost:8080/static/` + userToModify.imageProfilUrl} className='m-auto' alt="preview" width={200} height={200} /></div> :
                                <p> Aucune image </p>}
                            <legend className="">
                                Modifier le champ  {typeModification}
                            </legend>


                            <label htmlFor="">Avatar</label>
                            <div className='mb-6'>
                                <input
                                    id="avatar"
                                    className="input"
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
                            <div>
                                <button className="btn-primary" type="submit" disabled={(errorSizeImage || errorExtensionImage) ? true : false}>Modifier</button>
                                <Link to={`/administration/user/${id}`}><button className="btn-red">Annuler</button></Link>
                            </div>
                    </form>
                }

                {typeModification === "role" && <form className="flex text-align-center flex-col" onSubmit={formik.handleSubmit}>
                <legend className="mb-6">
                     <h2>Modifier le {typeModification}</h2>
                </legend>
                <input
                        type="hidden"
                        className="input"
                        name="valueName"
                        value={valueName}
                        onChange={formik.handleChange}
                        required
                    />

                <select name="valueChange" className='mb-6 select-corner'
                value={valueChange}
                onChange={formik.handleChange}>
                    <option value="" label="Selectionner un rôle">
                    </option>
                    {roles.map((role) => ( <option value={role.label} label= {role.label} key={role.id}></option> ))}                  
                 
                </select>
                <div>
                    <button type="submit" className= "btn-primary mr-6">Modifier</button>
                    <Link to={`/administration/user/${id}`}><button className="btn-red">Annuler</button></Link>
                </div>   
                </form>
                }

                {typeModification != "avatar" && typeModification != "role" && <form className="flex text-align-center flex-col" onSubmit={formik.handleSubmit}>
                    <legend className="mb-6">
                        <h2>Modifier le {typeModification}</h2>
                    </legend>

                    <input
                        type="hidden"
                        className="input mb-6"
                        name="valueName"
                        value={valueName}
                        onChange={formik.handleChange}
                        required
                    />
                    {additionalField(typeModification)}
                    <label htmlFor="password">{textLabel}</label>
                    <div>
                        <input
                            type={typeInput}
                            className="input mb-6"
                            name="valueChange"
                            value={valueChange}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <button type="submit" className= "btn-primary mr-6">Modifier</button>
                        <Link to={`/administration/user/${id}`}><button className="btn-red">Annuler</button></Link>
                    </div>
                    
                    {(errorLog && msgError.passwordNotMatch) && <ErrorMessSmall middle message="Les mots de passes sont différents" />}
                    {(errorLog && msgError.password) && <ErrorMessSmall middle message="L'ancien mot de passe ne correspond pas" />}
                    {(errorLog && msgError.email) && <ErrorMessSmall middle message="Email déjà prit" />}
                    {(errorLog && msgError.pseudo) && <ErrorMessSmall middle message="Pseudo déjà prit" />}
                    {(errorLog && msgError.zipcode) && <ErrorMessSmall middle message="Code postal trop long" />}
                </form>
                }
            </div>
        </div >
    );
};

export default ModifyAccountByAdmin;
