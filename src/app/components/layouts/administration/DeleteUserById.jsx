import { useFormik } from 'formik';
import React , {useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams, Link} from 'react-router-dom';

import { userInfo } from '../../../api/backend/requestApi';
import { deleteUserById } from '../../../api/backend/requestApi';
import { URL_ADMIN } from '../../../shared/constants/urls/urlConstants';


const DeleteUser = () => {

    const userId = useSelector(state => state.auth.userId);

    const history = useHistory();
    
     //récupération de l'id dans l'url
    const {id} = useParams(); // renvoie une paire clef/valeur  
    const initialValues = {
        password: '',
        userToDeleteId:{id}.id,
        userId: userId,
    };
    const [userState, setUserState] = useState({});

     //recupération des infos sur l'utilisateur
    
    //  -------- Methode 2 ----------
    //  useEffect( ()=> {
    //     const users = useSelector(state => state.adm.users);
    //     const userFound = users.find( user => user.id === {id}.id );
    //     console.log("userFound : " + JSON.stringify(userFound));
    //     setUserState(userFound);
    //  }, []) 
         
    // -------- Methode 1 ----------
    useEffect( () => {
        // à modifier en recuperant info dans le store state.adm.users
        userInfo({id}.id)
     .then (
         function (res) {
             if (res.status === 200) 
                 {   let user = {
                     id: res.data._id,
                     role : res.data.role.label, 
                     name : res.data.name, 
                     };
                     setUserState(user); 
                 } 
             else {
                 alert("l'utilisateur n'a pas été retrouvé");
             }
         }) 
      }, []);
 

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            deleteUserById(values)
            .then (function (res) {
                if (res.status === 200)
                {alert("l'utilisateur a bien été supprimé");
                history.push(URL_ADMIN);
                }
                else {
                    if (res.status === 201)
                    {  alert ("erreur = " + res.data.error );}
                }
            })
        }
    });

    const { password } = formik.values;



    return (
        <div>
            <div className="w-2/3 bg-black text-white text-center m-auto p-6">
                <form className="" onSubmit={formik.handleSubmit}>
                    <legend className="">
                       <h2> Suppression du compte</h2>
                    </legend>
                    <p>Vous vous apprêtez à supprimer le compte de {userState.name}, qui a le rôle {userState.role}.<br/>
                     Etes vous sûr de vouloir continuer ? <br/><br/></p>

                    <label htmlFor="mot de passe">Retapez votre mot de passe</label>
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
                       <div> <button type="submit" className="btn-red mr-6">Supprimer l'utilisateur</button> 
                       <Link to={`/administration/user/${id}`}><button className="btn-primary">Annuler</button></Link>
                       </div>
                </form>
            </div>
        </div>
    );
};

export default DeleteUser;
