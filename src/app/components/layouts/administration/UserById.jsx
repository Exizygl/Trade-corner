import React, {useEffect,useState} from 'react';
import { Link, useParams } from 'react-router-dom';

import { URL_MODIFYACCOUNT_BYID, URL_SHOP} from '../../../shared/constants/urls/urlConstants';
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
        <div>
            <h1> Panneau d'administration </h1>

            <div className="flex flex-row flex-wrap lg:flex-nowrap  mx-12 gap-10 bg-darkgray text-white">

                <div className = "basis-11/12 lg:basis-3/12">
                    <Navigation/>
                </div>

                <div className="flex flex-col basis-11/12 lg:basis-9/12 ">
                    <div id="top_part"className="flex flex-col md:flex-row pb-2 justify-between">
                        <div id="left"> 
                            <h2>{userState.pseudo}</h2>
                            {userState.role == "seller" && <Link to={URL_SHOP+userState.id}>
                                <button className="btn-primary w-[250px] mt-10">
                                Voir la Boutique
                                </button>
                            </Link> } 
                        </div>
                        {userState.imageProfilUrl ? 
                            <div className="relative mb-5 w-[250px]">
                                <img src={`https://trade-corner-back.onrender.com//static/` + userState.imageProfilUrl} onError={(e) => (e.currentTarget.src = `https://trade-corner-back.onrender.com/static/default.jpg`)} className='m-auto rounded-full object-cover w-[200px] h-[200px]' alt="photo de profil" />
                                <Link to={URL_MODIFYACCOUNT_BYID + 'avatar'+`/${userState.id}`}>
                                    <button type="button" className=" btn-primary w-[250px] absolute bottom-0.5 mb-0"> Changer l'avatar </button>
                                </Link>
                            </div> :
                            <p> Aucune image </p>
                        }
                    </div>
                    

                    <div id="pseudonyme" className="flex flex-col md:flex-row pb-2 pt-5 justify-between border-b-2 border-magentacorner">
                        <p className="">Pseudonyme : <span className="pl-5">{userState.pseudo}</span></p>
                        <Link to={URL_MODIFYACCOUNT_BYID + 'pseudo'+`/${userState.id}`}>
                            <button className="btn-primary w-[250px] mt-5 md:mt-0 w-[250px] mt-5 md:mt-0">
                                Modifier
                            </button>
                        </Link>
                    </div>
            
{/* modification du rôle de l'utilisateur */}

                    <div id="role" className="flex flex-col md:flex-row pb-2 pt-5 justify-between border-b-2 border-magentacorner">
                        <p className="">Role de l'utilisateur : <span>{userState.role}</span></p>
                        {/* {userState.role != "admin" && <Link to={URL_MODIFYACCOUNT_BYID + 'role'+`/${userState.id}`}> */}
                        {userState.role != "admin" && <Link to={URL_MODIFYACCOUNT_BYID + 'role'+`/${userState.id}`}>
                            <button className="btn-red  w-[250px]">
                                Modifier
                            </button>
                        </Link>  }
                        {userState.role === "admin" && 
                            <button className="btn-grey  w-[250px]">
                                Modifier
                            </button>
                          }
                    </div>

                    <div id="nom" className="flex flex-col md:flex-row pb-2 pt-5 justify-between border-b-2 border-magentacorner">
                        <p className="">Nom <span className="pl-5">{userState.name}</span></p>
                        <Link to={URL_MODIFYACCOUNT_BYID + 'name'+`/${userState.id}`}>
                            <button className="btn-primary w-[250px] mt-5 md:mt-0">
                                Modifier
                            </button>
                        </Link>
                    </div>

                    <div id="email" className="flex flex-col md:flex-row pb-2 pt-5 justify-between border-b-2 border-magentacorner">
                        <p className="">Email : <span className="pl-5">{userState.email}</span></p>
                        <Link to={URL_MODIFYACCOUNT_BYID + 'email'+`/${userState.id}`}>
                            <button className="btn-primary w-[250px] mt-5 md:mt-0">
                                Modifier
                            </button>
                        </Link>
                    </div>

                    <div id="tel" className="flex flex-col md:flex-row pb-2 pt-5 justify-between border-b-2 border-magentacorner">
                        <p className="">Téléphone : <span className="pl-5">{userState.phoneNumber}</span></p>
                        <Link to={URL_MODIFYACCOUNT_BYID + 'phone' +`/${userState.id}`}>
                            <button className="btn-primary w-[250px] mt-5 md:mt-0">
                                Modifier
                            </button>
                        </Link>
                    </div>

                    <div id="adresse" className="flex flex-col md:flex-row pb-2 pt-5 justify-between border-b-2 border-magentacorner">
                        <p className="">Adresse :<span className="pl-5">{userState.adress} {userState.zipcode} {userState.ville}</span></p>
                        <Link to={URL_MODIFYACCOUNT_BYID + 'adress'+`/${userState.id}`}>
                            <button className="btn-primary w-[250px] mt-5 md:mt-0">
                                Modifier
                            </button>
                        </Link>
                    </div>

                    <div id="mdp" className="flex flex-col md:flex-row pb-2 pt-5 justify-between border-b-2 border-magentacorner">
                        <p className="">Mot de passe : <span className="pl-5">**********</span></p>
                        <Link to={URL_MODIFYACCOUNT_BYID +'password' +`/${userState.id}` }>
                            <button className="btn-primary w-[250px] mt-5 md:mt-0">
                                Modifier
                            </button>
                        </Link>
                    </div>
                
                    <div className="flex flex-col md:flex-row pb-2 pt-5 justify-between">
                        <p className="">Supprimer le compte de cet utilisateur</p>
                        <Link to = {`/administration/delete/${userState.id}`}>
                        <button className="btn-red  w-[250px] mt-5 md:mt-0">
                            Supprimer
                        </button>
                        </Link>
                    </div>
 
                </div>
            </div>
        </div>
       
    );
};
