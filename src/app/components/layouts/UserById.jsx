import React from 'react';
import {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { URL_MODIFYACCOUNT } from '../../shared/constants/urls/urlConstants';
import { userInfo } from '../../api/backend/requestApi';


export default function UserById() {

    const [userState, setUserState] = useState({});

    //récupération de l'id
    const {id} = useParams();    
    console.log("id" + JSON.stringify({id}.id));

    


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
                    avatar : res.data.Avatar, 
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

    console.log("état du state " +JSON.stringify(userState));

    function renderRole(){
        if(userState.role === 0){
            return (<div> Utilisateur normal</div>)
        }
        else {return (<div> Autre utilisateur</div>) }
    };


    return (
        <div className="flex mt-12">
            <nav className="flex flex-col w-1/5 ml-12 bg-white">
                <div href="" className="py-2 hover:bg-gray-100 w-full text-center">
                    Information
                </div>
                <div href="" className="py-2 hover:bg-gray-100 w-full text-center">
                    Commandes
                </div>
            </nav>

            <div className="flex flex-col w-2/5 ml-12 bg-white">

                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Pseudonyme</div>
                        <div>{userState.pseudo}</div>
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT + 'pseudo'}>
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
                        <Link to={URL_MODIFYACCOUNT + 'pseudo'}>
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
                        <Link to={URL_MODIFYACCOUNT + 'email'}>
                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent">
                                Modifier
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex pl-4 py-2 justify-between border-b-4">
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">Avatar</div>
                        <img src={userState.avatar} alt="" />
                    </div>
                    <div className="pr-4 py-2">
                        <Link to={URL_MODIFYACCOUNT + 'avatar'}>
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
                        <Link to={URL_MODIFYACCOUNT + 'nom'}>
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
                        <Link to={URL_MODIFYACCOUNT + 'adress'}>
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
                        <Link to={URL_MODIFYACCOUNT + 'phone'}>
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
                        <Link to={URL_MODIFYACCOUNT + 'password'}>
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
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent">
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
