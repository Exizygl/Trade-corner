import React, {useEffect,useState} from 'react';
import { Link, useParams } from 'react-router-dom';

import { URL_MODIFYACCOUNT_BYID } from '../../../shared/constants/urls/urlConstants';
import { userInfo } from '../../../api/backend/requestApi';
import Navigation from './Navigation';


export default function UserById() {

    const [userState, setUserState] = useState({});

    //récupération de l'id
    const {id} = useParams(); // renvoie une paire clef/valeur  
    const URL_DELETE = '/administration/delete/${userState.id}'

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
                    imageProfilUrl : res.data.imageProfilUrl, 
                    pseudo : res.data.pseudo, 
                    email : res.data.email, 
                    phoneNumber : res.data.phoneNumber, 
                    adress : res.data.adress, 
                    zipcode : res.data.zipcode, 
                    ville : res.data.ville, 
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


    function renderRole(){
        switch(userState.role) {
            case 0 :
            return (<div> Utilisateur normal</div>);
            break;
            case 1 : 
            return (<div> Vendeur </div>);
            break;
            case 2 : 
            return (<div> Administrateur</div>);
            break;
        }
    };


    return (
        <div className="flex mt-12">
            <div className = "border-solid border-2 basis-2/6">
            <Navigation/>
        </div>

            <div className="flex flex-col w-2/5 ml-12 bg-white">

                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Pseudonyme</div>
                        <div>{userState.pseudo}</div>
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT_BYID + 'pseudo'+`/${userState.id}`}>
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>
            
{/* modification du rôle de l'utilisateur */}

                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Role de l'utilisateur</div>
                        {renderRole()}
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT_BYID + 'role'+`/${userState.id}`}>
                            <button className="bg-white hover:bg-red-700 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-700 hover:border-white">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>
 


                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Email</div>
                        <div>{userState.email}</div>
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT_BYID + 'email'+`/${userState.id}`}>
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Avatar</div>
                        {userState.imageProfilUrl ? <div>
                            <img src={`http://localhost:8080/static/` + userState.imageProfilUrl} className='m-auto' alt="preview" width={200} height={200} />
                            </div> :
                        <p> Aucune image </p>}
                    </div>    
                

                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT_BYID + 'avatar'+`/${userState.id}`}>
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent">
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
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent">
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
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent">
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
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent">
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
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent">
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
                        <button className="bg-white hover:bg-red-700 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-700 hover:border-white">
                            Supprimer
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
