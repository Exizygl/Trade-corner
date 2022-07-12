import { useFormik } from 'formik';
import React from 'react';
import {useEffect,useState} from 'react';
import { useDispatch } from 'react-redux';
import { userInfo } from '../../../api/backend/requestApi';

// import { userDelete, userDeleteInfo } from '../../api/backend/requestApi';
import { useHistory, useParams, Link} from 'react-router-dom';
import { URL_ADMIN_LISTUSERS } from '../../../shared/constants/urls/urlConstants';


const DeleteUser = () => {

    // const dispatch = useDispatch();
    // const history = useHistory();
    const initialValues = {
        password: '',
        userId:''
    };
    const [userState, setUserState] = useState({});

     //récupération de l'id
     const {id} = useParams(); // renvoie une paire clef/valeur  
 
     //recupération des infos sur l'utilisateur
 
    useEffect( () => {
      userInfo({id}.id)
     .then (
         function (res) {
             if (res.status === 200) 
                 {   let user = {
                     id: res.data._id,
                     role : res.data.role, 
                     name : res.data.name, 
                     };
                     setUserState(user);
                 } 
             else {
                 alert("l'utilisateur n'a pas été retrouvé");
             }
         }
         
       )
     }, []);
 

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            alert("utilisateur supprimé : " + JSON.stringify(values) + "avec l'id : " + userState.id);
        //    userDelete(values).then(
        //         function (res){
        //             if (res.status === 200) { 
        //             }
        //         }
        //     )
        }
    });

    const { password } = formik.values;



    return (
        <div>
            <div className="global2">
                <form className="login" onSubmit={formik.handleSubmit}>
                    <legend className="titre">
                        Suppression du compte
                    </legend>
                    <p>Vous vous apprêtez à supprimer le compte de {userState.name}, qui a le rôle {userState.role}.<br/>
                     Etes vous sûr de vouloir continuer ? <br/><br/></p>

                    <label htmlFor="mot de passe">Retapez votre mot de passe</label>
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={formik.handleChange}
                            required
                        />
                    </div>
                       <div> <button type="submit" className="text-red-700 font-semibold border p-2 m-2">Supprimer l'utilisateur</button> <Link to={`/administration/user/${id}`}><button className="border p-2">Annuler</button></Link>
                       </div>
                </form>
            </div>
        </div>
    );
};

export default DeleteUser;
