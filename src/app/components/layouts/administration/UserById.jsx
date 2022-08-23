import React, {useEffect,useState} from 'react';
import { Link, useParams } from 'react-router-dom';

import { URL_MODIFYACCOUNT_BYID } from '../../../shared/constants/urls/urlConstants';
import { userInfo } from '../../../api/backend/requestApi';
import Navigation from './Navigation';


export default function UserById() {

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
                    role : res.data.role.label, 
                    name : res.data.name, 
                    imageProfilUrl : res.data.imageProfilUrl, 
                    pseudo : res.data.pseudo, 
                    email : res.data.email, 
                    phoneNumber : res.data.phoneNumber, 
                    adress : res.data.adress.street, 
                    zipcode : res.data.adress.zipcode, 
                    ville : res.data.adress.city, 
                    createdAt : res.data.createdAt
                    };
                    setUserState(user);
                } 
            else {
                alert("l'utilisateur n'a pas été retrouvé");
            }
        }
      )
    }, []);

    return (
        <div className="flex gap-10 mx-12 text-white bg-darkgray">
            <div className = "basis-3/12">
            <Navigation/>
            </div>

            <div className="flex flex-col basis-9/12 ">
                <div className="flex pl-4 py-2 justify-between">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Pseudonyme</div>
                        <div>{userState.pseudo}</div>
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT_BYID + 'pseudo'+`/${userState.id}`}>
                            <button className="btn-primary">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>
            
{/* modification du rôle de l'utilisateur */}

                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Role de l'utilisateur</div>
                      {userState.role}
                    </div>
                    <div className="pr-4 py-2">
                        {/* {userState.role != "admin" && <Link to={URL_MODIFYACCOUNT_BYID + 'role'+`/${userState.id}`}> */}
                        {userState.role != "" && <Link to={URL_MODIFYACCOUNT_BYID + 'role'+`/${userState.id}`}>
                            <button className="btn-red">
                                Modifier
                            </button>
                        </Link>}
                        
                    </div>
                </div>
 


                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Email</div>
                        <div>{userState.email}</div>
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT_BYID + 'email'+`/${userState.id}`}>
                            <button className="btn-primary">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Avatar</div>
                        {userState.imageProfilUrl ? <div>
                            <img src={`http://localhost:8080/static/` + userState.imageProfilUrl} onError={(e) => (e.currentTarget.src = `http://localhost:8080/static/default.jpg`)} className='m-auto' alt="preview" width={200} height={200} />
                            </div> :
                        <p> Aucune image </p>}
                    </div>    
                

                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT_BYID + 'avatar'+`/${userState.id}`}>
                            <button className="btn-primary">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Nom</div>
                        <div>{userState.name}</div>
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT_BYID + 'name'+`/${userState.id}`}>
                            <button className="btn-primary">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Adresse</div>
                        <div>{userState.adress} {userState.zipcode} {userState.ville}</div>
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT_BYID + 'adress'+`/${userState.id}`}>
                            <button className="btn-primary">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Téléphone</div>
                        <div>{userState.phoneNumber}</div>
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT_BYID + 'phone' +`/${userState.id}`}>
                            <button className="btn-primary">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Mot de passe</div>
                        <div>**********</div>
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT_BYID +'password' +`/${userState.id}` }>
                            <button className="btn-primary">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Supprimer le compte de cet utilisateur</div>
                    </div>
                    <div className="pr-4 py-2">
                        <Link to = {`/administration/delete/${userState.id}`}>
                        <button className="btn-red">
                            Supprimer
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
